import os
from fastapi import Depends, Header, HTTPException
from jwtdown_fastapi.authentication import Authenticator
from typing import Optional
from queries.accounts import AccountRepository, AccountOut, AccountOutWithPassword
import jwt


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountRepository,
    ):
        return accounts.get(email)

    def get_account_getter(
        self,
        account: AccountRepository = Depends(),
    ):
        return account

    def get_hashed_password(self, account: AccountOut):
        return account["password"]

    def get_account_data_for_cookie(self, account: AccountOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account['email'], AccountOut(**account)

    def decode_jwt_token(self, token: str):
        try:
            decoded_token = jwt.decode(token, os.environ["SIGNING_KEY"], algorithms=['HS256'])
            return decoded_token
        except Exception:
            raise HTTPException(status_code=401, detail="Invalid Token")

    def get_current_account_id(self, authorization: Optional[str] = Header(None)) -> int:
        if authorization is None:
            print(authorization)
            raise HTTPException(status_code=401, detail="HELLO")
        try:
            decoded_token = self.decode_jwt_token(authorization)
            account_id = decoded_token.get("account_id")
            if account_id is None:
                raise HTTPException(status_code=401, detail="Invalid Token")
            return account_id

        except Exception:
            raise HTTPException(status_code=401, detail="Invalid Token")


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])

#get_current_account_data
