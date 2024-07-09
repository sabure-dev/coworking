import json
from typing import Annotated
from sqlalchemy import select, delete, desc
from fastapi import status, HTTPException, Response
from fastapi import APIRouter, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession
from . import models
from auth import models as auth_models
from . import schemas
from database import get_async_session
from auth.utils import get_current_user
import main

router = APIRouter(
    prefix="/news",
    tags=["News"]
)


@router.get('/', response_model=list[schemas.NewsOut])
async def get_news(db: AsyncSession = Depends(get_async_session),
                   current_user: auth_models.User = Depends(get_current_user)):
    cache = main.rd.lrange('news', 0, -1)
    if cache:
        print('cache hit!!')
        return json.loads(*cache)
    else:
        print('cache miss')

        query = (
            select(models.News)
            .order_by(desc(models.News.id))
        )

        result = await db.execute(query)

        result2 = result.scalars().all()
        news_data = [
            {'id': news.id, 'title': news.title,
             'content': news.content} for news in
            result2]

        main.rd.lpush('news', json.dumps(news_data))
        main.rd.expire('news', 1800)

        return result2


@router.post('/', response_model=schemas.NewsOut, status_code=status.HTTP_201_CREATED)
async def create_news(note: schemas.NewsCreate, db: AsyncSession = Depends(get_async_session),
                      current_user: auth_models.User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")

    new_note = models.News(**note.model_dump())

    db.add(new_note)
    await db.commit()

    return new_note


@router.delete('/{id}')
async def delete_news(id: Annotated[int, Path()], db: AsyncSession = Depends(get_async_session),
                      current_user: auth_models.User = Depends(get_current_user)):

    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")

    news_query = await db.execute(select(models.News).filter(models.News.id == id))

    news = news_query.scalars().first()

    if news is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"News with id: {id} does not exist")

    await db.execute(delete(models.News).where(models.News.id == id))
    await db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put('/{id}', response_model=schemas.NewsOut)
async def edit_news(id: Annotated[int, Path()], db: Annotated[AsyncSession, Depends(get_async_session)],
                    current_user: Annotated[auth_models.User, Depends(get_current_user)],
                    edited_news: schemas.NewsCreate):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not authorized to perform requested action')

    news = await db.get(models.News, id)

    if news is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"News with id: {id} does not exist")

    news.title, news.content = edited_news.title, edited_news.content
    await db.commit()
    return news