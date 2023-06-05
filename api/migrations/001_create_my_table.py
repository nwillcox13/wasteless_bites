steps = [
    [
        ## create table
        """
        CREATE TABLE account (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(200) NOT NULL UNIQUE,
            password VARCHAR(200) NOT NULL
        );
        """,
        ###drop table
        """
        Drop Table account;
        """,
    ]
]
