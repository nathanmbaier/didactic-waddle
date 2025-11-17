// Cap Builder Application - Vanilla JavaScript Version

// ============================================================================
// DATA & CONSTANTS
// ============================================================================

const CAP_PARTS = [
  { inputName: "FRONT PANELS", colorSource: "STYLE" },
  { inputName: "FRONT EYELETS", colorSource: "STYLE" },
  { inputName: "BACK PANELS", colorSource: "STYLE" },
  { inputName: "BACK EYELETS", colorSource: "STYLE" },
  { inputName: "CROWN STITCHING", colorSource: "STYLE" },
  { inputName: "ROPE", colorSource: "STYLE" },
  { inputName: "VISOR", colorSource: "STYLE" },
  { inputName: "UNDERVISOR", colorSource: "STYLE" },
  { inputName: "VISOR STITCHING", colorSource: "STYLE" },
  { inputName: "BUTTON", colorSource: "STYLE" },
  { inputName: "BACKSTRAP BOTTOM", colorSource: "BACKSTRAP_BOTTOM" },
  { inputName: "BACKSTRAP TOP", colorSource: "BACKSTRAP_TOP" },
  { inputName: "FRONT LINING", colorSource: "FRONT_INSIDE_LINING" },
  { inputName: "SWEATBAND", colorSource: "SWEATBAND" },
  { inputName: "INTERIOR TAPING", colorSource: "INTERIOR_TAPING" }
];

const FIXED_COLORS = [
  { name: "S15-Blue", rgb: { r: 0, g: 113, b: 206 } },
  { name: "S15-Cardinal", rgb: { r: 163, g: 32, b: 33 } },
  { name: "S15-Dk Green", rgb: { r: 18, g: 71, b: 52 } }
];

// --- THIS IS YOUR FULL, 12-STYLE LIST ---
const CAP_STYLES = [
  {
    id: "perfect-game",
    name: "PERFECT GAME",
    displayName: "Perfect Game",
    description: "Classic baseball cap with premium performance fabrics and traditional styling",
    image: "perfect-game",
    colors: [
      { name: "12-Beige", rgb: { r: 192, g: 190, b: 182 } },
      { name: "10-Bt Orange", rgb: { r: 192, g: 107, b: 19 } },
      { name: "6-Grey", rgb: { r: 123, g: 134, b: 140 } }
    ]
  },
  {
    id: "air-flow",
    name: "AIR FLOW",
    displayName: "Air Flow",
    description: "Mesh back trucker cap with breathable performance and adjustable snapback",
    image: "air-flow",
    colors: [
      { name: "12-Beige", rgb: { r: 192, g: 190, b: 182 } },
      { name: "10-Bt Orange", rgb: { r: 192, g: 107, b: 19 } },
      { name: "6-Grey", rgb: { r: 123, g: 134, b: 140 } }
    ]
  },
  {
    id: "laserluxe",
    name: "LASERLUXE",
    displayName: "LaserLuxe",
    description: "Premium structured cap with laser-cut details and modern aesthetics",
    image: "laserluxe",
    colors: [
      { name: "6-Blue", rgb: { r: 0, g: 113, b: 206 } },
      { name: "11-Dk Green", rgb: { r: 18, g: 71, b: 52 } },
      { name: "3-Navy", rgb: { r: 1, g: 30, b: 65 } }
    ]
  },
  {
    id: "road-runner",
    name: "ROAD RUNNER",
    displayName: "Road Runner",
    description: "Athletic performance cap with moisture-wicking fabric and reflective accents",
    image: "road-runner",
    colors: [
      { name: "4-Red", rgb: { r: 234, g: 0, b: 41 } },
      { name: "11-Grey", rgb: { r: 123, g: 134, b: 140 } },
      { name: "21-Royal", rgb: { r: 0, g: 51, b: 161 } }
    ]
  },
  {
    id: "high-point",
    name: "HIGH POINT",
    displayName: "High Point",
    description: "Structured snapback with elevated crown and premium wool blend fabric",
    image: "high-point",
    colors: [
      { name: "8-Royal", rgb: { r: 0, g: 51, b: 161 } },
      { name: "9Lt-Navy", rgb: { r: 0, g: 33, b: 105 } },
      { name: "2-Stone", rgb: { r: 192, g: 182, b: 15 } }
    ]
  },
  {
    id: "night-shift",
    name: "NIGHT SHIFT",
    displayName: "Night Shift",
    description: "Low-profile cap with reflective elements and urban styling for night visibility",
    image: "night-shift",
    colors: [
      { name: "1-White", rgb: { r: 255, g: 255, b: 255 } },
      { name: "19-Lt Smoke Blue", rgb: { r: 129, g: 161, b: 175 } },
      { name: "1-White", rgb: { r: 255, g: 255, b: 255 } }
    ]
  },
  {
    id: "ultralite",
    name: "ULTRALITE",
    displayName: "Ultralite",
    description: "Ultra-lightweight performance cap with moisture management and UPF protection",
    image: "ultralite",
    colors: [
      { name: "3-Black", rgb: { r: 0, g: 0, b: 0 } },
      { name: "20Lt-Blue", rgb: { r: 138, g: 183, b: 233 } },
      { name: "4-Black", rgb: { r: 0, g: 0, b: 0 } }
    ]
  },
  {
    id: "caddy",
    name: "CADDY",
    displayName: "Caddy",
    description: "Premium golf-inspired cap with leather patch and classic rope detailing",
    image: "caddy",
    colors: [
      { name: "7-Blue", rgb: { r: 0, g: 113, b: 206 } },
      { name: "10-Navy", rgb: { r: 1, g: 30, b: 65 } },
      { name: "2-DK Charcoal", rgb: { r: 37, g: 37, b: 37 } }
    ]
  },
  {
    id: "crew",
    name: "CREW",
    displayName: "Crew",
    description: "Curved brim work cap with durable canvas fabric and adjustable closure",
    image: "crew",
    colors: [
      { name: "4-Bt Orange", rgb: { r: 192, g: 107, b: 19 } },
      { name: "18-Olive", rgb: { r: 111, g: 113, b: 87 } },
      { name: "9-DK Maroon", rgb: { r: 105, g: 28, b: 50 } }
    ]
  },
  {
    id: "offroad",
    name: "OFFROAD",
    displayName: "Offroad",
    description: "Rugged outdoor cap with reinforced construction and adventure-ready design",
    image: "offroad",
    colors: [
      { name: "15-Cardinal", rgb: { r: 163, g: 32, b: 33 } },
      { name: "14-Pink", rgb: { r: 255, g: 111, b: 148 } },
      { name: "8-Dk Pink", rgb: { r: 244, g: 0, b: 122 } }
    ]
  },
  {
    id: "6-below",
    name: "6-BELOW",
    displayName: "6-Below",
    description: "Insulated winter cap with ear flaps and thermal lining for cold weather",
    image: "6-below",
    colors: [
      { name: "16-Dk Green", rgb: { r: 18, g: 71, b: 52 } },
      { name: "19-Pipe Grey", rgb: { r: 100, g: 132, b: 132 } },
      { name: "7-Kelly Green", rgb: { r: 0, g: 131, b: 62 } }
    ]
  },
  {
    id: "ultralite-visor",
    name: "ULTRALITE VISOR",
    displayName: "Ultralite Visor",
    description: "Performance visor with sweat-wicking headband and adjustable fit",
    image: "ultralite-visor",
    colors: [
      { name: "8-Green", rgb: { r: 0, g: 101, b: 72 } },
      { name: "6-Red", rgb: { r: 234, g: 0, b: 41 } },
      { name: "5-Powder Blue", rgb: { r: 118, g: 130, b: 15 } }
    ]
  }
];

const FABRIC_COLORS = [
  { 
    id: "cotton", 
    name: "COTTON", 
    displayName: "Cotton", 
    description: "A classic, breathable, and soft natural fiber. Provides a traditional look and feel.",
    image: "assets/part_diagrams/front-panels.png", 
    colors: [
      { name: "Cotton-Red", rgb: { r: 210, g: 50, b: 50 } },
      { name: "Cotton-Blue", rgb: { r: 100, g: 140, b: 200 } },
      { name: "Cotton-Khaki", rgb: { r: 195, g: 176, b: 145 } }
    ]
  },
  { 
    id: "poly", 
    name: "POLY", 
    displayName: "Polyester", 
    description: "A durable, moisture-wicking synthetic fabric. Holds color well and is ideal for athletic performance.",
    image: "assets/part_diagrams/front-panels.png", 
    colors: [
      { name: "Poly-Bright-Yellow", rgb: { r: 255, g: 235, b: 0 } },
      { name: "Poly-Neon-Green", rgb: { r: 57, g: 255, b: 20 } },
      { name: "Poly-Graphite", rgb: { r: 80, g: 80, b: 80 } }
    ]
  },
  { 
    id: "nylon", 
    name: "NYLON", 
    displayName: "Nylon", 
    description: "A lightweight, strong, and weather-resistant fabric. Often has a slight sheen and is great for outdoor gear.",
    image: "assets/part_diagrams/front-panels.png", 
    colors: [
      { name: "Nylon-Silver", rgb: { r: 192, g: 192, b: 192 } },
      { name: "Nylon-Black", rgb: { r: 10, g: 10, b: 10 } },
      { name: "Nylon-Safety-Orange", rgb: { r: 255, g: 120, b: 0 } }
    ]
  }
];

// ============================================================================
// UTILITIES
// ============================================================================

function getCombinedStyleColors() {
  const sourceData = state.selectionMode === 'STYLE' ? CAP_STYLES : FABRIC_COLORS;
  const selectedItems = sourceData.filter(s => state.selectedStyleIds.includes(s.id));
  
  const allColors = [];
  selectedItems.forEach(item => {
    allColors.push(...item.colors);
  });
  
  const uniqueColorsMap = new Map();
  allColors.forEach(color => {
    if (!uniqueColorsMap.has(color.name)) {
      uniqueColorsMap.set(color.name, color);
    }
  });
  
  return Array.from(uniqueColorsMap.values());
}

function getColorsForPart(part) {
  if (part.colorSource === "STYLE") {
    return getCombinedStyleColors();
  }
  return FIXED_COLORS;
}

function getCapStyleImageUrl(styleId) {
  const sourceData = state.selectionMode === 'STYLE' ? CAP_STYLES : FABRIC_COLORS;
  const item = sourceData.find(s => s.id === styleId);
  
  if (state.selectionMode === 'STYLE') {
     return `assets/cap_styles/${item.image}-style.png`;
  }
  return item.image;
}

function getPartDiagramUrl(partName) {
  const partId = partName.toLowerCase().replace(/\s+/g, '-');
  return `assets/part_diagrams/${partId}.png`;
}

function rgbToString(rgb) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

const state = {
  selectionMode: null, // "STYLE" or "FABRIC"
  selectedStyleIds: [],
  partColors: {}
};

function setState(updates) {
  Object.assign(state, updates);
}

function initializePartColors() {
  const partColors = {};
  CAP_PARTS.forEach(part => {
    const colors = getColorsForPart(part);
    if (colors.length > 0) {
      partColors[part.inputName] = colors[0];
    }
  });
  setState({ partColors });
}

// ============================================================================
// ROUTER (WITH FADE ANIMATION)
// ============================================================================

function navigate(hash) {
  window.location.hash = hash;
}

function getHashParams() {
  const hash = window.location.hash.slice(1);
  const parts = hash.split('/');
  return {
    view: parts[0] || 'mode',
    param: parts[1] || null 
  };
}

function router() {
  const { view, param } = getHashParams();
  
  const modeSelectorView = document.getElementById('mode-selector-view');
  const styleSelectorView = document.getElementById('style-selector-view');
  const builderView = document.getElementById('builder-view');

  // 1. Hide all views by removing the .active class
  [modeSelectorView, styleSelectorView, builderView].forEach(v => {
    v.classList.remove('active');
  });

  // 2. Show the correct view by adding .active
  if (view === 'style-select') {
    styleSelectorView.classList.add('active');
    setState({ selectionMode: param, selectedStyleIds: [] }); 
    renderStyleSelector();

  } else if (view === 'builder' && param) {
    builderView.classList.add('active');
    const styleIds = param.split(','); 
    setState({ selectedStyleIds: styleIds });
    initializePartColors();
    renderBuilder();

  } else {
    // Default to the new mode selector page
    modeSelectorView.classList.add('active');
  }
}

// ============================================================================
// STYLE SELECTOR VIEW (WITH MULTI-SELECT AND FABRIC TILES)
// ============================================================================

function renderStyleSelector() {
  const grid = document.getElementById('style-grid');
  const confirmBtn = document.getElementById('confirm-btn');
  const title = document.getElementById('style-selector-title');

  const sourceData = state.selectionMode === 'STYLE' ? CAP_STYLES : FABRIC_COLORS;
  
  if (state.selectionMode === 'STYLE') {
    title.textContent = "PICK ONE OR MORE STYLES";
    grid.classList.remove('fabric-mode');
  } else {
    title.textContent = "PICK ONE OR MORE FABRICS";
    grid.classList.add('fabric-mode');
  }
  
  grid.innerHTML = '';
  
  sourceData.forEach(item => {
    
    const card = document.createElement('button');
    card.setAttribute('data-testid', `button-select-${item.id}`);

    // --- THIS IS THE CRITICAL FIX ---
    // We set the base class first...
    if (state.selectionMode === 'STYLE') {
        card.className = 'style-card';
        const imageUrl = `assets/cap_styles/${item.image}-style.png`;
        card.innerHTML = `
          <div class="selection-overlay"></div>
          <div class="style-image">
            <img src="${imageUrl}" alt="${item.displayName}" data-testid="img-cap-${item.id}">
          </div>
          <div class="style-name" data-testid="text-style-name-${item.id}">${item.displayName.toUpperCase()}</div>
        `;
    } else {
        card.className = 'fabric-tile';
        card.innerHTML = `
          <div class="selection-overlay"></div>
          <div class="fabric-info">
            <h3 class="fabric-title" data-testid="text-fabric-name-${item.id}">${item.displayName.toUpperCase()}</h3>
            <p class="fabric-description" data-testid="text-fabric-desc-${item.id}">${item.description}</p>
          </div>
        `;
    }
    
    // ...and THEN we add 'selected' if it's in the state.
    // This prevents the class name from being overwritten.
    if (state.selectedStyleIds.includes(item.id)) {
      card.classList.add('selected');
    }
    
    // --- THIS IS THE MULTI-SELECT TOGGLE LOGIC ---
    card.addEventListener('click', () => {
      const currentIds = [...state.selectedStyleIds];
      const idIndex = currentIds.indexOf(item.id);
      
      if (idIndex > -1) {
        // It exists, so remove it
        currentIds.splice(idIndex, 1);
      } else {
        // It doesn't exist, so add it
        currentIds.push(item.id);
      }
      
      setState({ selectedStyleIds: currentIds });
      renderStyleSelector(); // Re-render the grid to show new selections
    });
    
    grid.appendChild(card);
  });
  
  confirmBtn.disabled = state.selectedStyleIds.length === 0;
}

// ============================================================================
// BUILDER VIEW
// ============================================================================

function renderBuilder() {
  const sourceData = state.selectionMode === 'STYLE' ? CAP_STYLES : FABRIC_COLORS;
  const styles = sourceData.filter(s => state.selectedStyleIds.includes(s.id));
  if (styles.length === 0) return;
  
  const firstStyle = styles[0];
  const combinedNames = styles.map(s => s.name).join(' + ');
  const combinedDescriptions = styles.map(s => s.displayName).join(' / ');
  
  document.getElementById('builder-title').textContent = combinedNames;
  document.getElementById('builder-description').textContent = combinedDescriptions;
  
  // Use a fallback image for fabrics
  const headerImageUrl = (state.selectionMode === 'STYLE' && firstStyle.image)
    ? `assets/cap_styles/${firstStyle.image}-style.png`
    : 'assets/maginlogo.png'; // Use your logo as a fallback
  
  const refImage = document.getElementById('reference-cap');
  refImage.src = headerImageUrl;
  refImage.alt = firstStyle.displayName;
  
  const partsList = document.getElementById('parts-list');
  partsList.innerHTML = '';
  
  CAP_PARTS.forEach(part => {
    const colors = getColorsForPart(part);
    const selectedColor = state.partColors[part.inputName] || colors[0];
    const partId = part.inputName.toLowerCase().replace(/\s+/g, '-');
    
    const partCard = document.createElement('div');
    partCard.className = 'part-card';
    partCard.setAttribute('data-testid', `part-selector-${partId}`);
    
    const optionsHtml = colors.map(color => 
      `<option value="${color.name}" ${selectedColor && color.name === selectedColor.name ? 'selected' : ''}>${color.name}</option>`
    ).join('');
    
    partCard.innerHTML = `
      <div class="part-content">
        <div class="part-icon" data-testid="icon-${partId}">
          <img src="${getPartDiagramUrl(part.inputName)}" alt="${part.inputName}">
        </div>
        <div class="part-info">
          <div class="part-label" data-testid="label-${partId}">${part.inputName}</div>
          <select class="part-select" data-part="${part.inputName}" data-testid="select-${partId}">
            ${optionsHtml}
          </select>
        </div>
        <div class="part-preview" 
             style="background-color: ${selectedColor ? rgbToString(selectedColor.rgb) : '#FFFFFF'}"
             data-testid="preview-${partId}">
        </div>
      </div>
    `;
    
    partsList.appendChild(partCard);
  });
  
  partsList.querySelectorAll('.part-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const partName = e.target.dataset.part;
      const colorName = e.target.value;
      
      const colors = getColorsForPart(
        CAP_PARTS.find(p => p.inputName === partName)
      );
      const color = colors.find(c => c.name === colorName);
      
      if (color) {
        state.partColors[partName] = color;
        const partId = partName.toLowerCase().replace(/\s+/g, '-');
        const preview = document.querySelector(`[data-testid="preview-${partId}"]`);
        if (preview) {
          preview.style.backgroundColor = rgbToString(color.rgb);
        }
      }
    });
  });
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('select-by-style-btn').addEventListener('click', () => {
    navigate('#style-select/STYLE');
  });

  document.getElementById('select-by-fabric-btn').addEventListener('click', () => {
    navigate('#style-select/FABRIC');
  });

  document.getElementById('confirm-btn').addEventListener('click', () => {
    if (state.selectedStyleIds.length > 0) {
      navigate(`#builder/${state.selectedStyleIds.join(',')}`);
    }
  });
  
  document.getElementById('change-btn').addEventListener('click', () => {
    navigate('#mode');
  });
  
  // --- THIS IS THE NEW LISTENER ---
  document.getElementById('change-style-selection-btn').addEventListener('click', () => {
    navigate('#mode');
  });
  
  document.getElementById('execute-btn').addEventListener('click', () => {
    var csInterface = new CSInterface();
    var selections = state.partColors;
    // --- THIS IS THE FIX ---
    // We stringify the object *once* here.
    var selectionsJSON = JSON.stringify(selections); 
    // We stringify the *command string* here. This is correct.
    var command = "applyAllColors(" + JSON.stringify(selectionsJSON) + ")";

    csInterface.evalScript(command, (result) => {
        alert(result); 
    });
  });
  
  window.addEventListener('hashchange', router);
  
  if (!window.location.hash) {
    window.location.hash = '#mode';
  }
  
  router();
});