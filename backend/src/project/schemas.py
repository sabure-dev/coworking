import datetime
import json

from pydantic import BaseModel, model_validator


class Project(BaseModel):
    title: str
    content: str


class ProjectAdd(Project):

    @model_validator(mode='before')
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class ProjectGet(Project):
    id: int
    group: str
    created_at: datetime.datetime
