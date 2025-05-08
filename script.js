// // Initialize the Leaflet map
const map = L.map('map').setView([47.6062, -122.3321], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

function closeModal() {
    const modal = document.getElementById('modal');
    // Move the modal to top-right
    modal.classList.add('corner');
    // Rebuild modal content with input and second button
    modal.innerHTML = `
        <div class="modal-content">
            <p>Enter your address or parcel ID to get started:</p>
            <input type="text" placeholder="e.g. 507 N 61ST ST or Parcel #9523103850">
            <button onclick="alert('Search triggered')">Search</button>
        </div>
    `;
    // Center the map on the specified coordinates
    map.flyTo([47.712466015741285, -122.31819187746984], 18);
}
