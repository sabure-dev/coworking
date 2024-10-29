from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    full_name: str
    email: str
    role: str
    hashed_password: str


class PasswordResetRequest(BaseModel):
    token: str
    new_password: str
