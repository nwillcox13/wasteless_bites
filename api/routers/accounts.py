from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from typing import List, Union
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountRepository,
    DuplicateAccountError,
    Error
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()
depends = Depends()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountRepository = Depends(),
):
    if accounts.exists(info.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Email address already exists',
        )

    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.post("/api/accounts/login", response_model=AccountToken | HttpError)
async def login_account(
    form: AccountForm,
    request: Request,
    response: Response,
    accounts: AccountRepository = Depends(),
):
    try:
        account = accounts.get(form.username)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.post("/api/accounts/logout")
async def logout_account(
    request: Request,
    response: Response,
    accounts: AccountRepository = Depends(),
    account: AccountOut = Depends(authenticator.get_current_account_data),
):
    if not account:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authenticated",
        )
    else:
        response.delete_cookie(key=authenticator.cookie_name)
        return {"detail": "Logged out"}


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/api/accounts/me", response_model=AccountOut | HttpError)
async def get_account_info(
    account: AccountOut = Depends(authenticator.get_current_account_data),
) -> AccountOut:
    if not account:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authenticated",
        )
    else:
        return account


@router.put("/api/accounts/me", response_model=AccountOut | HttpError)
async def update_my_account(
    info: AccountIn,
    accounts: AccountRepository = Depends(),
    account: AccountOut = Depends(authenticator.get_current_account_data),
):
    if not account:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authenticated",
        )
    else:
        try:
            return accounts.update(account["email"], info)
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(ve),
            )


@router.delete("/api/accounts/me", response_model=AccountOut | HttpError)
async def delete_my_account(
    accounts: AccountRepository = Depends(),
    account: AccountOut = Depends(authenticator.get_current_account_data),
):
    if not account:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authenticated",
        )
    else:
        try:
            return accounts.delete(account["email"])
        except ValueError as ve:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(ve),
            )


@router.get("/api/accounts", response_model=List[Union[AccountOut, Error]])
def get_all_accounts(
    accounts: AccountRepository = depends
):
    return accounts.get_all_accounts()
