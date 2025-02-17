import datetime
from typing import Annotated

from sqlalchemy import text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from database import Base
# from ..database import Base

created_at = Annotated[datetime.datetime, mapped_column(server_default=text("TIMEZONE('utc', now())"))]


class Project(Base):
    __tablename__ = "project"

    id: Mapped[int] = mapped_column(primary_key=True)
    group: Mapped[str]
    title: Mapped[str]
    content: Mapped[str]
    files: Mapped[str]
    created_at: Mapped[created_at]

    comments = relationship("Comment", back_populates="project", cascade="all, delete")


class Comment(Base):
    __tablename__ = "comment"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("project.id", ondelete="CASCADE"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    username: Mapped[str] = mapped_column(nullable=False)
    text: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[created_at]
    
    project = relationship("Project", back_populates="comments")
