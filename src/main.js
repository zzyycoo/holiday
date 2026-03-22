/**
 * Main application entry
 * Hotel Service Booking System v3.1.0
 */
import './css/variables.css';
import './css/layout.css';
import './css/forms.css';
import './css/components.css';

import { initState, toggleService, isServiceSelected, state, setA171Mode } from './js/state.js';
import { getAgentQuickSelect } from './js/hotels.js';
import { formatDate, formatDateShort, getTodayStr, getTomorrowStr, resolvePID } from './js/utils.js';
import { 
  initRoomBooking, 
  setAgent, 
  selectHotel, 
  addGuestForm, 
  removeGuestForm,
  addSharerForm,
  removeSharerForm,
  setRoomType,
  setRoomTypeFromSelect,
  searchPID,
  generateRoomEmail,
  validateRoomForm
} from './js/room-booking.js';
import { 
  initCarService, 
  addCarForm, 
  removeCarForm, 
  setLocation,
  generateCarEmail 
} from './js/car-booking.js';
import { 
  initGolfBooking, 
  addGolfGuestForm,
  removeGolfGuestForm,
  updateGolfPax,
  syncGolfGuests,
  generateGolfEmail 
} from './js/golf-booking.js';
import { 
  initBusService, 
  toggleBusRoute,
  generateBusEmail 
} from './js/bus-booking.js';

// Inline services data (avoiding JSON import issues)
const SERVICES = {
  room: {
    enabled: true,
    icon: '🏨',
    title: 'Room Booking'
  },
  car: {
    enabled: true,
    icon: '🚗',
    title: 'Car Service'
  },
  golf: {
    enabled: true,
    icon: '⛳',
    title: 'Golf Booking'
  },
  bus: {
    enabled: true,
    icon: '🚌',
    title: 'Bus Service'
  }
};

// getServices function
function getServices() {
  return SERVICES;
}

// App version
const VERSION = '3.2.5';

/**
 * Initialize application
 */
function init() {
  initState();
  renderHeader();
  renderServiceSelector();
  bindEvents();
  
  // Initialize global PID database (will be loaded from file)
  window.pidDatabase = new Map();
  window.oldPIDIndex = new Map();
  window.newPIDIndex = new Map();
  window.pidDatabaseLoaded = false;
  
  console.log(`Booking App v${VERSION} initialized`);
}

/**
 * Render header
 */
function renderHeader() {
  const header = document.querySelector('.app-header');
  if (header) {
    header.innerHTML = `
      <h1>🦾 A KANG TOOLS</h1>
      <div class="version">v${VERSION} | ${getRandomQuote()}</div>
    `;
  }
}

/**
 * Render service selector
 */
function renderServiceSelector() {
  const container = document.getElementById('service-selector');
  if (!container) {
    console.error('Service selector container not found');
    return;
  }

  try {
    const services = getServices();
    console.log('Services loaded:', services);
    
    if (!services || typeof services !== 'object') {
      console.error('Invalid services data:', services);
      container.innerHTML = '<p style="color:red">Error loading services</p>';
      return;
    }
    
    const serviceList = Object.entries(services).filter(([_, config]) => config && config.enabled);
    console.log('Filtered services:', serviceList);

    if (serviceList.length === 0) {
      container.innerHTML = '<p>No services available</p>';
      return;
    }

    container.innerHTML = serviceList.map(([key, config]) => `
      <div class="service-card" data-service="${key}" onclick="window.app.selectService('${key}')">
        <span class="title">${config.title || key}</span>
      </div>
    `).join('');
    
    console.log('Service selector rendered successfully');
  } catch (error) {
    console.error('Error rendering service selector:', error);
    container.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
  }
}

/**
 * Select a service
 */
function selectService(service) {
  const card = document.querySelector(`[data-service="${service}"]`);
  const isSelected = toggleService(service);
  
  if (isSelected) {
    card.classList.add('selected');
    showSection(service);
    initSection(service);
  } else {
    card.classList.remove('selected');
    hideSection(service);
  }
}

/**
 * Show service section
 */
function showSection(service) {
  const section = document.getElementById(`${service}-section`);
  if (section) {
    section.style.display = 'block';
    section.classList.add('fade-in');
    
    // Scroll to section
    setTimeout(() => {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

/**
 * Hide service section
 */
function hideSection(service) {
  const section = document.getElementById(`${service}-section`);
  if (section) {
    section.style.display = 'none';
    section.classList.remove('fade-in');
  }
}

/**
 * Initialize service section
 */
function initSection(service) {
  switch (service) {
    case 'room':
      initRoomBooking();
      break;
    case 'car':
      initCarService();
      break;
    case 'golf':
      initGolfBooking();
      break;
    case 'bus':
      initBusService();
      break;
    case 'a171':
      initA171Mode();
      break;
  }
}

/**
 * Bind global events
 */
function bindEvents() {
  // Generate button
  const generateBtn = document.getElementById('btn-generate');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateAllEmails);
  }

  // Copy button
  const copyBtn = document.getElementById('btn-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', copyToClipboard);
  }

  // Send button
  const sendBtn = document.getElementById('btn-send');
  if (sendBtn) {
    sendBtn.addEventListener('click', sendEmail);
  }
}

/**
 * Generate all emails based on selected services
 */
function generateAllEmails() {
  const preview = document.getElementById('email-preview');
  const errors = [];
  
  // Validate required fields
  if (state.selectedServices.has('room')) {
    const roomErrors = validateRoomForm();
    if (roomErrors.length > 0) {
      errors.push(...roomErrors);
    }
  }
  
  if (errors.length > 0) {
    showToast(errors[0], 'error');
    return;
  }
  
  let emails = [];
  let subject = '';
  
  try {
    if (isServiceSelected('room')) {
      const roomEmail = generateRoomEmail();
      emails.push(roomEmail);
      
      // Extract subject for combined emails
      const subjectMatch = roomEmail.match(/Subject:\s*(.+?)\n/);
      subject = subjectMatch ? subjectMatch[1].trim() : 'Booking Request';
    }
    
    if (isServiceSelected('car')) {
      const carEmail = generateCarEmail();
      emails.push(carEmail);
      
      if (!subject) {
        const subjectMatch = carEmail.match(/Subject:\s*(.+?)\n/);
        subject = subjectMatch ? subjectMatch[1].trim() : 'Car Service Request';
      }
    }
    
    if (isServiceSelected('golf')) {
      const golfEmail = generateGolfEmail();
      emails.push(golfEmail);
      
      if (!subject) {
        const subjectMatch = golfEmail.match(/Subject:\s*(.+?)\n/);
        subject = subjectMatch ? subjectMatch[1].trim() : 'Golf Booking Request';
      }
    }
    
    if (isServiceSelected('bus')) {
      const busEmail = generateBusEmail();
      emails.push(busEmail);
      
      if (!subject) {
        const subjectMatch = busEmail.match(/Subject:\s*(.+?)\n/);
        subject = subjectMatch ? subjectMatch[1].trim() : 'Bus Service Request';
      }
    }
    
    if (isServiceSelected('a171')) {
      const a171Email = generateA171Email();
      emails.push(a171Email);
      
      if (!subject) {
        const subjectMatch = a171Email.match(/Subject:\s*(.+?)\n/);
        subject = subjectMatch ? subjectMatch[1].trim() : 'Patron Registration';
      }
    }
    
    if (emails.length === 0) {
      preview.textContent = 'Please select at least one service.';
      return;
    }
    
    // Generate combined output
    let combinedEmail = '';
    
    if (emails.length === 1) {
      combinedEmail = emails[0];
    } else {
      // Multiple services - combine with separators
      const bodies = emails.map(email => {
        return email.replace(/^Subject:\s*.+?\n+/m, '').trim();
      });
      
      combinedEmail = `Subject: ${subject}\n\n${bodies.join('\n\n---\n\n')}`;
    }
    
    // Store for copy/send
    window.generatedEmail = combinedEmail;
    
    // Display with HTML formatting
    preview.innerHTML = combinedEmail
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\r?\n/g, '<br>\n');
    
    showToast('✓ Email generated!', 'success');
    
    // Scroll to preview
    document.getElementById('email-preview-section')?.scrollIntoView({ behavior: 'smooth' });
    
  } catch (error) {
    showToast(error.message || 'Error generating email', 'error');
    console.error(error);
  }
}

/**
 * Copy to clipboard
 */
async function copyToClipboard() {
  if (!window.generatedEmail) {
    showToast('Please generate email first', 'warning');
    return;
  }
  
  const plainText = window.generatedEmail;
  
  // Try modern clipboard API first
  if (navigator.clipboard && navigator.clipboard.write) {
    try {
      const htmlText = `<!DOCTYPE html><html><body><p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;">${plainText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</p></body></html>`;
      
      const item = new ClipboardItem({
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
        'text/html': new Blob([htmlText], { type: 'text/html' })
      });
      
      await navigator.clipboard.write([item]);
      showToast('✓ Copied! Paste directly into Outlook/Gmail', 'success');
      return;
    } catch (err) {
      // Fall through to fallback
    }
  }
  
  // Fallback to text-only
  try {
    await navigator.clipboard.writeText(plainText);
    showToast('✓ Email copied to clipboard!', 'success');
  } catch (err) {
    // Final fallback - execCommand
    const textarea = document.createElement('textarea');
    textarea.value = plainText;
    textarea.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('✓ Email copied to clipboard!', 'success');
    } catch (e) {
      showToast('Copy failed. Please copy manually.', 'error');
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

/**
 * Send email (mailto) - Fixed to properly extract subject and body
 */
function sendEmail() {
  if (!window.generatedEmail) {
    showToast('Please generate email first', 'warning');
    return;
  }
  
  // Extract subject - handle both "Subject: XXX" and standalone subject
  let subject = 'Booking Request';
  let bodyText = window.generatedEmail;
  
  const subjectMatch = window.generatedEmail.match(/^Subject:\s*(.+)$/m);
  if (subjectMatch) {
    subject = subjectMatch[1].trim();
    // Remove Subject line from body
    bodyText = window.generatedEmail.replace(/^Subject:.+\n+/m, '').trim();
  }
  
  // Also remove any remaining "Subject:" prefix if present
  bodyText = bodyText.replace(/^Subject:\s*/i, '').trim();
  
  const body = encodeURIComponent(bodyText);
  
  // Build recipients and CC (from original booking system)
  let recipients, ccRecipients;
  
  // Check if A171 One Day Trip mode
  const isA171OneDayTrip = state.isA171Mode && document.getElementById('a171-subject-type')?.value === 'onedaytrip';
  
  if (isA171OneDayTrip) {
    recipients = [
      'casinoaudit@thegrandhotram.com',
      'concierge@thegrandhotram.com',
      'Front.Desk@thegrandhotram.com',
      'grandservice@thegrandhotram.com',
      'HIR.receptionist@thegrandhotram.com',
      'IC.receptionist@thegrandhotram.com',
      'Guestrelations.Management@thegrandhotram.com',
      'rooms.coordinator@thegrandhotram.com'
    ].join(',');
    ccRecipients = [
      'rewards@thegrandhotram.com',
      'im.gcsea@thegrandhotram.com',
      'HTR@thegrandhotram.com'
    ].join(',');
  } else {
    recipients = [
      'concierge@thegrandhotram.com',
      'Front.Desk@thegrandhotram.com',
      'grandservice@thegrandhotram.com',
      'HIR.receptionist@thegrandhotram.com',
      'IC.receptionist@thegrandhotram.com',
      'Guestrelations.Management@thegrandhotram.com',
      'rooms.coordinator@thegrandhotram.com'
    ].join(',');
    ccRecipients = [
      'rewards@thegrandhotram.com',
      'im.gcsea@thegrandhotram.com',
      'HTR@thegrandhotram.com'
    ].join(',');
  }
  
  window.location.href = `mailto:${recipients}?cc=${encodeURIComponent(ccRecipients)}&subject=${encodeURIComponent(subject)}&body=${body}`;
  
  showToast('Opening email client...', 'info');
}

/**
 * Save booking data to Google Sheets
 * Uses iframe GET method (avoids CORS issues)
 */
function saveToGoogleSheets() {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyOpykMzPHrhi6pcthRdASWMQdjXO0VQJilRd9R67i1_GRqtBOPBcHDD8fJrHNjY1znCg/exec';
  
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  
  let data = {};
  
  // A171 One Day Trip mode
  if (state.isA171Mode) {
    const guests = [];
    a171Patrons.forEach((_, id) => {
      const name = document.getElementById(`a171-patron-name-${id}`)?.value?.trim();
      const oldPID = document.getElementById(`a171-patron-oldpid-${id}`)?.value?.trim() || '';
      const newPID = document.getElementById(`a171-patron-newpid-${id}`)?.value?.trim() || '';
      if (name) guests.push({ oldPID, newPID, name });
    });
    
    if (guests.length === 0) {
      showToast('⚠️ Please add at least one patron name!', 'warning');
      return;
    }
    
    data = {
      agent: document.getElementById('a171-agent')?.value?.trim() || '',
      checkIn: document.getElementById('a171-date')?.value || '',
      authorizer: '',
      currentTime,
      guests
    };
  } else {
    // Normal mode — room booking required
    if (!state.selectedServices.has('room')) {
      showToast('⚠️ Please select Room Booking to save data!', 'warning');
      return;
    }
    
    const guests = [];
    state.guests.forEach((guest, id) => {
      const guestDiv = document.getElementById(`guest-${id}`);
      if (!guestDiv) return;
      
      const name = document.getElementById(`guestName-${id}`)?.value?.trim();
      const oldPID = document.getElementById(`guestOldPID-${id}`)?.value?.trim() || '';
      const newPID = document.getElementById(`guestNewPID-${id}`)?.value?.trim() || 'New';
      
      if (name) guests.push({ oldPID, newPID, name });
      
      // Add sharers
      guest.sharers.forEach(sharerId => {
        const sharerName = document.getElementById(`sharerName-${id}-${sharerId}`)?.value?.trim();
        const sharerOldPID = document.getElementById(`sharerOldPID-${id}-${sharerId}`)?.value?.trim() || '';
        const sharerNewPID = document.getElementById(`sharerNewPID-${id}-${sharerId}`)?.value?.trim() || 'New';
        if (sharerName) guests.push({ oldPID: sharerOldPID, newPID: sharerNewPID, name: sharerName });
      });
    });
    
    if (guests.length === 0) {
      showToast('⚠️ Please add at least one guest!', 'warning');
      return;
    }
    
    data = {
      agent: document.getElementById('agentName')?.value?.trim() || '',
      checkIn: document.getElementById('checkIn')?.value || '',
      authorizer: document.getElementById('authorizer')?.value?.trim() || 'Jian.Xu',
      currentTime,
      guests
    };
  }
  
  showToast('📊 Saving to Google Sheets...', 'info');
  
  // Use iframe method to avoid CORS
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.name = 'saveFrame';
  document.body.appendChild(iframe);
  iframe.src = `${GOOGLE_SCRIPT_URL}?data=${encodeURIComponent(JSON.stringify(data))}`;
  
  setTimeout(() => {
    try { document.body.removeChild(iframe); } catch(e) {}
    showToast(`✅ Saved ${data.guests.length} guest(s) to Google Sheets!`, 'success');
  }, 2000);
}

/**
 * Extract booking data for Google Sheets (legacy - not used)
 */
function extractBookingData() {
  const data = {
    timestamp: new Date().toISOString(),
    agent: document.getElementById('agentName')?.value?.trim() || '',
    hotel: state.currentHotel || '',
    serviceType: Array.from(state.selectedServices).join(', '),
    checkIn: document.getElementById('checkIn')?.value || '',
    checkOut: document.getElementById('checkOut')?.value || '',
    authorizer: document.getElementById('authorizer')?.value?.trim() || 'Jian.Xu',
    guests: [],
    emailContent: window.generatedEmail || ''
  };
  
  // Extract guest data
  if (state.selectedServices.has('room')) {
    state.guests.forEach((guest, id) => {
      const guestDiv = document.getElementById(`guest-${id}`);
      if (!guestDiv) return;
      
      const name = document.getElementById(`guestName-${id}`)?.value?.trim();
      const oldPID = document.getElementById(`guestOldPID-${id}`)?.value?.trim() || '';
      const newPID = document.getElementById(`guestNewPID-${id}`)?.value?.trim() || '';
      const roomType = document.getElementById(`roomType-${id}`)?.value;
      
      if (name) {
        data.guests.push({
          name,
          oldPID,
          newPID,
          roomType: roomType || '',
          sharers: []
        });
      }
    });
  }
  
  return data;
}

/**
 * Show toast message
 */
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/**
 * Handle PID file import (Excel)
 */
function handlePIDImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  showToast('📖 Reading PID database...', 'info');
  
  // Check if XLSX library is available
  if (typeof XLSX === 'undefined') {
    showToast('XLSX library not loaded. Please include sheetjs.', 'error');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      
      // Clear existing database
      window.pidDatabase.clear();
      window.oldPIDIndex.clear();
      window.newPIDIndex.clear();
      
      let count = 0;
      
      // Process data
      jsonData.forEach(row => {
        const oldPID = String(row['Old PID'] || '').trim();
        const newPID = String(row['New PID'] || '').trim();
        const name = String(row['Player Name'] || '').trim();
        
        if (name && (oldPID || newPID)) {
          const uniqueID = newPID || oldPID;
          
          window.pidDatabase.set(uniqueID, {
            oldPID: oldPID || null,
            newPID: newPID || null,
            name: name
          });
          
          if (oldPID) window.oldPIDIndex.set(oldPID, uniqueID);
          if (newPID) window.newPIDIndex.set(newPID, uniqueID);
          
          count++;
        }
      });
      
      window.pidDatabaseLoaded = true;
      
      // Update status display
      const statusEl = document.getElementById('pid-status');
      if (statusEl) {
        statusEl.textContent = `${count.toLocaleString()} records loaded ✓`;
        statusEl.style.color = 'var(--success)';
      }
      
      showToast(`✓ ${count.toLocaleString()} PID records loaded`, 'success');
      
    } catch (error) {
      console.error('Error reading PID file:', error);
      showToast('❌ Error reading Excel file', 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}

// Classic movie quotes
const MOVIE_QUOTES = [
  "Life is like a box of chocolates. - Forrest Gump",
  "May the Force be with you. - Star Wars",
  "There's no place like home. - The Wizard of Oz",
  "I'll be back. - The Terminator",
  "You're gonna need a bigger boat. - Jaws",
  "Here's looking at you, kid. - Casablanca",
  "Go ahead, make my day. - Sudden Impact",
  "I love the smell of napalm in the morning. - Apocalypse Now",
  "Show me the money! - Jerry Maguire",
  "You can't handle the truth! - A Few Good Men",
  "To infinity and beyond! - Toy Story",
  "Houston, we have a problem. - Apollo 13",
  "Keep your friends close, but your enemies closer. - The Godfather II",
  "The first rule of Fight Club is: You do not talk about Fight Club. - Fight Club",
  "Why so serious? - The Dark Knight",
  "I am your father. - The Empire Strikes Back",
  "Just keep swimming. - Finding Nemo",
  "With great power comes great responsibility. - Spider-Man",
  "Hasta la vista, baby. - Terminator 2",
  "I see dead people. - The Sixth Sense",
  "Carpe diem. Seize the day, boys. - Dead Poets Society",
  "Nobody's perfect. - Some Like It Hot",
  "E.T. phone home. - E.T.",
  "Bond. James Bond. - Dr. No",
  "I'll have what she's having. - When Harry Met Sally",
  "Yo, Adrian! - Rocky",
  "They may take our lives, but they'll never take our freedom! - Braveheart",
  "There's no crying in baseball! - A League of Their Own",
  "You talking to me? - Taxi Driver",
  "Roads? Where we're going we don't need roads. - Back to the Future"
];

function getRandomQuote() {
  return MOVIE_QUOTES[Math.floor(Math.random() * MOVIE_QUOTES.length)];
}
let a171PatronCount = 0;
let a171Patrons = new Map();

function initA171Mode() {
  setA171Mode(true);
  a171PatronCount = 0;
  a171Patrons.clear();
  
  // Set today's date as default
  const dateEl = document.getElementById('a171-date');
  if (dateEl) dateEl.value = getTodayStr();
  
  // Add first patron
  addA171Patron();
}

function addA171Patron() {
  const id = ++a171PatronCount;
  a171Patrons.set(id, { id });
  
  const container = document.getElementById('a171-patrons-container');
  if (!container) return;
  
  const patronDiv = document.createElement('div');
  patronDiv.id = `a171-patron-${id}`;
  patronDiv.className = 'guest-form';
  patronDiv.style.cssText = 'margin-bottom: 1rem; padding: 1rem; background: var(--surface); border-radius: var(--radius-sm); border: 1px solid var(--border);';
  
  patronDiv.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <span style="font-weight: 600;">Patron #${id}</span>
      ${id > 1 ? `<button type="button" class="btn btn-danger btn-sm" onclick="window.app.removeA171Patron(${id})">Remove</button>` : ''}
    </div>
    <div class="form-row">
      <div class="form-group">
        <input type="text" id="a171-patron-name-${id}" placeholder="Name" class="form-input">
      </div>
      <div class="form-group">
        <input type="text" id="a171-patron-oldpid-${id}" placeholder="Old PID" class="form-input short">
      </div>
      <div class="form-group">
        <input type="text" id="a171-patron-newpid-${id}" placeholder="New PID" class="form-input short">
      </div>
    </div>
  `;
  
  container.appendChild(patronDiv);
}

function removeA171Patron(id) {
  a171Patrons.delete(id);
  const el = document.getElementById(`a171-patron-${id}`);
  if (el) el.remove();
}

function generateA171Email() {
  const agent = document.getElementById('a171-agent')?.value?.trim() || 'A171';
  const subjectType = document.getElementById('a171-subject-type')?.value || 'patron';
  const date = document.getElementById('a171-date')?.value;
  const authorizer = document.getElementById('a171-authorizer')?.value?.trim() || 'Jian.Xu';
  
  if (!date) throw new Error('Please select date');
  
  const patrons = [];
  a171Patrons.forEach((_, id) => {
    const name = document.getElementById(`a171-patron-name-${id}`)?.value?.trim();
    if (name) {
      const oldPID = document.getElementById(`a171-patron-oldpid-${id}`)?.value?.trim() || '';
      const newPID = document.getElementById(`a171-patron-newpid-${id}`)?.value?.trim() || '';
      const pidStr = resolvePID(oldPID, newPID);
      patrons.push({ name, pid: pidStr, oldPID, newPID });
    }
  });
  
  if (patrons.length === 0) throw new Error('Please add at least one patron');
  
  const firstPatron = patrons[0];
  const dateStr = formatDateShort(date);
  
  let subject, body;
  
  if (subjectType === 'onedaytrip') {
    subject = `[${agent}] ${firstPatron.pid} ${firstPatron.name} One Day Trip ${dateStr}`;
    body = patrons.map(p => `Please note that the guest one day trip: ${p.name} - ${p.pid}`).join('\n');
  } else {
    subject = `[${agent}] ${firstPatron.pid} ${firstPatron.name} Patron Registration ${dateStr}`;
    body = `Please kindly help to arrange patron registration as follows:\n` + 
           patrons.map(p => `- ${p.name} - ${p.pid}`).join('\n');
  }
  
  return `Subject: ${subject}\n\n${body}\nAuthorizer: ${authorizer}`;
}

// Export to window for inline onclick handlers and global access
window.app = {
  // Service selection
  selectService,
  
  // Room booking
  setAgent,
  selectHotel,
  addGuestForm,
  removeGuestForm,
  addSharerForm,
  removeSharerForm,
  setRoomType,
  setRoomTypeFromSelect,
  searchPID,
  
  // Car service
  addCarForm,
  removeCarForm,
  setLocation,
  
  // Golf booking
  addGolfGuestForm,
  removeGolfGuestForm,
  updateGolfPax,
  syncGolfGuests,
  
  // Bus service
  toggleBusRoute,
  
  // A171 One Day Trip
  addA171Patron,
  removeA171Patron,
  
  // Global actions
  generateAllEmails,
  copyToClipboard,
  sendEmail,
  showToast,
  handlePIDImport,
  saveToGoogleSheets,
  
  // Utilities
  formatDate,
  formatDateShort,
  getTodayStr,
  getTomorrowStr,
  resolvePID
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
