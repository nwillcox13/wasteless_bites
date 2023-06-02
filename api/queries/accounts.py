from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Any

authenticator: Any = None


def get_authenticator():
    global authenticator
    if not authenticator:
        from authenticator import authenticator
    return authenticator


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    location: int


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    location: int


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


class AccountRepository:
    def create(
        self,
        account: AccountIn,
        hashed_password: str
    ) -> AccountOutWithPassword:
        # connect to db
        with pool.connection() as conn:
            # get cursor(something to run sql with)
            with conn.cursor() as db:
                # run insert statement
                result = db.execute(
                    """
                    INSERT INTO account
                        (first_name,
                        last_name,
                        email,
                        password,
                        location)
                        VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id,
                    email,
                    location,
                    password;
                    """,
                    [
                        account.first_name,
                        account.last_name,
                        account.email,
                        hashed_password,
                        account.location,
                    ]
                )
                id = result.fetchone()[0]
                # old_account = account.dict()
                return AccountOutWithPassword(
                        id=id,
                        first_name=account.first_name,
                        last_name=account.last_name,
                        email=account.email,
                        hashed_password=account.password,
                        location=account.location,
                    )

    def get_all_accounts(self) -> List[Union[AccountOut, Error]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM account
                        ORDER BY id;
                        """
                    )
                    return [self.record_to_account_out(record)
                            for record in result]
        except Exception as e:
            print(f"Original error: {e}")
            return Error(message="Could not list accounts")

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
                        location
                        FROM account
                        WHERE email= %s
                        """,
                        [email]
                    )
                    record = result.fetchone()
                    return self.record_to_account(record)
        except Exception as e:
            print(f"Original error: {e}")
            raise ValueError(
                "Could not get account"
                ) from e

    def update(
        self, email: str, updated_info: AccountIn
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Check if password is provided
                    if updated_info.password:
                        hashed_password = get_authenticator().hash_password(
                            updated_info.password
                        )
                        result = db.execute(
                            """
                            UPDATE account
                            SET first_name = %s, last_name = %s, password = %s, location = %s
                            WHERE email = %s
                            RETURNING id,
                            first_name,
                            last_name,
                            email,
                            location,
                            password
                            """,
                            [
                                updated_info.first_name,
                                updated_info.last_name,
                                hashed_password,
                                updated_info.location,
                                email
                            ],
                        )
                    else:
                        result = db.execute(
                            """
                            UPDATE account
                            SET first_name = %s, last_name = %s, location = %s
                            WHERE email = %s
                            RETURNING id,
                            first_name,
                            last_name,
                            email,
                            location,
                            password
                            """,
                            [
                                updated_info.first_name,
                                updated_info.last_name,
                                updated_info.location,
                                email
                            ],
                        )
                    record = result.fetchone()
                    return self.record_to_account(record)
        except Exception as e:
            print(f"Original error: {e}")
            raise ValueError("Could not update account") from e

    def delete(self, email: str) -> AccountOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM account
                        WHERE email = %s
                        RETURNING id,
                        first_name,
                        last_name,
                        email,
                        location
                        """,
                        [email]
                    )
                    record = result.fetchone()
                    return self.record_to_account_out(record)
        except Exception as e:
            print(f"Original error: {e}")
            raise ValueError("Could not delete account") from e
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
            "location": record[5],
        }
        return account_dict

    def record_to_account_out(self, record) -> AccountOut:
        account_dict = {
            "id": record[0],
            "first_name": record[1],
            "last_name": record[2],
            "email": record[3],
            "location": record[4],
        }
        return AccountOut(**account_dict)

    def exists(self, email: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT EXISTS (
                        SELECT 1
                        FROM account
                        WHERE email = %s
                        )
                        """,
                        [email]
                    )
                    return result.fetchone()[0]
        except Exception as e:
            print(f"Original error: {e}")
            raise ValueError("Could not check if account exists") from e
