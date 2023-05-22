from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class AccountRepository:
    def create(self,
                account: AccountIn,
                hashed_password: str) -> AccountOutWithPassword:
        # connect to db
        with pool.connection() as conn:
            # get cursor(something to run sql with)
            with conn.cursor() as db:
                # run insert statement
                result = db.execute(
                    """
                    INSERT INTO account
                        (first_name, last_name, email,
                        password)
                        VALUES
                        (%s, %s, %s, %s)
                    RETURNING id, email, password;
                    """,
                    [
                        account.first_name,
                        account.last_name,
                        account.email,
                        hashed_password,
                    ]
                )
                id = result.fetchone()[0]
                old_account = account.dict()
                return AccountOutWithPassword(
                        id=id,
                        first_name=account.first_name,
                        last_name=account.last_name,
                        email=account.email,
                        hashed_password=account.password,
                    )

    def get(self, email: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                        first_name,
                        last_name,
                        email,
                        password,
                        FROM account
                        WHERE email= %s
                        """,
                        [email]
                    )
                    record = result.fetchone()
                    return self.record_to_account(record)
        except Exception as e:
            print(f"Original error: {e}")
            raise ValueError("Could not get account") from e
            # return data

    def account_in_to_out(self, id: int, account: AccountIn):
        old_data = account.dict()
        return AccountOut(id=id, **old_data)

    def record_to_account(self, record) -> AccountOutWithPassword:
        account_dict = {
            "id": record[0],
            "first_name": record[1],
            "last_name": record[2],
            "email": record[3],
            "password": record[4],
        }
        return account_dict
