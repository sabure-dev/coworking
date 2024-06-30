from typing import Annotated

from sqlalchemy import select, delete
from fastapi import status, HTTPException, Response, Body

from fastapi import APIRouter, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession
from . import models
from . import schemas
from auth import models as auth_models
from database import get_async_session
from auth.utils import get_current_user

router = APIRouter(
    prefix="/group",
    tags=["Group"]
)


@router.get('/')
async def get_group(db: AsyncSession = Depends(get_async_session),
                    current_user: auth_models.User = Depends(get_current_user)):

    if current_user.group == 'null':
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    query = (
        select(models.Group)
        .where(models.Group.members.contains(current_user.full_name))
    )

    result = await db.execute(query)

    group = result.scalars().all()

    return group


@router.post('/{title}')
async def enter_group(title: Annotated[str, Path()], password: Annotated[str, Body()],
                      db: AsyncSession = Depends(get_async_session),
                      current_user: auth_models.User = Depends(get_current_user)):
    if not current_user.group == 'null':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You already a part of a group")

    group_query = await db.execute(select(models.Group).filter(models.Group.title == title))
    group = group_query.scalars().first()

    if group is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Group with title: {title} does not exist")

    if group.password != password:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"Invalid credentials")

    current_user.group = title
    group.members = group.members + f', {current_user.full_name}'
    await db.commit()

    return current_user


@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_group(group: schemas.Group, db: AsyncSession = Depends(get_async_session),
                       current_user: auth_models.User = Depends(get_current_user)):
    if not current_user.group == 'null':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You already a part of a group")

    new_group = models.Group(**group.model_dump(), members=current_user.full_name)
    current_user.group = group.title

    db.add(new_group)
    await db.commit()

    return new_group


@router.get('/leave')
async def leave_group(db: Annotated[AsyncSession, Depends(get_async_session)],
                      current_user: Annotated[auth_models.User, Depends(get_current_user)]):
    group_query = await db.execute(select(models.Group).filter(models.Group.title == current_user.group))
    group = group_query.scalars().first()

    current_user.group = "null"
    group_members_list = group.members.split(', ')
    group_members_list.remove(current_user.full_name)
    new_members = ", ".join(group_members_list)
    group.members = new_members

    await db.commit()
    return "Successful"
