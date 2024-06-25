from pydantic import BaseModel


class Group(BaseModel):
    password: str
    title: str
