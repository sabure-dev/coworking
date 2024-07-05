from pydantic import BaseModel, ConfigDict


class NewsBase(BaseModel):
    title: str
    content: str


class NewsOut(NewsBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class NewsCreate(NewsBase):
    pass
