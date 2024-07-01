from fastapi import FastAPI
from auth import auth
from note import note
from group import group
from news import news
from project import project
from fastapi.middleware.cors import CORSMiddleware
import redis

rd = redis.Redis(host='localhost', port=6379, db=0)

app = FastAPI(title="Coworking")

origins = [
    "http://192.168.51.231:3000",
    "http://192.168.56.1:3000"
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
