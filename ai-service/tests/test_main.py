import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["service"] == "EcoVision AI Microservice"

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "UP"

def test_detect_objects_simulation():
    payload = {
        "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        "confidenceThreshold": 0.4
    }
    response = client.post("/detect", json=payload)
    assert response.status_code == 200
    assert response.json()["success"] is True
    assert "objects" in response.json()
