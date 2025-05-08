
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

function resetModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('corner', 'wide', 'full-wide');
    return modal;
}

function closeModal() {
    const modal = resetModal();
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
        <button onclick="additionalInfo()">>></button>
      </div>
    `;

    // Zoom and pan map
    map.flyTo([47.712466015741285, -122.31819187746984], 20, { duration: 0.75 });

    // Delay showing rectangles by 1000ms
    const siteRect = document.getElementById('site-rect');
    const offsetRect = document.getElementById('offset-rect');

    setTimeout(() => {
        if (siteRect) siteRect.style.display = 'block';
        if (offsetRect) offsetRect.style.display = 'block';
    }, 1000);
}

function additionalInfo() {
    const modal = resetModal();
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
Based on the data available for this property, the maximum allowed coverage would be 1,751 square feet.Given the footprint of existing structures on the lot, you have about 481 square feet of coverage available, some or all of which could be used for a DADU.
<br><br>Analyzing viable options for adding housing unit for family member...</p>
        <p>What’s your timeframe / budget / motivation</p>
        <input type="text" placeholder="Adding house for family">
        <button onclick="designOptions()">>></button>
      </div>
`

}

const optionImages = [
    './assets/Option_1.png',
    './assets/Option_2.png',
    './assets/Option_3.png',
    './assets/Option_3.png',
    './assets/Option_3.png',
    './assets/Option_2.png',
    './assets/Option_2.png',
    './assets/Option_1.png',
    './assets/Option_3.png',
];

function designOptions() {
    const modal = resetModal();
    modal.classList.remove('corner');
    modal.classList.add('wide');

    // build the items
    const itemsHtml = optionImages.map((src, i) => `
      <div class="option-item" data-idx="${i}">
        <img src="${src}" alt="Option ${i + 1}">
      </div>
    `).join('');

    // inject scrollable grid + fixed buttons
    modal.innerHTML = `
      <div class="modal-content">
        <p>Options:</p>
        <div class="options-scroll">
          <div class="options-grid">
            ${itemsHtml}
          </div>
        </div>
        <div class="buttons">
          <button onclick="compareOptions()">Compare Options</button>
          <button onclick="financialReport()">Financial Report</button>
        </div>
      </div>
    `;

    // wire up hover & click for each item
    const items = modal.querySelectorAll('.option-item');
    items.forEach(item => {
        const idx = +item.dataset.idx;
        const rect = document.getElementById(`option${idx + 1}-rect`);

        // hover preview
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                rect && (rect.style.display = 'block');
            }
        });
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                rect && (rect.style.display = 'none');
            }
        });

        // click to lock selection
        item.addEventListener('click', () => {
            // clear previous active + hide their rects
            items.forEach(other => {
                other.classList.remove('active');
                const oidx = +other.dataset.idx;
                const orect = document.getElementById(`option${oidx + 1}-rect`);
                orect && (orect.style.display = 'none');
            });

            // mark this one active + keep its rect visible
            item.classList.add('active');
            rect && (rect.style.display = 'block');
        });
    });

    // pan & fly the map
    map.flyTo([47.71244990099978, -122.31767167936012], 20);

    // move the site/offset rects over
    document.getElementById('site-rect')?.classList.add('moved-rect');
    document.getElementById('offset-rect')?.classList.add('moved-rect');
}


// stub out these handlers so they don’t error
// Add this to script.js
function compareOptions() {
    const modal = resetModal();
    // Switch sizing classes
    modal.classList.remove('wide');
    modal.classList.add('full-wide');

    // Build the comparison view
    modal.innerHTML = `
      <div class="modal-content">
        <div class="option-container">
          <img src="assets/Compare_Option_1.png" alt="Compare Option 1">
          <div>
            <p>Data point A</p>
            <p>Data point B</p>
            <p>Data point C</p>
          </div>
        </div>
        <div class="option-container">
          <img src="assets/Compare_Option_2.png" alt="Compare Option 2">
          <div>
            <p>Data point A</p>
            <p>Data point B</p>
            <p>Data point C</p>
          </div>
        </div>
        <button onclick="designOptions()">← Back</button>
      </div>
    `;
}


function financialReport() {
    const modal = resetModal();
    // switch sizing classes
    modal.classList.remove('wide');
    modal.classList.add('full-wide');

    modal.innerHTML = `
      <div class="modal-content">
        <div class="dashboard-header">
          <!-- reuse the first compare option image -->
          <img src="assets/Compare_Option_1.png" alt="ADU Option" style="width:150px; border-radius:8px;">
          <div class="finance-box">
            <h3>Finances</h3>
            <img src="assets/stonks_line.png" alt="Financial Chart">
          </div>
        </div>
  
        <div class="data-boxes">
          <div class="data-box">
            <p>Total Cost</p>
            <p>$150,000</p>
          </div>
          <div class="data-box">
            <p>Annual ROI</p>
            <p>5%</p>
          </div>
          <div class="data-box">
            <p>Monthly Payment</p>
            <p>$800</p>
          </div>
          <div class="data-box">
            <p>Build Time</p>
            <p>6 months</p>
          </div>
        </div>
  
        <div class="buttons">
          <button onclick="designOptions()">← Back</button>
        </div>
      </div>
    `;
}

