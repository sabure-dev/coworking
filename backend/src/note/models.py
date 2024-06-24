import datetime
from sqlalchemy.orm import Mapped, mapped_column
from database import Base
# from ..database import Base


class Note(Base):
    __tablename__ = "note"

    id: Mapped[int] = mapped_column(primary_key=True)
    owner: Mapped[str]
    title: Mapped[str]
    content: Mapped[str]
    deadline: Mapped[str]
    # Fri Jun 21 2024 11:50:36 GMT+0000
