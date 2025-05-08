import pytest
from unittest.mock import Mock, patch
from app.main import RegridConnector
import json
import pandas as pd
import requests

# Sample mock responses
MOCK_PARCEL_POINT = {
    "parcel_id": "test-123",
    "lat": 42.331427,
    "lon": -83.045754
}

MOCK_PARCEL_DETAILS = {
    "parcel_id": "test-123",
    "zoning": "R1",
    "zoning_description": "Single Family Residential",
    "land_use_code": "101",
    "building_area_sq_ft": 2000,
    "land_area_sq_ft": 5000,
    "year_built": 1950
}

MOCK_PARCEL_BOUNDARY = {
    "type": "Feature",
    "properties": {
        "area": 5000
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]
    }
}

MOCK_SEARCH_RESULTS = [{
    "parcel_id": "test-123",
    "address": "123 Main St",
    "city": "Detroit",
    "state": "MI"
}]

@pytest.fixture
def regrid_connector():
    return RegridConnector("test_api_key")

@pytest.fixture
def mock_requests():
    with patch('app.main.requests') as mock_req:
        # Set up mock responses
        mock_response = Mock()
        mock_response.status_code = 200
        mock_req.get.return_value = mock_response
        yield mock_req

def test_init(regrid_connector):
    """Test initialization of RegridConnector"""
    assert regrid_connector.api_key == "test_api_key"
    assert regrid_connector.headers == {
        "Authorization": "Token test_api_key",
        "Content-Type": "application/json"
    }

def test_lookup_by_coordinates(regrid_connector, mock_requests):
    """Test looking up a parcel by coordinates"""
    mock_requests.get.return_value.json.return_value = [MOCK_PARCEL_POINT]
    
    result = regrid_connector.lookup_by_coordinates(42.331427, -83.045754)
    
    assert result == MOCK_PARCEL_POINT
    mock_requests.get.assert_called_once_with(
        regrid_connector.PARCEL_POINT_URL,
        headers=regrid_connector.headers,
        params={"lat": 42.331427, "lon": -83.045754}
    )

def test_get_parcel_details(regrid_connector, mock_requests):
    """Test getting parcel details"""
    mock_requests.get.return_value.json.return_value = MOCK_PARCEL_DETAILS
    
    result = regrid_connector.get_parcel_details("test-123")
    
    assert "zoning" in result
    assert "building_area_sq_ft" in result
    mock_requests.get.assert_called_once_with(
        f"{regrid_connector.PARCEL_DETAILS_URL}/test-123",
        headers=regrid_connector.headers
    )

def test_get_parcel_boundary(regrid_connector, mock_requests):
    """Test getting parcel boundary"""
    mock_requests.get.return_value.json.return_value = MOCK_PARCEL_BOUNDARY
    
    result = regrid_connector.get_parcel_boundary("test-123")
    
    assert result == MOCK_PARCEL_BOUNDARY
    mock_requests.get.assert_called_once_with(
        f"{regrid_connector.PARCEL_BOUNDARY_URL}/test-123",
        headers=regrid_connector.headers
    )

def test_search_parcels_by_address(regrid_connector, mock_requests):
    """Test searching parcels by address"""
    mock_requests.get.return_value.json.return_value = MOCK_SEARCH_RESULTS
    
    result = regrid_connector.search_parcels_by_address(
        address="123 Main St",
        city="Detroit",
        state="MI"
    )
    
    assert result == MOCK_SEARCH_RESULTS
    mock_requests.get.assert_called_once_with(
        f"{regrid_connector.BASE_URL}/search",
        headers=regrid_connector.headers,
        params={
            "address": "123 Main St",
            "city": "Detroit",
            "state": "MI"
        }
    )

def test_get_construction_data_by_address(regrid_connector, mock_requests):
    """Test getting construction data by address"""
    # Set up sequential responses for the chain of API calls
    mock_requests.get.return_value.json.side_effect = [
        MOCK_SEARCH_RESULTS,
        MOCK_PARCEL_DETAILS,
        MOCK_PARCEL_BOUNDARY
    ]
    
    result = regrid_connector.get_construction_data_by_address(
        address="123 Main St",
        city="Detroit",
        state="MI"
    )
    
    assert result["parcel_id"] == "test-123"
    assert "details" in result
    assert "boundary" in result
    assert mock_requests.get.call_count == 3

def test_get_construction_data_by_coordinates(regrid_connector, mock_requests):
    """Test getting construction data by coordinates"""
    # Set up sequential responses for the chain of API calls
    mock_requests.get.return_value.json.side_effect = [
        [MOCK_PARCEL_POINT],
        MOCK_PARCEL_DETAILS,
        MOCK_PARCEL_BOUNDARY
    ]
    
    result = regrid_connector.get_construction_data_by_coordinates(42.331427, -83.045754)
    
    assert result["parcel_id"] == "test-123"
    assert "details" in result
    assert "boundary" in result
    assert mock_requests.get.call_count == 3

def test_to_dataframe(regrid_connector):
    """Test converting parcel data to DataFrame"""
    parcels_data = [{
        "parcel_id": "test-123",
        "details": MOCK_PARCEL_DETAILS,
        "boundary": MOCK_PARCEL_BOUNDARY
    }]
    
    df = regrid_connector.to_dataframe(parcels_data)
    
    assert isinstance(df, pd.DataFrame)
    assert "parcel_id" in df.columns
    assert "zoning" in df.columns
    assert "has_boundary" in df.columns
    assert len(df) == 1

def test_api_error_handling(regrid_connector, mock_requests):
    """Test error handling for API calls"""
    mock_requests.get.return_value.status_code = 404
    mock_requests.get.return_value.text = "Not Found"
    mock_requests.get.return_value.json.return_value = []
    mock_requests.get.return_value.raise_for_status.side_effect = requests.exceptions.HTTPError
    
    with pytest.raises(requests.exceptions.HTTPError):
        regrid_connector.lookup_by_coordinates(42.331427, -83.045754)