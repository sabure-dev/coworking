from typing import Annotated

from sqlalchemy import select, delete
from fastapi import status, HTTPException, Response

from fastapi import APIRouter, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession
from . import models
from auth import models as auth_models
from . import schemas
from database import get_async_session
from auth.utils import get_current_user

router = APIRouter(
    prefix="/note",
    tags=["Notes"]
)


@router.get('/check')
def check(current_user: auth_models.User = Depends(get_current_user)):
    return 'Success'


@router.get('/', response_model=list[schemas.NoteOut])
async def get_notes(db: AsyncSession = Depends(get_async_session),
                    current_user: auth_models.User = Depends(get_current_user)):
    query = (
        select(models.Note)
        .where(models.Note.owner == current_user.group)
    )

    result = await db.execute(query)

    return result.scalars().all()


@router.post('/', response_model=schemas.NoteOut, status_code=status.HTTP_201_CREATED)
async def create_note(note: schemas.NoteCreate, db: AsyncSession = Depends(get_async_session),
                      current_user: auth_models.User = Depends(get_current_user)):
    if current_user.role != 'teacher':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")
    if current_user.group == 'null':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You need to be a part of a group")

    new_note = models.Note(**note.model_dump(), owner=current_user.group)

    db.add(new_note)
    await db.commit()

    return new_note


@router.delete('/{id}')
async def delete_note(id: Annotated[int, Path()], db: AsyncSession = Depends(get_async_session),
                      current_user: auth_models.User = Depends(get_current_user)):
    if current_user.role != 'teacher':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")

    note_query = await db.execute(select(models.Note).filter(models.Note.id == id))

    note = note_query.scalars().first()

    if note.owner != current_user.group:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")

    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Note with id: {id} does not exist")

    await db.execute(delete(models.Note).where(models.Note.id == id))
    await db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put('/{id}', response_model=schemas.NoteOut)
async def edit_note(id: Annotated[int, Path()], db: Annotated[AsyncSession, Depends(get_async_session)],
                    current_user: Annotated[auth_models.User, Depends(get_current_user)],
                    edited_note: schemas.NoteCreate):
    if current_user.role != "teacher":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not authorized to perform requested action')

    note = await db.get(models.Note, id)

    if note.owner != current_user.group:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")

    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Note with id: {id} does not exist")

    note.title, note.content, note.deadline = edited_note.title, edited_note.content, edited_note.deadline
    await db.commit()
    return note
