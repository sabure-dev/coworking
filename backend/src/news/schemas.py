import json

from pydantic import BaseModel, ConfigDict, model_validator


class NewsBase(BaseModel):
    title: str
    content: str


class NewsOut(NewsBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    image: str


class NewsCreate(NewsBase):

    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value
