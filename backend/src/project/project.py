from typing import Annotated

from sqlalchemy import select, delete, desc
from fastapi import status, HTTPException, Response

from fastapi import APIRouter, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession
from . import models, schemas
from auth import models as auth_models
from group import models as group_models
from database import get_async_session
from auth.utils import get_current_user

router = APIRouter(
    prefix="/project",
    tags=["Project"]
)


@router.get('/')
async def get_projects(db: AsyncSession = Depends(get_async_session)):
    query = (
        select(models.Project)
        .order_by(desc(models.Project.created_at))
    )

    result = await db.execute(query)

    return result.scalars().all()


@router.post('/')
async def create_project(project: schemas.ProjectAdd, db: AsyncSession = Depends(get_async_session),
                         current_user: auth_models.User = Depends(get_current_user)):
    new_project = models.Project(**project.model_dump(), group=current_user.group)

    db.add(new_project)

    group_query = await db.execute(select(group_models.Group).where(group_models.Group.members.contains(current_user.full_name)))
    group = group_query.scalars().first()
    group.projects += project.title

    await db.commit()

    return new_project


@router.delete('/{id}')
async def delete_project(id: Annotated[int, Path()], db: AsyncSession = Depends(get_async_session),
                         current_user: auth_models.User = Depends(get_current_user)):
    project_query = await db.execute(select(models.Project).filter(models.Project.id == id))

    project = project_query.scalars().first()


    if project.group != current_user.group:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")

    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Project with id: {id} does not exist")

    await db.execute(delete(models.Project).where(models.Project.id == id))

    group_query = await db.execute(select(group_models.Group).where(group_models.Group.members.contains(current_user.full_name)))
    group = group_query.scalars().first()
    group_projects_list = group.projects.split(', ')
    group_projects_list.remove(project.title)
    new_projects = ", ".join(group_projects_list)
    group.projects = new_projects
    await db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put('/{id}')
async def edit_project(id: Annotated[int, Path()], db: Annotated[AsyncSession, Depends(get_async_session)],
                       current_user: Annotated[auth_models.User, Depends(get_current_user)],
                       edited_project: schemas.ProjectAdd):

    project = await db.get(models.Project, id)

    if project.group != current_user.group:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")

    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Project with id: {id} does not exist")

    group_query = await db.execute(select(group_models.Group).where(group_models.Group.members.contains(current_user.full_name)))
    group = group_query.scalars().first()
    group.projects = edited_project.title

    project.title, project.content = edited_project.title, edited_project.content

    await db.commit()
    return project
