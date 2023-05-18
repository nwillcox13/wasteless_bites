steps = [
    [
        # create table (also check timezone?)
        """
        CREATE TABLE item (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            item_type VARCHAR(50) NOT NULL,
            quantity SMALLINT NOT NULL,
            purchased_or_prepared TIMESTAMP,
            time_of_post TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expiration TIMESTAMP,
            location INT,
            dietary_restriction VARCHAR(200),
            description TEXT,
            pickup_instructions TEXT NOT NULL
        );
        """,
        # drop table
        """
        Drop Table account;
        """

    ]
]
