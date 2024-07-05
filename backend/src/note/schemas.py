from pydantic import BaseModel, ConfigDict


class NoteBase(BaseModel):
    title: str
    content: str


class NoteOut(NoteBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    deadline: str


class NoteCreate(NoteBase):
    deadline: str
