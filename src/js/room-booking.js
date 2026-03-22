/**
 * Room booking module
 * Handles hotel selection, guest forms, sharer management, and date selection
 */
import { state, addGuest as addStateGuest, removeGuest as removeStateGuest } from './state.js';
import { getAllHotels, getQuickRoomTypes, getPromotion, getAgentQuickSelect } from './hotels.js';
import { formatDate, formatDateShort, getTodayStr, getTomorrowStr, resolvePID } from './utils.js';

let guestIdCounter = 1;
let dateRangePicker = null;

/**
 * Initialize room booking section
 */
export function initRoomBooking() {
  renderAgentSelector();
  renderHotelSelector();
  renderDateSelector();
  renderAuthorizerSelector();
  
  // Add first guest by default
  addGuestForm();
  
  // Bind add guest button
  const addBtn = document.getElementById('btn-add-guest');
  if (addBtn) {
    addBtn.addEventListener('click', () => addGuestForm());
  }
}

/**
 * Render agent selector with quick buttons
 */
function renderAgentSelector() {
  const container = document.getElementById('agent-selector');
  if (!container) return;

  const agents = getAgentQuickSelect();
  
  container.innerHTML = `
    <div class="form-group" style="max-width: 200px;">
      <input list="agentList" id="agentName" placeholder="Agent" class="form-input" onclick="this.select()">
      <datalist id="agentList">
        ${agents.map(a => `<option value="${a.name}">`).join('')}
      </datalist>
    </div>
    <div class="quick-select" style="margin-top: 0.5rem;">
      ${agents.map(a => `
        <button type="button" class="quick-btn agent-btn" data-agent="${a.code}" onclick="window.app.setAgent('${a.code}', '${a.name}')">
          ${a.code}
        </button>
      `).join('')}
    </div>
  `;
}

/**
 * Render hotel selector buttons
 */
function renderHotelSelector() {
  const container = document.getElementById('hotel-selector');
  if (!container) return;

  const hotels = getAllHotels();
  
  container.innerHTML = Object.entries(hotels).map(([code, hotel]) => `
    <button type="button" class="quick-btn hotel-btn" data-hotel="${code}" onclick="window.app.selectHotel('${code}')">
      ${code}
    </button>
  `).join('');
}

/**
 * Render date selector
 */
function renderDateSelector() {
  const container = document.getElementById('date-selector');
  if (!container) return;

  container.innerHTML = `
    <div class="form-group">
      <input type="text" id="dateRangePicker" placeholder="Check-in → Check-out" readonly class="form-input" style="cursor: pointer; text-align: center;">
      <input type="hidden" id="checkIn" value="${getTodayStr()}">
      <input type="hidden" id="checkOut" value="${getTomorrowStr()}">
    </div>
  `;

  setTimeout(() => initDatePicker(), 0);
}

/**
 * Render authorizer selector
 */
function renderAuthorizerSelector() {
  const container = document.getElementById('authorizer-selector');
  if (!container) return;

  container.innerHTML = `
    <div class="form-group">
      <label>Authorizer</label>
      <input list="authorizerList" id="authorizer" value="Jian.Xu" placeholder="Select or type name" class="form-input" onclick="this.select()">
      <datalist id="authorizerList">
        <option value="Kevin Loh">
        <option value="IMHUYT">
        <option value="Nan.Hao">
        <option value="Kingz Chock">
        <option value="Jian.Xu">
      </datalist>
    </div>
  `;
}

/**
 * Initialize Litepicker date range picker
 */
function initDatePicker() {
  const pickerEl = document.getElementById('dateRangePicker');
  const checkInEl = document.getElementById('checkIn');
  const checkOutEl = document.getElementById('checkOut');

  if (!pickerEl || !checkInEl || !checkOutEl) {
    console.error('Date picker elements not found');
    return;
  }

  // Set initial display
  updateDateRangeText(checkInEl.value, checkOutEl.value);

  // Wait for Litepicker to be available
  if (typeof window.Litepicker === 'undefined') {
    console.log('Waiting for Litepicker...');
    setTimeout(() => initDatePicker(), 500);
    return;
  }

  try {
    if (dateRangePicker) {
      dateRangePicker.destroy();
    }

    dateRangePicker = new window.Litepicker({
      element: pickerEl,
      singleMode: false,
      startDate: checkInEl.value,
      endDate: checkOutEl.value,
      format: 'DD MMM',
      delimiter: ' → ',
      numberOfMonths: 1,
      numberOfColumns: 1,
      tooltipText: { one: 'night', other: 'nights' },
      tooltipNumber: (totalDays) => totalDays - 1
    });
    
    // Handle selection
    pickerEl.addEventListener('click', () => {
      if (dateRangePicker && !dateRangePicker.isShown) {
        dateRangePicker.show();
      }
    });
    
    // Listen for changes via event delegation
    document.addEventListener('litepicker:selected', (e) => {
      if (e.detail && e.detail.startDate && e.detail.endDate) {
        checkInEl.value = e.detail.startDate.format('YYYY-MM-DD');
        checkOutEl.value = e.detail.endDate.format('YYYY-MM-DD');
        updateDateRangeText(checkInEl.value, checkOutEl.value);
      }
    });
    
    console.log('Date picker initialized');
  } catch (err) {
    console.error('Litepicker error:', err);
    pickerEl.placeholder = 'Select dates';
  }
}

/**
 * Update date range display text
 */
function updateDateRangeText(checkIn, checkOut) {
  const pickerEl = document.getElementById('dateRangePicker');
  if (!pickerEl || !checkIn || !checkOut) return;

  const start = new Date(checkIn + 'T00:00:00');
  const end = new Date(checkOut + 'T00:00:00');

  const formatDateShort = (date) => {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]}`;
  };

  pickerEl.value = `${formatDateShort(start)} → ${formatDateShort(end)}`;
}

/**
 * Set agent value and update UI
 */
export function setAgent(code, name) {
  const agentInput = document.getElementById('agentName');
  if (agentInput) {
    agentInput.value = name;
  }
  
  // Update button active states
  document.querySelectorAll('.agent-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.agent === code);
  });
}

/**
 * Select hotel and update UI
 */
export function selectHotel(hotelCode) {
  state.currentHotel = hotelCode;
  
  // Update button active states
  document.querySelectorAll('.hotel-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.hotel === hotelCode);
  });
  
  // Update all guest room type selectors
  updateAllRoomTypeSelectors(hotelCode);
}

/**
 * Add a new guest form
 */
export function addGuestForm() {
  const container = document.getElementById('guests-container');
  if (!container) return;
  
  const id = guestIdCounter++;
  state.guests.set(id, { id, sharers: [] });
  
  const guestDiv = document.createElement('div');
  guestDiv.className = 'guest-card';
  guestDiv.id = `guest-${id}`;
  guestDiv.innerHTML = `
    <div class="guest-header">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <div class="guest-number">${id}</div>
        <span class="guest-title">Guest ${id}</span>
      </div>
      <button type="button" class="btn btn-danger btn-sm" onclick="window.app.removeGuestForm(${id})">×</button>
    </div>
    <div class="guest-fields" style="margin-top: 0.5rem;">
      <div class="form-row" style="gap: 0.5rem;">
        <input type="text" id="guestOldPID-${id}" class="pid-input short" placeholder="Old PID"
               oninput="window.app.searchPID('guestOldPID-${id}', 'guestNewPID-${id}', 'guestName-${id}', 'pidInfo-${id}')">
        <input type="text" id="guestNewPID-${id}" class="pid-input short" placeholder="New PID"
               oninput="window.app.searchPID('guestOldPID-${id}', 'guestNewPID-${id}', 'guestName-${id}', 'pidInfo-${id}')">
        <input type="text" id="guestName-${id}" placeholder="Guest Name"
               oninput="this.value = this.value.toUpperCase()">
      </div>
      <div id="pidInfo-${id}" class="pid-info-box"></div>
      <input type="hidden" id="roomType-${id}">
      <div class="quick-roomtype-buttons" id="roomTypeButtons-${id}" style="display: flex; gap: 0.25rem; flex-wrap: wrap; margin: 0.5rem 0;">
        <!-- Room type buttons will be generated here -->
      </div>
      <select id="roomTypeSelect-${id}" class="form-input" onchange="window.app.setRoomTypeFromSelect(${id}, this.value)">
        <option value="">Select Room Type</option>
      </select>
    </div>
    <div class="sharer-section" id="sharerSection-${id}" style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--border);">
      <div id="sharerContainer-${id}"></div>
      <button type="button" class="btn btn-outline btn-sm" onclick="window.app.addSharerForm(${id})" style="margin-top: 0.5rem;">
        + Sharer
      </button>
    </div>
  `;
  
  container.appendChild(guestDiv);
  
  // If a hotel is selected, update room types
  if (state.currentHotel) {
    updateRoomTypeSelector(id, state.currentHotel);
  }
  
  return id;
}

/**
 * Remove a guest form
 */
export function removeGuestForm(id) {
  const guestDiv = document.getElementById(`guest-${id}`);
  if (guestDiv) {
    guestDiv.remove();
    state.guests.delete(id);
  }
}

/**
 * Add sharer form to guest
 */
export function addSharerForm(guestId) {
  const guest = state.guests.get(guestId);
  if (!guest) return;
  
  const sharerId = guest.sharers.length + 1;
  guest.sharers.push(sharerId);
  
  const container = document.getElementById(`sharerContainer-${guestId}`);
  if (!container) return;
  
  const sharerDiv = document.createElement('div');
  sharerDiv.className = 'sharer-form';
  sharerDiv.id = `sharer-${guestId}-${sharerId}`;
  sharerDiv.style.cssText = 'background: #f8f9fa; padding: 0.5rem; border-radius: 0.25rem; margin-bottom: 0.375rem;';
  sharerDiv.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.375rem;">
      <span style="font-size: 0.8125rem; font-weight: 600; color: var(--primary);">Sharer #${sharerId}</span>
      <button type="button" class="btn btn-danger btn-sm" onclick="window.app.removeSharerForm(${guestId}, ${sharerId})">×</button>
    </div>
    <div class="form-row" style="gap: 0.375rem;">
      <input type="text" id="sharerOldPID-${guestId}-${sharerId}" class="pid-input short" placeholder="Old PID"
             oninput="window.app.searchPID('sharerOldPID-${guestId}-${sharerId}', 'sharerNewPID-${guestId}-${sharerId}', 'sharerName-${guestId}-${sharerId}', 'sharerPidInfo-${guestId}-${sharerId}')">
      <input type="text" id="sharerNewPID-${guestId}-${sharerId}" class="pid-input short" placeholder="New PID"
             oninput="window.app.searchPID('sharerOldPID-${guestId}-${sharerId}', 'sharerNewPID-${guestId}-${sharerId}', 'sharerName-${guestId}-${sharerId}', 'sharerPidInfo-${guestId}-${sharerId}')">
      <input type="text" id="sharerName-${guestId}-${sharerId}" placeholder="Name">
    </div>
    <div id="sharerPidInfo-${guestId}-${sharerId}" class="pid-info-box"></div>
  `;
  
  container.appendChild(sharerDiv);
}

/**
 * Remove a sharer form
 */
export function removeSharerForm(guestId, sharerId) {
  const sharerDiv = document.getElementById(`sharer-${guestId}-${sharerId}`);
  if (sharerDiv) {
    sharerDiv.remove();
  }
  
  const guest = state.guests.get(guestId);
  if (guest) {
    guest.sharers = guest.sharers.filter(id => id !== sharerId);
  }
}

/**
 * Update room type selector for a guest
 */
function updateRoomTypeSelector(guestId, hotelCode) {
  const buttonsContainer = document.getElementById(`roomTypeButtons-${guestId}`);
  const select = document.getElementById(`roomTypeSelect-${guestId}`);
  if (!buttonsContainer || !select) return;

  const quickTypes = getQuickRoomTypes(hotelCode);
  const hotels = getAllHotels();
  const hotel = hotels[hotelCode];
  
  // Generate quick buttons
  buttonsContainer.innerHTML = quickTypes.map(type => `
    <button type="button" class="quick-btn room-type-btn" onclick="window.app.setRoomType(${guestId}, '${type}')">
      ${type}
    </button>
  `).join('');
  
  // Update dropdown with optgroups
  select.innerHTML = '<option value="">Select Room Type</option>';
  if (hotel && hotel.roomTypes) {
    hotel.roomTypes.forEach(group => {
      const optgroup = document.createElement('optgroup');
      optgroup.label = `${group.promotion} pts`;
      group.types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = `${type} (${group.promotion} pts)`;
        option.dataset.promotion = group.promotion;
        optgroup.appendChild(option);
      });
      select.appendChild(optgroup);
    });
  }
}

/**
 * Update all room type selectors
 */
function updateAllRoomTypeSelectors(hotelCode) {
  state.guests.forEach((guest, id) => {
    updateRoomTypeSelector(id, hotelCode);
  });
}

/**
 * Set room type for a guest
 */
export function setRoomType(guestId, type) {
  const input = document.getElementById(`roomType-${guestId}`);
  if (input) {
    input.value = type;
  }
  
  // Update button active states
  const buttonsContainer = document.getElementById(`roomTypeButtons-${guestId}`);
  if (buttonsContainer) {
    buttonsContainer.querySelectorAll('.quick-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim() === type);
    });
  }
  
  // Update dropdown
  const select = document.getElementById(`roomTypeSelect-${guestId}`);
  if (select) select.value = type;
}

/**
 * Set room type from dropdown
 */
export function setRoomTypeFromSelect(guestId, type) {
  if (!type) return;
  setRoomType(guestId, type);
}

/**
 * PID Search with debouncing
 */
let pidSearchTimeout = null;
export function searchPID(oldPIDInputId, newPIDInputId, nameInputId, infoBoxId) {
  clearTimeout(pidSearchTimeout);
  
  const oldPIDInput = document.getElementById(oldPIDInputId);
  const newPIDInput = document.getElementById(newPIDInputId);
  const nameInput = document.getElementById(nameInputId);
  const infoBox = document.getElementById(infoBoxId);
  
  if (!oldPIDInput || !newPIDInput || !nameInput) return;
  
  const oldPID = oldPIDInput.value.trim();
  const newPID = newPIDInput.value.trim();
  
  // Clear previous states
  oldPIDInput.classList.remove('pid-found', 'pid-not-found', 'pid-searching');
  newPIDInput.classList.remove('pid-found', 'pid-not-found', 'pid-searching');
  if (infoBox) {
    infoBox.style.display = 'none';
    infoBox.className = 'pid-info-box';
  }
  
  // If both empty, clear name
  if (!oldPID && !newPID) {
    nameInput.value = '';
    nameInput.readOnly = false;
    return;
  }
  
  // Check if PID database is loaded
  if (!window.pidDatabaseLoaded) {
    if (infoBox) {
      infoBox.className = 'pid-info-box warning';
      infoBox.innerHTML = '⚠️ Please import PID database first';
      infoBox.style.display = 'block';
    }
    nameInput.readOnly = false;
    return;
  }
  
  // Show searching state
  if (oldPID) oldPIDInput.classList.add('pid-searching');
  if (newPID) newPIDInput.classList.add('pid-searching');
  
  pidSearchTimeout = setTimeout(() => {
    let result = null;
    let searchedBy = '';
    
    // Search by Old PID first
    if (oldPID && window.oldPIDIndex) {
      const uniqueID = window.oldPIDIndex.get(oldPID);
      if (uniqueID && window.pidDatabase) {
        result = window.pidDatabase.get(uniqueID);
        searchedBy = 'old';
      }
    }
    
    // If not found, search by New PID
    if (!result && newPID && window.newPIDIndex) {
      const uniqueID = window.newPIDIndex.get(newPID);
      if (uniqueID && window.pidDatabase) {
        result = window.pidDatabase.get(uniqueID);
        searchedBy = 'new';
      }
    }
    
    oldPIDInput.classList.remove('pid-searching');
    newPIDInput.classList.remove('pid-searching');
    
    if (result) {
      // Found - auto-fill all fields
      oldPIDInput.classList.add('pid-found');
      newPIDInput.classList.add('pid-found');
      
      if (result.oldPID && !oldPID) {
        oldPIDInput.value = result.oldPID;
      }
      if (result.newPID && !newPID) {
        newPIDInput.value = result.newPID;
      }
      
      nameInput.value = result.name.toUpperCase();
      nameInput.readOnly = true;
      
      if (infoBox) {
        infoBox.className = 'pid-info-box success';
        infoBox.innerHTML = `✅ Found by ${searchedBy === 'old' ? 'Old PID' : 'New PID'}: <strong>${result.name}</strong>`;
        infoBox.style.display = 'block';
      }
    } else {
      // Not found
      oldPIDInput.classList.add('pid-not-found');
      newPIDInput.classList.add('pid-not-found');
      nameInput.value = '';
      nameInput.readOnly = false;
      
      if (infoBox) {
        infoBox.className = 'pid-info-box warning';
        infoBox.innerHTML = '⚠️ PID not found in database';
        infoBox.style.display = 'block';
      }
    }
  }, 300);
}

/**
 * Generate room booking email
 */
export function generateRoomEmail() {
  const agent = document.getElementById('agentName')?.value?.trim();
  const hotel = state.currentHotel;
  const authorizer = document.getElementById('authorizer')?.value?.trim() || 'Jian.Xu';
  const checkIn = document.getElementById('checkIn')?.value;
  const checkOut = document.getElementById('checkOut')?.value;
  
  if (!agent) {
    throw new Error('Please enter agent name');
  }
  if (!hotel) {
    throw new Error('Please select a hotel');
  }
  if (!checkIn || !checkOut) {
    throw new Error('Please select check-in and check-out dates');
  }
  
  const checkInFormatted = formatDate(checkIn);
  const checkOutFormatted = formatDate(checkOut);
  
  let guestLines = [];
  let roomLines = [];
  let promotions = [];
  let firstGuestPID = '';
  let firstGuestName = '';
  
  // Process each guest
  state.guests.forEach((guest, id) => {
    const guestDiv = document.getElementById(`guest-${id}`);
    if (!guestDiv) return; // Skip removed guests
    
    const name = document.getElementById(`guestName-${id}`)?.value?.trim();
    const oldPID = document.getElementById(`guestOldPID-${id}`)?.value?.trim() || '';
    const newPID = document.getElementById(`guestNewPID-${id}`)?.value?.trim() || '';
    const roomType = document.getElementById(`roomType-${id}`)?.value;
    
    if (!name || !roomType) return; // Skip incomplete guests
    
    const pidDisplay = resolvePID(oldPID, newPID);
    
    // Track first guest for subject line
    if (!firstGuestName) {
      firstGuestPID = pidDisplay;
      firstGuestName = name;
    }
    
    let guestLine = `${name} - ${pidDisplay}`;
    
    // Add sharers
    guest.sharers.forEach(sharerId => {
      const sharerName = document.getElementById(`sharerName-${id}-${sharerId}`)?.value?.trim();
      if (sharerName) {
        const sharerOldPID = document.getElementById(`sharerOldPID-${id}-${sharerId}`)?.value?.trim() || '';
        const sharerNewPID = document.getElementById(`sharerNewPID-${id}-${sharerId}`)?.value?.trim() || '';
        const finalSharerPID = resolvePID(sharerOldPID, sharerNewPID);
        guestLine += `\n(Sharer: ${sharerName} - ${finalSharerPID})`;
      }
    });
    
    guestLines.push(guestLine);
    roomLines.push(`${name} - ${roomType}`);
    
    // Get promotion for this room type
    const promotion = getPromotion(hotel, roomType);
    if (promotion && !promotions.includes(promotion)) {
      promotions.push(promotion);
    }
  });
  
  if (guestLines.length === 0) {
    throw new Error('Please add at least one complete guest');
  }
  
  const subject = `[${agent}] ${firstGuestPID} ${firstGuestName} ${hotel} Hotel Room Booking on ${checkInFormatted}`;
  const promotionDisplay = promotions.join('/');
  
  return `Subject: ${subject}

Dear team
Please kindly arrange room booking as follows:

Guest name: ${guestLines.join('\n')}
Room type: ${hotel}
${roomLines.join('\n')}

Check in: ${checkInFormatted}
Check out: ${checkOutFormatted}
Rate code: CASBAR
Promotion: ${promotionDisplay}
Deposit: No
Trip authorizer: ${authorizer}`;
}

/**
 * Validate room booking form
 */
export function validateRoomForm() {
  const errors = [];
  
  const agent = document.getElementById('agentName')?.value?.trim();
  if (!agent) errors.push('Agent name is required');
  
  if (!state.currentHotel) errors.push('Please select a hotel');
  
  const checkIn = document.getElementById('checkIn')?.value;
  const checkOut = document.getElementById('checkOut')?.value;
  if (!checkIn || !checkOut) errors.push('Check-in and check-out dates are required');
  
  let hasValidGuest = false;
  state.guests.forEach((guest, id) => {
    const guestDiv = document.getElementById(`guest-${id}`);
    if (!guestDiv) return;
    
    const name = document.getElementById(`guestName-${id}`)?.value?.trim();
    const roomType = document.getElementById(`roomType-${id}`)?.value;
    
    if (name && roomType) {
      hasValidGuest = true;
    }
  });
  
  if (!hasValidGuest) errors.push('Please add at least one complete guest with name and room type');
  
  return errors;
}
