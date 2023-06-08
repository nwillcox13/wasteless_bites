from fastapi.testclient import TestClient
from main import app
from queries.accounts import (
    AccountRepository,
    AccountOut,
    AccountIn,
    AccountOutWithPassword,
)
from authenticator import MyAuthenticator
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
password = "securepassword"
hashed_password = pwd_context.hash(password)
print(hashed_password)

client = TestClient(app)


class MyAuthenticator(MyAuthenticator):
    def __init__(self, secret_key, authenticator, pwd_context):
        super().__init__(secret_key, authenticator)
        self.pwd_context = pwd_context  # Use the same pwd_context instance

    def get_hashed_password(self, account: AccountOut):
        return account.hashed_password


class EmptyAccountRepo:
    def __init__(self, pwd_context):
        self.authenticator = test_authenticator
        self.pwd_context = pwd_context  # Use the same pwd_context instance

    def get(self, email: str):
        # For testing, just return a dummy account
        return {
            "id": 1,
            "first_name": "Test",
            "last_name": "User",
            "email": email,
            "password": hashed_password,
            "location": 12345,
        }

    def get_all_accounts(self, id=None):
        return []

    def create(self, account: AccountIn, hashed_password: str):
        return AccountOutWithPassword(
            id=1,
            first_name=account.first_name,
            last_name=account.last_name,
            email=account.email,
            hashed_password=hashed_password,
            # Set the hashed_password attribute correctly
            location=account.location,
        )

    def update(self, email: str, account: AccountIn):
        return AccountOutWithPassword(
            id=1,
            first_name=account.first_name,
            last_name=account.last_name,
            email=account.email,
            hashed_password=self.authenticator.hash_password(account.password),
            location=account.location,
        )

    def exists(self, email: str) -> bool:
        return False

    def delete(self, email: str):
        # For testing, just return a successful deletion message
        return {"detail": "Account deleted"}


class TestAuthenticator(MyAuthenticator):
    def __init__(self, secret_key, authenticator, pwd_context):
        super().__init__(secret_key, authenticator, pwd_context)
        self.pwd_context = pwd_context  # Use the same pwd_context instance

    def hash_password(self, password: str) -> str:
        return self.pwd_context.hash(password)

    def generate_token(self, account: AccountOut):
        # Simply return a static string as token
        return "fake_token"

    def authenticate_token(self, token: str) -> dict:
        if token == "fake_token":
            return AccountOutWithPassword(
                id=1,
                first_name="Test",
                last_name="User",
                email="testuser@example.com",
                hashed_password=hashed_password,
                location=12345,
            )
        else:
            return None


test_authenticator = TestAuthenticator(
    "your_secret_key", MyAuthenticator, pwd_context
)


app.dependency_overrides[AccountRepository] = lambda: EmptyAccountRepo(
    pwd_context
)
app.dependency_overrides[MyAuthenticator] = lambda: test_authenticator


def test_list_accounts():
    response = client.get("/api/accounts")
    assert response.status_code == 200
    assert (
        len(response.json()) == 0
    )  # Adjusting expectation based on mocked repo


def test_create_account():
    account_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "j@doe.com",
        "password": password,  # Use the original password, not the hashed one
        "location": 12345,
    }
    response = client.post("/api/accounts", json=account_data)
    assert response.status_code == 200
    assert response.json()["account"]["email"] == "j@doe.com"


def test_update_account():
    account_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "j@doe.com",
        "password": "newsecurepassword",
        "location": 12345,
    }
    # Test when no token provided
    response = client.put("/api/accounts/me", json=account_data)
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}

    # Test when a correct token is provided
    response = client.put(
        "/api/accounts/me",
        headers={"Authorization": "Bearer fake_token"},
        json=account_data,
    )
    assert response.status_code == 401


def test_delete_account():
    # Test when no token provided
    response = client.delete("/api/accounts/me")
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid token"}

    # Test when a correct token is provided
    response = client.delete(
        "/api/accounts/me", headers={"Authorization": "Bearer fake_token"}
    )
    assert response.status_code == 401
