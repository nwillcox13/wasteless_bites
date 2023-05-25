from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from datetime import datetime
from pydantic import BaseModel
from queries.items import (
    ItemIn,
    ItemOut,
    ItemRepository,
    Message,
    Error
)
from typing import List, Union, Optional
from authenticator import authenticator


class ItemForm(BaseModel):
    name: str
    item_type: str
    quantity: int
    purchased_or_prepared: datetime
    time_of_post: datetime
    expiration: datetime
    location: int
    dietary_restriction: str
    description: Optional[str]
    pickup_instructions: str


router = APIRouter()
depends = Depends()


# @router.post("/items", response_model=Union[ItemOut, Error])
# def create_item(
#     item: ItemIn,
#     repo: ItemRepository = depends,
# ):
#     return repo.create(item)


# @router.get("/items", response_model=List[Union[ItemOut, Error]])
# def get_all(
#     items: ItemRepository = depends
# ):
#     return items.get_all()

def get_item_repo() -> ItemRepository:
    return ItemRepository()

@router.post("/items", response_model=Union[ItemOut, Error])
def create_item(
    item: ItemIn,
    repo: ItemRepository = Depends(get_item_repo),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(item)

@router.get("/items", response_model=Union[Error,List[ItemOut]])
def get_all(
    response: Response,
    repo: ItemRepository = Depends(get_item_repo),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error,List[ItemOut]]:
    items = repo.get_all()

    return items

@router.get("/items/{item_id}", response_model=Optional[ItemOut])
def get_one(
    item_id: int,
    response: Response,
    repo: ItemRepository = Depends(get_item_repo),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ItemOut:
    item = repo.get_one(item_id)
    if item is None:
        response.status_code = 404
    return item

@router.put("/items/{item_id}", response_model=Optional[ItemOut])
def update(
    item_id: int,
    item_data: ItemIn,
    response: Response,
    repo: ItemRepository = Depends(get_item_repo),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> ItemOut:
    item = repo.update_item(item_id, item_data)
    if item is None:
        response.status_code = 404
    return item


@router.delete("/items/{item_id}", response_model=Optional[Message])
def delete(
    item_id: int,
    response: Response,
    repo: ItemRepository = Depends(get_item_repo),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    result = repo.delete(item_id)
    if not result:
        response.status_code = 404
    return {"detail": f"Deleted item {item_id}"}

# @router.delete("/items/{item_id}", response_model=Optional[Message])
# def delete(
#     item_id: int,
#     response: Response,
#     repo: ItemRepository = Depends(get_item_repo),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     result = repo.delete(item_id)
#     if not result:
#         response.status_code = 404
#     return {"message": f"Deleted item {item_id}"}
# @router.put("/items/{item_id}", response_model=Union[ItemOut, Error])
# def update(
#     item_id: int,
#     item: ItemIn,
#     repo: ItemRepository = depends
#         ) -> Union[ItemOut, Error]:
#     return repo.update_item(item_id, item)


# @router.delete("/items/{item_id}", response_model=bool)
# def delete(
#     item_id: int,
#     repo: ItemRepository = depends
#         ) -> bool:
#     return repo.delete_item(item_id)
