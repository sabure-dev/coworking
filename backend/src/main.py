from fastapi import FastAPI
from starlette.staticfiles import StaticFiles

from auth import auth
from note import note
from group import group
from news import news
from project import project, comment
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Coworking")

origins = [
    "https://coworking373.onrender.com",
    "https://coworking-373.onrender.com",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix='/api')
app.include_router(note.router, prefix='/api')
app.include_router(group.router, prefix='/api')
app.include_router(project.router, prefix='/api')
app.include_router(news.router, prefix='/api')
app.include_router(comment.router, prefix='/api/project')
app.mount("/api/media", StaticFiles(directory="media"), name="media")
