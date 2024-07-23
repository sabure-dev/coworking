from fastapi import FastAPI
from starlette.staticfiles import StaticFiles

from auth import auth
from note import note
from group import group
from news import news
from project import project
from fastapi.middleware.cors import CORSMiddleware
import redis

rd = redis.Redis(host='red-cqfp4uaju9rs73c1f7mg', port=6379, db=0)

app = FastAPI(title="Coworking")

origins = [
    "https://coworking373.onrender.com",
    "https://coworking-373.onrender.com",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin"],
)

app.include_router(auth.router, prefix='/api')
app.include_router(note.router, prefix='/api')
app.include_router(group.router, prefix='/api')
app.include_router(project.router, prefix='/api')
app.include_router(news.router, prefix='/api')
app.mount("/api/media", StaticFiles(directory="media"), name="media")
