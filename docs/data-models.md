# Data Models

---

## Account

| name       | type               | unique | optional |
| ---------- | ------------------ | ------ | -------- |
| id         | SERIAL PRIMARY KEY | yes    | no       |
| first_name | VARCHAR(50)        | no     | no       |
| last_name  | VARCHAR(50)        | no     | no       |
| email      | VARCHAR(200)       | yes    | no       |
| location   | INT                | no     | no       |
| password   | VARCHAR(200)       | no     | no       |

"Location" is passed through as the user's US ZIP code

---

## Item

| name                  | type                                | unique | optional |
| --------------------- | ----------------------------------- | ------ | -------- |
| id                    | SERIAL PRIMARY KEY                  | yes    | no       |
| name                  | VARCHAR(50)                         | no     | no       |
| item_type             | VARCHAR(50)                         | no     | no       |
| quantity              | SMALLINT                            | no     | no       |
| purchased_or_prepared | TIMESTAMP                           | no     | no       |
| time_of_post          | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | no     | no       |
| expiration            | TIMESTAMP                           | no     | no       |
| location              | INT                                 | no     | no       |
| dietary_restriction   | VARCHAR(200)                        | no     | no       |
| description           | TEXT                                | no     | yes      |
| pickup_instructions   | TEXT                                | no     | no       |
| account_id            | SMALLINT REFERENCES account(id)     | no     | no       |

This table represents every property of an item that is posted within the application.
