import smtplib
from datetime import datetime, timezone, timedelta
from email.mime.text import MIMEText
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import InvalidTokenError
from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from . import models
from auth.schemas import TokenData
from config import SECRET_AUTH, ALGORITHM, RESET_PASSWORD_EMAIL_TEMPLATE, SMTP_USER, SMTP_PASS, SECRET_RESET_PASSWORD, \
    RESET_PASSWORD_TOKEN_EXPIRE_MINUTES
from database import get_async_session

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


async def get_user(db: Annotated[AsyncSession, Depends(get_async_session)], username: str):
    query = (
        select(models.User)
        .where(models.User.email == username)
    )
    user_q = await db.execute(query)
    user = user_q.scalars().first()
    return user


async def authenticate_user(db: Annotated[AsyncSession, Depends(get_async_session)], username: str, password: str):
    user = await get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_AUTH, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(db: Annotated[AsyncSession, Depends(get_async_session)],
                           token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_AUTH, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = await get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def send_password_reset_email(user):
    reset_token = create_password_reset_token(user)
    reset_url = f"https://coworking373.onrender.com/password-reset?token={reset_token}"

    msg = MIMEText(RESET_PASSWORD_EMAIL_TEMPLATE.format(reset_url=reset_url))
    msg['Subject'] = 'Password Reset Instructions'
    msg['From'] = SMTP_USER
    msg['To'] = user.email

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(SMTP_USER, SMTP_PASS)
        smtp.send_message(msg)


def create_password_reset_token(user):
    data = {"sub": user.email,
            "exp": datetime.now(timezone.utc) + timedelta(minutes=RESET_PASSWORD_TOKEN_EXPIRE_MINUTES)}
    return jwt.encode(data, SECRET_RESET_PASSWORD, algorithm=ALGORITHM)
