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
    Error
)
from typing import List, Union, Optional


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


@router.post("/items", response_model=Union[ItemOut, Error])
def create_item(
    item: ItemIn,
    items: ItemRepository = depends,
):
    return items.create(item)


@router.get("/items", response_model=List[ItemOut])
def get_all(
    items: ItemRepository = depends
):
    return items.get_all()
