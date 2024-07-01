from datetime import datetime
from pydantic import BaseModel


class NewsBase(BaseModel):
    title: str
    content: str


class NewsOut(NewsBase):
    id: int

    class Config:
        from_attributes = True


class NewsCreate(NewsBase):
    pass
