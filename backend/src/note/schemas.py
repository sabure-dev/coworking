from datetime import datetime
from pydantic import BaseModel


class NoteBase(BaseModel):
    title: str
    content: str


class NoteOut(NoteBase):
    id: int
    deadline: str

    class Config:
        from_attributes = True


class NoteCreate(NoteBase):
    deadline: str
