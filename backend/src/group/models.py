import datetime
from sqlalchemy.orm import Mapped, mapped_column
from database import Base
# from ..database import Base


class Group(Base):
    __tablename__ = "group"

    id: Mapped[int] = mapped_column(primary_key=True)
    password: Mapped[str]
    title: Mapped[str] = mapped_column(unique=True)
    members: Mapped[str]
    projects: Mapped[str] = mapped_column(server_default='')
