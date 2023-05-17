from fastapi import APIRouter, Depends
from queries.accounts import AccountIn, AccountRepository, AccountOut, Error
from typing import List, Union
depend = Depends()
router = APIRouter()

@router.post("/account", response_model=AccountOut)
def create_account(
    account: AccountIn,
    repo: AccountRepository = depend
    ):
    # print(repo)
    # print("ACCT", account.email)
        return repo.create(account)

@router.get("/account", response_model= Union[List[AccountOut], Error])
def list_accounts(repo:AccountRepository= depend):
        # repo.create(AccountOut)
        return repo.get_all()

@router.put("/accounts/{account_id}", response_model= Union[AccountOut, Error])
def update_account(
        account_id: int,
        account: AccountIn,
        repo: AccountRepository = depend,
        )-> Union[Error, AccountOut]:
        return repo.update_account(account_id, account)

@router.delete("/accounts/{account_id}", response_model= bool)
def delete_account(
        account_id: int,
        repo: AccountRepository = depend
)-> bool:
    return repo.delete_account(account_id)

@router.get("/accounts/{account_id}", response_model= AccountOut)
def get_account(
        account_id: int,
        repo: AccountRepository = depend
)-> bool:
    return repo.get_one(account_id)
