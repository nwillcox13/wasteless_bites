from fastapi.testclient import TestClient
from ..main import app
from ..queries.accounts import (
    AccountRepository,
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    Error,
)
from ..authenticator import MyAuthenticator

# Rest of the code...

import pytest


class MockAccountRepository(AccountRepository):
    def get(self, email: str):
        return {
            "first_name": "String",
            "last_name": "String",
            "email": "test@test.com",
            "password": "password",
            # add the rest of your account fields here
        }


@pytest.fixture
def client():
    # Create a TestClient using your FastAPI app
    return TestClient(app)


def test_get_account(client):
    # Arrange
    app.dependency_overrides[AccountRepository] = MockAccountRepository

    # Act
    response = client.get("/api/account")

    # Clean up
    app.dependency_overrides.clear()

    # Assert
    assert response.status_code == 200
    # you can add more assertions here based on your actual endpoint behavior
