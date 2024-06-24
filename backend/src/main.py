from fastapi import FastAPI
from auth import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Coworking")

origins = [
    "http://localhost:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT"],
    allow_headers=["Authorization", "Content-Type", "Access-Control-Allow-Headers", "Access-Control-Allow-Origin"],
)

app.include_router(auth.router, prefix='/api')
