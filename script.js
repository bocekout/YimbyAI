
// your map init already has maxZoom:22
const map = L.map('map', {
    center: [47.6062, -122.3321],
    zoom: 10,
    maxZoom: 22
});

L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
        attribution: 'Tiles © Esri',
        maxNativeZoom: 19,  // Esri goes very deep
        maxZoom: 23
    }
).addTo(map);

function closeModal() {
    const modal = document.getElementById('modal');
    // Move & resize modal
    modal.classList.add('corner');

    // Replace content
    modal.innerHTML = `
      <div class="modal-content">
      <p>507 N 61ST ST Parcel 9523103850
Requirements for all ADUs
🗺️ Zoning: NR3This property is in a Neighborhood Residential (NR) zone. ADUs are allowed in Neighborhood Residential (NR), Residential Small Lot (RSL), and Lowrise (LR) zones.
🏠 Existing ADUs: noneAccording to City permit data, this property does not have an ADU. Lots in SF zones in Seattle can have up to two ADUs.

Additional requirements for a DADU
📐 Lot size: 5,003 square feetThis property meets the minimum lot size required to construct a DADU. The minimum lot area to construct a DADU is 3,200 square feet. On smaller lots, converting an existing accessory structure, like a detached garage, could be allowed.
▦ Lot coverage: 25.4 percentBased on our estimate, the footprint of existing structures on this lot is under the maximum lot coverage limit. For lots 5,000 square feet or larger, the maximum lot coverage limit is 35 percent of your lot area.
Based on the data available for this property, the maximum allowed coverage would be 1,751 square feet.Given the footprint of existing structures on the lot, you have about 481 square feet of coverage available, some or all of which could be used for a DADU.</p>
        <p>What’s your timeframe / budget / motivation</p>
        <input type="text" placeholder="Adding house for family">
        <button onclick="alert('Next Step')">>></button>
      </div>
    `;

    // Zoom and pan map
    map.flyTo([47.712466015741285, -122.31819187746984], 20);

    // Delay showing rectangles by 1000ms
    const siteRect = document.getElementById('site-rect');
    const offsetRect = document.getElementById('offset-rect');

    setTimeout(() => {
        if (siteRect) siteRect.style.display = 'block';
        if (offsetRect) offsetRect.style.display = 'block';
    }, 4000);
}
