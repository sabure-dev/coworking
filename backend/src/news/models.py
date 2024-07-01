from sqlalchemy.orm import Mapped, mapped_column
from database import Base
# from ..database import Base


class News(Base):
    __tablename__ = "news"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    content: Mapped[str]
