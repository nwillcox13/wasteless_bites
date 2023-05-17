from fastapi import FastAPI
from routers import accounts
from fastapi.middleware.cors import CORSMiddleware
import jwt
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

app = FastAPI()
origins = [
    "http://localhost:3000",  # React app
    "http://localhost:8000",  # Local FastAPI server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router)
SECRET_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM ="HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

test_user = {
    "username": "temitope",
    "password": "temipassword",

}
class LoginItem(BaseModel):
    username: str
    password: str

    @app.get("/")
    def read_root():
        return {"Hello": "World"}

@app.post("/login")
async def user_login(loginitem:LoginItem):
    data = jsonable_encoder(loginitem)
    if data['username']== test_user['username'] and data['password']== test_user['password']:
        encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt}
    else:
        return {"message":"login failed"}
