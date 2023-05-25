from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional
from datetime import datetime
import json


class Error(BaseModel):
    message: str


class ItemIn(BaseModel):
    name: str
    item_type: str
    quantity: int
    purchased_or_prepared: datetime
    time_of_post: datetime
    expiration: datetime
    location: int
    dietary_restriction: List[str]
    description: Optional[str]
    pickup_instructions: str


class ItemOut(BaseModel):
    id: int
    name: str
    item_type: str
    quantity: int
    purchased_or_prepared: datetime
    time_of_post: datetime
    expiration: datetime
    location: int
    dietary_restriction: List[str]
    description: Optional[str]
    pickup_instructions: str

class Message(BaseModel):
    detail: str

class ItemRepository:
    def create(self, item: ItemIn, account_id: int) -> Union[ItemOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO item
                            (account_id,
                            name,
                            item_type,
                            quantity,
                            purchased_or_prepared,
                            time_of_post,
                            expiration,
                            location,
                            dietary_restriction,
                            description,
                            pickup_instructions)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account_id,
                            item.name,
                            item.item_type,
                            item.quantity,
                            item.purchased_or_prepared,
                            item.time_of_post,
                            item.expiration,
                            item.location,
                            json.dumps(item.dietary_restriction),
                            item.description,
                            item.pickup_instructions
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.item_in_to_out(id, item)
        except Exception as e:
            print(f"Original error: {e}")
            print("HELLOW")
            return Error(message="Could not create item")

    def get_all(self) -> Union[Error,List[ItemOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM item
                        ORDER BY id;
                        """
                    )
                    return [self.record_to_ItemOut(record)
                            for record in result]
        except Exception as e:
            print(f"Original error: {e}")
            return Error(message="Could not list items")

    def get_one(self, item_id: int) -> Optional[ItemOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM item
                        WHERE id = %s;
                        """,
                        [item_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_ItemOut(record)
        except Exception as e:
            print(f"Original error: {e}")
            return Error(message="Could not list items")

    def update_item(self, item_id: int, item: ItemIn) -> Union[ItemOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE item
                        SET name = %s,
                            item_type = %s,
                            quantity = %s,
                            purchased_or_prepared = %s,
                            time_of_post = %s,
                            expiration = %s,
                            location = %s,
                            dietary_restriction = %s,
                            description = %s,
                            pickup_instructions = %s
                        WHERE id = %s;
                        """,
                        [
                            item.name,
                            item.item_type,
                            item.quantity,
                            item.purchased_or_prepared,
                            item.time_of_post,
                            item.expiration,
                            item.location,
                            item.dietary_restriction,
                            item.description,
                            item.pickup_instructions,
                            item_id
                            ]
                    )
                    return self.item_in_to_out(item_id, item)
        except Exception as e:
            print(f"Original error: {e}")
            return Error(message="Could not update item")


    def delete(self, item_id: int) -> Union[Message, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM item
                        WHERE id = %s;
                        """,
                        [item_id]
                    )
                    print("OUR result", result)
                if result.rowcount >= 1:
                    return Message(detail=f"Item with id {item_id} deleted successfully.")
                else:
                        return Error(message="Could not delete item, item not found.")
        except Exception as e:
            print(f"Original error: {e}")
            return Error(message="Could not delete item")


    # def delete(self, item_id: int) -> bool:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 result = db.execute(
    #                     """
    #                     DELETE FROM item
    #                     WHERE id = %s;
    #                     """,
    #                     [item_id]
    #                 )
    #                 print("OUR result", result)
    #             if result.rowcount >= 1:
    #                 return Message(detail=f"Item with id {item_id} deleted successfully.")
    #             else:
    #                     return Error(message="Could not delete item, item not found.")
    #     except Exception as e:
    #         print(f"Original error: {e}")
    #         return Error(message="Could not delete item")

    def item_in_to_out(self, id: int, item: ItemIn):
        old_data = item.dict()
        return ItemOut(id=id, **old_data)

    # def record_to_ItemOut(self, record):
    #     return ItemOut(
    #         id=record[0],
    #         name=record[1],
    #         item_type=record[2],
    #         quantity=record[3],
    #         purchased_or_prepared=record[4],
    #         time_of_post=record[5],
    #         expiration=record[6],
    #         location=record[7],
    #         dietary_restriction=json.loads(record[8]),
    #         description=record[9],
    #         pickup_instructions=record[10],
    #     )
    def record_to_ItemOut(self, record):
        try:
            dietary_restriction = json.loads(record[8])
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON: {e}")
            print(f"Original JSON string: {record[8]}")
            dietary_restriction = []

        return ItemOut(
            id=record[0],
            name=record[1],
            item_type=record[2],
            quantity=record[3],
            purchased_or_prepared=record[4],
            time_of_post=record[5],
            expiration=record[6],
            location=record[7],
            dietary_restriction=dietary_restriction,
            description=record[9],
            pickup_instructions=record[10],
        )
