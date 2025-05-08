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
    A connector class for fetching relevant parcel data from Regrid's API.
    """
    
    # Updated base URLs to match Regrid API v2 endpoints
    BASE_URL = "https://app.regrid.com/api/v2/us"
    PARCEL_POINT_URL = f"{BASE_URL}/parcel_points"
    PARCEL_DETAILS_URL = f"{BASE_URL}/parcel"
    PARCEL_BOUNDARY_URL = f"{BASE_URL}/parcel_boundary"
    
    # Fields relevant to construction cost calculations for urban infill construction
    CONSTRUCTION_FIELDS = [
        'll_uuid',
        'state_parcelnumb',
        'address',
        'lat',
        'lon',
        'zoning',
        'zoning_description',
        'struct',
        'structno',
        'yearbuilt',
        'numstories',
        'numunits',
        'num_rooms',
        'improvval',
        'landval',
        'parval',
        'roughness_rating',
        'highest_parcel_elevation',
        'lowest_parcel_elevation',
        'gisacre',
        'sqft'
    ]

    # Fields relevant to value-add calculations for urban infill construction
    VALUE_ADD_FIELDS = [
        'll_uuid',
        'state_parcelnumb',
        'address',
        'lat',
        'lon',
        'zoning',
        'zoning_description',
        'landval',
        'improvval',
        'parval',
        'saleprice',
        'saledate',
        'taxamt',
        'taxyear',
        'population_density',
        'housing_affordability_index',
        'housing_growth_past_5_years',
        'housing_growth_next_5_years',
        'median_household_income',
        'household_income_growth_next_5_years'
    ]

class RegridAPIConnector:
    """
    A connector class for interacting with Regrid's API to retrieve parcel data by address or point coordinates.
    """

    BASE_URL = "https://app.regrid.com/api/v2"

    def __init__(self, api_token):
        """
        Initialize the connector with the API token.

        :param api_token: Your Regrid API token.
        """
        self.api_token = api_token

    def get_parcel_by_address(self, address, path=None, return_zoning=True):
        """
        Retrieve parcel data by address.

        :param address: The address to query.
        :param path: Optional path to narrow down the search (e.g., state, county, city).
        :param return_zoning: Whether to include zoning data in the response.
        :return: JSON response from the API.
        """
        endpoint = f"{self.BASE_URL}/parcels/address"
        params = {
            "query": address,
            "path": path,
            "return_zoning": str(return_zoning).lower(),
            "token": self.api_token
        }
        response = requests.get(endpoint, params=params)
        response.raise_for_status()
        return response.json()

    def get_parcel_by_point(self, lat, lon, radius=None, return_zoning=True):
        """
        Retrieve parcel data by latitude and longitude (point coordinates).

        :param lat: Latitude of the point.
        :param lon: Longitude of the point.
        :param radius: Optional radius in meters to expand the search area.
        :param return_zoning: Whether to include zoning data in the response.
        :return: JSON response from the API.
        """
        endpoint = f"{self.BASE_URL}/parcels/point"
        params = {
            "lat": lat,
            "lon": lon,
            "radius": radius,
            "return_zoning": str(return_zoning).lower(),
            "token": self.api_token
        }
        response = requests.get(endpoint, params=params)
        response.raise_for_status()
        return response.json()



