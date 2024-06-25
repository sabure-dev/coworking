import datetime
from typing import Annotated
from sqlalchemy import text
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base
# from database import Base


created_at = Annotated[datetime.datetime, mapped_column(server_default=text("TIMEZONE('utc', now())"))]


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str]
    group: Mapped[str | None] = mapped_column(server_default="null")
    email: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[str]
    role: Mapped[str]
    created_at: Mapped[created_at]
