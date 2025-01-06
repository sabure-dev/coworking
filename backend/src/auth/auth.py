from datetime import timedelta, datetime, timezone
from typing import Annotated

from jwt import InvalidTokenError

from config import ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_RESET_PASSWORD, ALGORITHM
from fastapi import APIRouter, Depends, HTTPException, status, Body, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
import jwt

from . import models
from . import utils
from database import get_async_session
from .schemas import Token, User, PasswordResetRequest
from .utils import authenticate_user, create_access_token, get_user, send_password_reset_email, get_password_hash, \
    verify_password

router = APIRouter(
    prefix="/auth",
    tags=['Auth']
)


@router.post("/token")
async def login_for_access_token(
        db: Annotated[AsyncSession, Depends(get_async_session)],
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=float(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.post("/register", response_model=User)
async def register(
        db: Annotated[AsyncSession, Depends(get_async_session)],
        user: Annotated[User, Body()],
        background_tasks: BackgroundTasks
):
    hashed_password = utils.get_password_hash(user.hashed_password)
    user.hashed_password = hashed_password

    new_user = models.User(**user.model_dump())

    db.add(new_user)
    await db.commit()
    
    background_tasks.add_task(utils.send_verification_email, new_user)

    return new_user


@router.post("/password-forgot", status_code=status.HTTP_202_ACCEPTED)
async def request_password_reset(
    db: Annotated[AsyncSession, Depends(get_async_session)],
    email: Annotated[str, Body()]
):
    user = await get_user(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    await send_password_reset_email(user)
    return {"detail": "Password reset instructions sent to email"}


@router.post("/password-reset")
async def reset_password(
    db: Annotated[AsyncSession, Depends(get_async_session)],
    password_reset_request: Annotated[PasswordResetRequest, Body()]
):
    try:
        payload = jwt.decode(password_reset_request.token, SECRET_RESET_PASSWORD, algorithms=[ALGORITHM])
        email = payload["sub"]
        if datetime.now(timezone.utc) > datetime.fromtimestamp(payload["exp"], tz=timezone.utc):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Token has expired"
            )
        user = await get_user(db, email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        if verify_password(password_reset_request.new_password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="New password must be different from the current password"
            )
        user.hashed_password = get_password_hash(password_reset_request.new_password)
        db.add(user)
        await db.commit()
        return {"detail": "Password reset successful"}
    except (InvalidTokenError, KeyError):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid token"
        )


@router.get("/verify-email")
async def verify_email(
    db: Annotated[AsyncSession, Depends(get_async_session)],
    token: str
):
    try:
        payload = jwt.decode(token, SECRET_AUTH, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid token"
            )
        user = await get_user(db, email)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        if user.is_verified:
            return {"detail": "Email already verified"}
        
        user.is_verified = True
        db.add(user)
        await db.commit()
        return {"detail": "Email verified successfully"}
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired token"
        )
