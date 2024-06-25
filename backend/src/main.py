from fastapi import FastAPI
from auth import auth
from note import note
from group import group
from project import project
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Coworking")

origins = [
    "http://localhost:3000",
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

