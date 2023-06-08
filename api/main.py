from fastapi import FastAPI
from authenticator import authenticator
from routers import accounts, items
import chat
from fastapi.middleware.cors import CORSMiddleware
import os
app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(items.router)
app.include_router(chat.router)
origins = [
    "http://localhost:3000",
    "https://nwillcox.gitlab.io",
    os.environ.get("CORS_HOST", None),
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
