
// your map init already has maxZoom:22
const map = L.map('map', {
  center: [47.6062, -122.3321],
  zoom: 10,
  maxZoom: 22,

  // turn off zooming by scroll, double-click, touch
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  // turn off dragging/panning
  dragging: false,
  // don’t show the + / – zoom control
  zoomControl: false
});



L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles © Esri',
    maxNativeZoom: 19,  // Esri goes very deep
    maxZoom: 23,
    opacity: 0.5,    // <-- 50% opaque
  }
).addTo(map);

const zoomLevelSecondary = 20.7;

function resetModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('corner', 'wide', 'full-wide');
  return modal;
}

function closeModal() {
  const modal = resetModal();
  // Move & resize modal
  modal.classList.add('corner');

  modal.innerHTML = `
<div class="modal-box">
  <!-- 1. Chat/messages area -->
  <div class="modal-messages">
    <div class="message">Hello, how can I help you?</div>
    <div class="message user">I’d like to build an ADU on my lot.</div>
    <div class="message">Great! Let’s go through the requirements...</div>
    <!-- …more messages -->
  </div>

  <!-- 2. Divider line -->
  <div class="modal-divider"></div>

  <!-- 3. Bottom input area -->
  <div class="modal-input-area">
    <input
      type="text"
      class="modal-input"
      placeholder="Type your question..."
    />
    <button
      class="icon-btn send-btn"
      onclick="additionalInfo()"
      aria-label="Send"
    >
      ➤
    </button>
  </div>
</div>
`
  const iconSizeX = 420;
  const iconSizeY = 568;
  const multiplier = 0.9;
  const finalIconSizeX = iconSizeX * multiplier;
  const finalIconSizeY = iconSizeY * multiplier;
  const xMove = 90;
  const yMove = -20;
  const finalAnchorX = finalIconSizeX * 0.5 + xMove;
  const finalAnchorY = finalIconSizeY * 0.5 + yMove;

  // Zoom and pan map
  map.flyTo([47.641863557630266, -122.35323335375799], zoomLevelSecondary, { duration: 0.75 });

  // Delay showing rectangles by 1000ms
  const siteRect = document.getElementById('site-rect');
  const offsetRect = document.getElementById('offset-rect');
  const customPin = L.icon({
    iconUrl: 'assets/zoning_mockup.svg',   // path to your SVG
    iconSize: [finalIconSizeX, finalIconSizeY],             // adjust to your SVG’s intrinsic size
    iconAnchor: [finalAnchorX, finalAnchorY],             // [half-width, full-height] → bottom-center
  });
  setTimeout(() => {
    // if (siteRect) siteRect.style.display = 'block';
    // if (offsetRect) offsetRect.style.display = 'block';


    // 2. Add it at your chosen lat/lng
    const marker = L.marker([47.64181476395757, -122.35323469486246], { icon: customPin })
      .addTo(map)
      .bindPopup("Buildable zones appear in green.");  // optional popup

    // 2. Open the popup on hover…
    marker.on('mouseover', function () {
      this.openPopup();
    });

    // 3. …and close it when the mouse leaves
    marker.on('mouseout', function () {
      this.closePopup();
    });
  }, 1000);
}

function additionalInfo() {
  const modal = resetModal();
  // Move & resize modal
  modal.classList.add('corner');

  document
    .querySelector('.modal-input-area')
    .classList.add('with-house');

  modal.innerHTML = `
<div class="modal-box">
  <!-- 1. Chat/messages area -->
  <div class="modal-messages">
    <div class="message">Hello, how can I help you?</div>
    <div class="message user">I’d like to build an ADU on my lot.</div>
    <div class="message">Great! Let’s go through the requirements...</div>
    <div class="message user">It's a 6,000 sq ft R1 zoned lot at 123 Maple St.</div>
    <div class="message">You can build up to 800 sq ft. Would you like to see design options?</div>
    <div class="message user">Yes, please!</div>
    <div class="message">Here are some layout suggestions based on your constraints...</div>
  </div>

  <!-- 2. Divider line -->
  <div class="modal-divider"></div>

  <!-- 3. Bottom input area with two buttons -->
  <div class="modal-input-area">
    <input
      type="text"
      class="modal-input"
      placeholder="Type your next question..."
    />
    <!-- Message button (no action for now) -->
    <button
      class="icon-btn send-btn send-btn-moved "
      aria-label="Send"
    >
      ➤
    </button>
    <!-- Green house button to run designOptions() -->
    <button class="icon-btn options-btn" onclick="designOptions()" aria-label="Design Options">🏠</button>
  </div>
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
      <div class="modal-content options-content">
        <h3>Options</h3>
                  <div class="modal-divider"></div>
        <div class="options-scroll">
          <div class="options-grid">
            ${itemsHtml}
          </div>
        </div>
          <div class="modal-divider bottom-divider"></div>
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
  map.flyTo([47.64183193210692, -122.352933616903], zoomLevelSecondary);

  // move the site/offset rects over
  document.getElementById('site-rect')?.classList.add('moved-rect');
  document.getElementById('offset-rect')?.classList.add('moved-rect');
}


// stub out these handlers so they don’t error
// Add this to script.js
function compareOptions() {
  const modal = resetModal();
  // Switch sizing classes
  // modal.classList.remove('wide');
  modal.classList.add('full-wide');

  // Build the comparison view
  modal.innerHTML = `
      <div class="modal-content compare-options-modal ">
        <div class="option-container">
        <h3>Option 1</h3>
          <img src="assets/Compare_Option_1.png" alt="Compare Option 1">
          <div>
            <p>Data point A</p>
            <div class="modal-divider"></div>
            <p>Data point B</p>
            <div class="modal-divider"></div>
            <p>Data point C</p>
          </div>
        </div>
        <div class="option-container">
        <h3>Option 2</h3>
          <img src="assets/Compare_Option_2.png" alt="Compare Option 2">
          <div>
            <p>Data point A</p>
            <div class="modal-divider"></div>
            <p>Data point B</p>
            <div class="modal-divider"></div>
            <p>Data point C</p>
          </div>
        </div>

        <button class="back-btn" onclick="designOptions()">← Back</button>
      </div>
    `;
}

function financialReport() {
  const modal = resetModal();
  modal.classList.add('full-wide');

  modal.innerHTML = `
    <div class="modal-content dashboard">
      <!-- 1. Title as a direct child -->
      <h3 class="dashboard-title">AADU Project at 2508 Lorentz Pl N</h3>

      <!-- 2. Top row: image + finance -->
      <div class="dashboard-row header-row">
        <img src="assets/Compare_Option_1.png" alt="ADU Option">
        <div class="finance-box">
          <h4>Project Timeline</h4>
          <img src="assets/stonks_line.png" alt="Financial Chart">
        </div>
      </div>

      <!-- 3. Second row: data boxes -->
      <div class="dashboard-row data-row">
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

      <!-- 4. Back button -->
      <button class="back-btn" onclick="designOptions()">← Back</button>
    </div>
  `;
}