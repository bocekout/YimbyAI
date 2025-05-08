import requests
import pandas as pd
import numpy as np
import json
from typing import Dict, List, Union, Optional
from datetime import datetime
import logging
import os  # Added import

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('RegridConnector')

class RegridConnector:
    """
    A connector class for fetching construction-relevant parcel data from Regrid's API.
    """
    
    # Base URLs for Regrid APIs
    BASE_URL = "https://app.regrid.com/api/v1"
    PARCEL_POINT_URL = f"{BASE_URL}/parcel_points"
    PARCEL_DETAILS_URL = f"{BASE_URL}/parcel"
    PARCEL_BOUNDARY_URL = f"{BASE_URL}/parcel_boundary"
    
    # Construction-relevant fields to extract from responses
    CONSTRUCTION_FIELDS = [
        'zoning', 
        'zoning_description',
        'land_use_code', 
        'land_use_description',
        'building_area_sq_ft',
        'land_area_sq_ft',
        'land_area_acres',
        'frontage_ft',
        'depth_ft',
        'year_built',
        'building_condition',
        'total_buildings',
        'building_height_ft',
        'setback_front_ft',
        'setback_rear_ft',
        'setback_side_ft',
        'max_building_height_ft',
        'flood_zone',
        'sewer_type',
        'water_type',
        'electricity',
        'gas',
        'topography',
        'environmental_restrictions',
        'building_permits'
    ]
    
    def __init__(self, api_key: str):
        """
        Initialize the Regrid connector with your API key.
        
        Args:
            api_key: Your Regrid API key
        """
        self.api_key = api_key
        self.headers = {
            "Authorization": f"Token {api_key}",
            "Content-Type": "application/json"
        }
    
    def lookup_by_coordinates(self, lat: float, lon: float) -> Dict:
        """
        Look up a parcel by coordinates.
        
        Args:
            lat: Latitude
            lon: Longitude
            
        Returns:
            Dictionary containing parcel information
        """
        params = {
            "lat": lat,
            "lon": lon
        }
        
        logger.info(f"Looking up parcel at coordinates: ({lat}, {lon})")
        response = requests.get(
            self.PARCEL_POINT_URL, 
            headers=self.headers, 
            params=params
        )
        
        if response.status_code != 200:
            response.raise_for_status()
            logger.error(f"Error in API call: {response.status_code} - {response.text}")
        
        data = response.json()
        # Extract parcel_id for subsequent calls
        if data and len(data) > 0:
            logger.info(f"Found parcel with ID: {data[0].get('parcel_id')}")
            return data[0]
        else:
            logger.warning("No parcel found at the specified coordinates")
            return {}
    
    def get_parcel_details(self, parcel_id: str) -> Dict:
        """
        Get detailed information about a parcel.
        
        Args:
            parcel_id: The unique parcel identifier
            
        Returns:
            Dictionary containing detailed parcel information
        """
        url = f"{self.PARCEL_DETAILS_URL}/{parcel_id}"
        
        logger.info(f"Fetching details for parcel ID: {parcel_id}")
        response = requests.get(url, headers=self.headers)
        
        if response.status_code == 200:
            data = response.json()
            # Filter for construction-relevant fields
            construction_data = self._extract_construction_fields(data)
            logger.info("Successfully retrieved parcel details")
            return construction_data
        else:
            logger.error(f"Error in API call: {response.status_code} - {response.text}")
            response.raise_for_status()
    
    def get_parcel_boundary(self, parcel_id: str) -> Dict:
        """
        Get the boundary/polygon data for a parcel.
        
        Args:
            parcel_id: The unique parcel identifier
            
        Returns:
            GeoJSON representation of the parcel boundary
        """
        url = f"{self.PARCEL_BOUNDARY_URL}/{parcel_id}"
        
        logger.info(f"Fetching boundary for parcel ID: {parcel_id}")
        response = requests.get(url, headers=self.headers)
        
        if response.status_code == 200:
            data = response.json()
            logger.info("Successfully retrieved parcel boundary")
            return data
        else:
            logger.error(f"Error in API call: {response.status_code} - {response.text}")
            response.raise_for_status()
    
    def search_parcels_by_address(self, address: str, city: str = None, 
                                  state: str = None, zip_code: str = None) -> List[Dict]:
        """
        Search for parcels by address components.
        
        Args:
            address: Street address
            city: City name (optional)
            state: State code (optional)
            zip_code: ZIP code (optional)
            
        Returns:
            List of matching parcels
        """
        params = {"address": address}
        
        # Add optional parameters if provided
        if city:
            params["city"] = city
        if state:
            params["state"] = state
        if zip_code:
            params["zip"] = zip_code
        
        logger.info(f"Searching for parcels with address: {address}")
        response = requests.get(
            f"{self.BASE_URL}/search", 
            headers=self.headers, 
            params=params
        )
        
        if response.status_code == 200:
            data = response.json()
            logger.info(f"Found {len(data)} matching parcels")
            return data
        else:
            logger.error(f"Error in API call: {response.status_code} - {response.text}")
            response.raise_for_status()
    
    def get_construction_data_by_address(self, address: str, city: str = None,
                                        state: str = None, zip_code: str = None) -> Dict:
        """
        Complete workflow to get construction-relevant data for an address.
        
        Args:
            address: Street address
            city: City name (optional)
            state: State code (optional)
            zip_code: ZIP code (optional)
            
        Returns:
            Dictionary with construction-relevant parcel data
        """
        # First search for the parcel
        search_results = self.search_parcels_by_address(address, city, state, zip_code)
        
        if not search_results or len(search_results) == 0:
            logger.warning(f"No parcels found for address: {address}")
            return {}
        
        # Get the first matching parcel
        parcel_id = search_results[0].get('parcel_id')
        
        # Get details and boundary for the parcel
        details = self.get_parcel_details(parcel_id)
        boundary = self.get_parcel_boundary(parcel_id)
        
        # Combine the data
        construction_data = {
            "parcel_id": parcel_id,
            "details": details,
            "boundary": boundary
        }
        
        return construction_data
    
    def get_construction_data_by_coordinates(self, lat: float, lon: float) -> Dict:
        """
        Complete workflow to get construction-relevant data for coordinates.
        
        Args:
            lat: Latitude
            lon: Longitude
            
        Returns:
            Dictionary with construction-relevant parcel data
        """
        # First get the parcel at these coordinates
        parcel = self.lookup_by_coordinates(lat, lon)
        
        if not parcel:
            logger.warning(f"No parcel found at coordinates: ({lat}, {lon})")
            return {}
        
        parcel_id = parcel.get('parcel_id')
        
        # Get details and boundary for the parcel
        details = self.get_parcel_details(parcel_id)
        boundary = self.get_parcel_boundary(parcel_id)
        
        # Combine the data
        construction_data = {
            "parcel_id": parcel_id,
            "details": details,
            "boundary": boundary
        }
        
        return construction_data
    
    def _extract_construction_fields(self, data: Dict) -> Dict:
        """
        Extract only the construction-relevant fields from the API response.
        
        Args:
            data: Complete parcel data dictionary
            
        Returns:
            Dictionary with only construction-relevant fields
        """
        result = {}
        
        # Copy all construction-relevant fields that exist in the data
        for field in self.CONSTRUCTION_FIELDS:
            if field in data:
                result[field] = data[field]
        
        # Add a few extra useful fields if they exist
        extra_fields = ['owner_name', 'owner_address', 'tax_assessment', 'fips_code']
        for field in extra_fields:
            if field in data:
                result[field] = data[field]
                
        return result
    
    def to_dataframe(self, parcels_data: List[Dict]) -> pd.DataFrame:
        """
        Convert a list of parcel data to a pandas DataFrame.
        
        Args:
            parcels_data: List of parcel dictionaries
            
        Returns:
            DataFrame with parcel data
        """
        # Flatten the nested structure for easier DataFrame creation
        flattened_data = []
        
        for parcel in parcels_data:
            flat_parcel = {"parcel_id": parcel.get("parcel_id")}
            
            # Add details fields
            details = parcel.get("details", {})
            for key, value in details.items():
                flat_parcel[key] = value
            
            # Add basic boundary info (not the full geometry)
            boundary = parcel.get("boundary", {})
            if boundary and "properties" in boundary:
                flat_parcel["has_boundary"] = True
                flat_parcel["boundary_area"] = boundary.get("properties", {}).get("area")
            else:
                flat_parcel["has_boundary"] = False
            
            flattened_data.append(flat_parcel)
        
        return pd.DataFrame(flattened_data)


# Example usage:
if __name__ == "__main__":
    # Initialize with your API key from environment variable or a default
    api_key = os.environ.get("REGRID_API_KEY", "your_regrid_api_key_here_as_default")
    if api_key == "your_regrid_api_key_here_as_default":
        logger.warning("Using default API key for example. Set REGRID_API_KEY environment variable.")
    
    regrid = RegridConnector(api_key)
    
    # Example 1: Get parcel data by address
    construction_data = regrid.get_construction_data_by_address(
        address="123 Main St",
        city="Detroit",
        state="MI"
    )
    
    # Example 2: Get parcel data by coordinates
    lat, lon = 42.331427, -83.045754  # Example coordinates in Detroit
    construction_data = regrid.get_construction_data_by_coordinates(lat, lon)
    
    # Convert multiple parcels to DataFrame
    parcels_list = [construction_data]
    df = regrid.to_dataframe(parcels_list)
    
    # Save the data to CSV
    df.to_csv("construction_parcels.csv", index=False)
    
    print(f"Processed {len(parcels_list)} parcels with construction data")