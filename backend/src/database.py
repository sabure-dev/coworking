from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
# from config import DB_PASS, DB_NAME, DB_PORT, DB_USER, DB_HOST
from .config import DB_PASS, DB_NAME, DB_PORT, DB_USER, DB_HOST


class Base(DeclarativeBase):
    pass


SQLALCHEMY_DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
# SQLALCHEMY_DATABASE_URL = f"postgresql+asyncpg://dragon:eBTHjighD22dEMZf9h93F8JLvZTNf045@dpg-cpooihaju9rs738stiig-a/clickat"


engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL,
)

async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
