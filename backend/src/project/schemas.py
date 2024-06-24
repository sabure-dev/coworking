import datetime

from pydantic import BaseModel


class Project(BaseModel):
    title: str
    content: str


class ProjectAdd(Project):
    pass


class ProjectGet(Project):
    id: int
    group: str
    created_at: datetime.datetime
