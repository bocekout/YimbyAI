// Initialize the Leaflet map
const map = L.map('map').setView([47.6062, -122.3321], 10); // Example: Seattle coords

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
