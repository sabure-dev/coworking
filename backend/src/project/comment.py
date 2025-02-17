from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
import datetime

from pydantic import BaseModel
from .models import Project, Comment
from auth.utils import get_current_user
from database import get_async_session

class CommentCreate(BaseModel):
    text: str

class CommentRead(BaseModel):
    id: int
    project_id: int
    user_id: int
    username: str
    text: str
    created_at: datetime.datetime

    class Config:
        orm_mode = True

router = APIRouter()

@router.get("/{project_id}/comments", response_model=List[CommentRead])
async def get_comments(project_id: int, db: AsyncSession = Depends(get_async_session)):
    result = await db.execute(select(Comment).where(Comment.project_id == project_id))
    comments = result.scalars().all()
    return comments

@router.post("/{project_id}/comments", response_model=CommentRead, status_code=status.HTTP_201_CREATED)
async def add_comment(project_id: int, comment: CommentCreate, db: AsyncSession = Depends(get_async_session), current_user = Depends(get_current_user)):
    
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Проект не найден")
    
    new_comment = Comment(
        project_id=project_id,
        user_id=current_user.id,
        username=current_user.full_name,
        text=comment.text,
        created_at=datetime.datetime.utcnow()
    )
    db.add(new_comment)
    await db.commit()
    await db.refresh(new_comment)
    return new_comment

@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(comment_id: int, db: AsyncSession = Depends(get_async_session), current_user = Depends(get_current_user)):
    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    comment_to_delete = result.scalars().first()
    if not comment_to_delete:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Комментарий не найден")
    if comment_to_delete.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Нет прав на удаление данного комментария")
    await db.delete(comment_to_delete)
    await db.commit()
    return