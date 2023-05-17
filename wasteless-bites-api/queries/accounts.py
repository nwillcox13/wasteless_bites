from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class AccountIn(BaseModel):
    first_name : str
    last_name : str
    email : str
    password : str


class AccountOut(BaseModel):
    id : int
    first_name : str
    last_name : str
    email : str
    password : str

class Error(BaseModel):
    message: str


class AccountRepository:
    def get_account(self, account_id:int)->AccountOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result= db.execute(
                        """
                        SELECT
                        id,
                        first_name,
                        last_name,
                        email,
                        password,
                        FROM account
                        WHERE id= %s
                        """,
                        [account_id]
                    )
                    record= result.fetchone()
                    return self.record_to_account(record)
        except Exception as e:
            print(e)
            return {"message": "Error"}
    def delete_account(self, account_id:int)->bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM account
                        WHERE id= %s
                        """,
                        [account_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False
    def update_account(self, account_id:int, account: AccountIn)->Union[AccountOut,Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE account
                        SET first_name = %s
                            , last_name= %s
                            , email= %s
                            , password= %s
                        WHERE id = %s
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.password,
                            account_id
                        ]

                    );
                    return self.account_in_to_out(account_id, account)
        except Exception as e:
            print(e)
            return {"message": "try again"}

    def get_accounts(self) ->Union[Error,List[AccountOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result= db.execute(
                    """
                    SELECT id,
                    first_name,
                    last_name,
                    email,
                    password FROM account
                    ORDER by id;
                    """
                    )
                    return [self.record_to_account(i) for i in db]
        except Exception as e:
            print(e)
            return {"message": "try again"}

    def create(self, account: AccountIn) -> AccountOut:
    ##connect to db
        with pool.connection() as conn:
            ##get cursor(something to run sql with)
            with conn.cursor() as db:
            ##run insert statement
                result = db.execute(
                    """
                    INSERT INTO account
                        (first_name, last_name, email,
                        password)
                        VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account.first_name,
                        account.last_name,
                        account.email,
                        account.password
                    ]
                );
                id= result.fetchone()[0]
                return self.account_in_to_out(id, account)
                ##return data
    def account_in_to_out(self, id:int, account:AccountIn):
        old_data= account.dict()
        return AccountOut(id=id, **old_data)
    def  record_to_account(self, record):
        return AccountOut(
                id= record[0],
                first_name=record[1],
                last_name=record[2],
                email=record[3],
                password=record[4]
                )
