from datetime import datetime
from pydantic import BaseModel


class Group(BaseModel):
    password: str
    title: str
