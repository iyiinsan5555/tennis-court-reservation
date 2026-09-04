/* =========================================================================
   Court Schedule — site settings
   Edit these to match your setup.
   ========================================================================= */
const COURTS = ["Court 1"];   // add more names for multiple courts, e.g. ["Court 1", "Court 2"]
const OPEN_HOUR = 8;          // schedule starts at 08:00
const CLOSE_HOUR = 22;        // last slot starts before this hour
const SLOT_MINUTES = 60;      // length of each bookable slot
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// This site always talks to this repo/file — no connection screen needed.
const DEFAULT_CONFIG = {
  owner: 'iyiinsan5555',
  repo: 'tennis-court-reservation',
  branch: 'main',
  path: 'data/reservations.json',
};

/* =========================================================================
   Storage keys (browser-side only — never committed to the repo)
   ========================================================================= */
const LS_TOKEN = 'tcr_token_v1';
const SS_TOKEN = 'tcr_token_v1';

/* =========================================================================
   State
   ========================================================================= */
const config = DEFAULT_CONFIG;
let token = null;              // GitHub personal access token, browser-side only
let reservations = [];         // array of reservation objects
let fileSha = null;            // current sha of the data file, needed to write
let selectedCourt = COURTS[0];
let selectedWeekStart = null;  // Monday of the visible week, "YYYY-MM-DD"
let pendingSlot = null;        // { court, date, time } awaiting booking submit
let pendingReservationId = null; // reservation awaiting cancellation

/* =========================================================================
   Date helpers — all pure calendar math (no real-world timezone involved),
   so "today" always means the visitor's local calendar day, and adding/
   subtracting days never drifts because of UTC conversion.
   ========================================================================= */
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDays(dateStr, delta) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + delta);
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`;
}

// Monday of the week containing dateStr
function getWeekStart(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const dow = dt.getUTCDay(); // 0=Sun..6=Sat
  const diffToMonday = (dow === 0) ? -6 : 1 - dow;
  dt.setUTCDate(dt.getUTCDate() + diffToMonday);
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`;
}

function formatWeekRange(weekStart) {
  const start = weekStart;
  const end = addDays(weekStart, 6);
  const startD = new Date(start + 'T00:00:00Z');
  const endD = new Date(end + 'T00:00:00Z');
  const startStr = startD.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const endStr = endD.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  return `${startStr} – ${endStr}`;
}

function formatTime(hour, minute) {
  return String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0');
}

function buildSlots() {
  const slots = [];
  let h = OPEN_HOUR, m = 0;
  while (h < CLOSE_HOUR) {
    slots.push(formatTime(h, m));
    m += SLOT_MINUTES;
    while (m >= 60) { m -= 60; h += 1; }
  }
  return slots;
}

// UTF-8 safe base64 encode/decode (GitHub Contents API stores files as base64)
function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach(b => { binary += String.fromCharCode(b); });
  return btoa(binary);
}
function base64ToUtf8(b64) {
  const binary = atob(b64.replace(/\n/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function showToast(message, isError) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.toggle('err', !!isError);
  el.classList.remove('hidden');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.add('hidden'), 3500);
}

function setStatus(message, kind) {
  const el = document.getElementById('connectionStatus');
  el.textContent = message;
  el.classList.remove('ok', 'err');
  if (kind) el.classList.add(kind);
}

/* =========================================================================
   Token persistence (local to this browser only)
   ========================================================================= */
function loadToken() {
  return sessionStorage.getItem(SS_TOKEN) || localStorage.getItem(LS_TOKEN) || null;
}
function saveToken(tok, remember) {
  sessionStorage.setItem(SS_TOKEN, tok);
  if (remember) {
    localStorage.setItem(LS_TOKEN, tok);
  } else {
    localStorage.removeItem(LS_TOKEN);
  }
}
function forgetToken() {
  sessionStorage.removeItem(SS_TOKEN);
  localStorage.removeItem(LS_TOKEN);
  token = null;
}

/* =========================================================================
   GitHub Contents API
   ========================================================================= */
function contentsUrl() {
  return `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}?ref=${encodeURIComponent(config.branch)}`;
}

function apiHeaders() {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function fetchReservations() {
  setStatus('Loading schedule…');
  const res = await fetch(contentsUrl(), { headers: apiHeaders() });

  if (res.status === 404) {
    reservations = [];
    fileSha = null;
    setStatus(
      token
        ? 'Data file not found yet — save a reservation to create it.'
        : 'Data file not found in the repo yet.',
      'err'
    );
    return;
  }
  if (res.status === 401 || res.status === 403) {
    setStatus('Token rejected or missing repo access. Check the token in Admin.', 'err');
    throw new Error('auth');
  }
  if (!res.ok) {
    setStatus(`Could not load schedule (HTTP ${res.status}).`, 'err');
    throw new Error('load-failed');
  }

  const data = await res.json();
  fileSha = data.sha;
  try {
    const parsed = JSON.parse(base64ToUtf8(data.content));
    reservations = Array.isArray(parsed.reservations) ? parsed.reservations : [];
  } catch (e) {
    reservations = [];
    setStatus('Data file exists but is not valid JSON — check it in the repo.', 'err');
    return;
  }
  setStatus(
    token ? 'Connected — you can add and cancel reservations.' : 'Connected (read-only — add a token in Admin to edit).',
    'ok'
  );
}

async function commitReservations(commitMessage) {
  if (!token) {
    showToast('Add a personal access token in Admin to save changes.', true);
    return false;
  }
  const body = {
    message: commitMessage,
    content: utf8ToBase64(JSON.stringify({ reservations }, null, 2)),
    branch: config.branch,
  };
  if (fileSha) body.sha = fileSha;

  const res = await fetch(contentsUrl().split('?')[0], {
    method: 'PUT',
    headers: { ...apiHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.status === 409) {
    showToast('The schedule changed elsewhere — reloading latest data, please retry.', true);
    await fetchReservations();
    renderAll();
    return false;
  }
  if (res.status === 401 || res.status === 403) {
    showToast('Token was rejected — check it has write access to this repo.', true);
    return false;
  }
  if (!res.ok) {
    showToast(`Save failed (HTTP ${res.status}).`, true);
    return false;
  }

  const data = await res.json();
  fileSha = data.content.sha;
  return true;
}

/* =========================================================================
   Rendering
   ========================================================================= */
function renderCourtTabs() {
  const el = document.getElementById('courtTabs');
  el.innerHTML = '';
  if (COURTS.length <= 1) return; // no tabs needed for a single court
  COURTS.forEach(court => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'court-tab' + (court === selectedCourt ? ' active' : '');
    btn.textContent = court;
    btn.addEventListener('click', () => { selectedCourt = court; renderAll(); });
    el.appendChild(btn);
  });
}

function findReservation(court, date, time) {
  return reservations.find(r => r.court === court && r.date === date && r.startTime === time);
}

function renderWeekGrid() {
  const container = document.getElementById('scheduleGrid');
  container.innerHTML = '';
  const today = todayStr();
  const slots = buildSlots();

  const dayDates = [];
  for (let i = 0; i < 7; i++) dayDates.push(addDays(selectedWeekStart, i));

  const table = document.createElement('table');
  table.className = 'week-table';

  // Header row: corner cell + one cell per day
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  const corner = document.createElement('th');
  corner.className = 'corner';
  headRow.appendChild(corner);

  dayDates.forEach((dateStr, i) => {
    const th = document.createElement('th');
    th.className = 'day-head' + (dateStr === today ? ' today' : '');
    const [, m, d] = dateStr.split('-');
    th.innerHTML = `<span class="wd">${WEEKDAY_LABELS[i]}</span><span class="dm">${d}/${m}</span>`;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Body: one row per time slot, one cell per day
  const tbody = document.createElement('tbody');
  slots.forEach(time => {
    const tr = document.createElement('tr');
    const timeHead = document.createElement('th');
    timeHead.className = 'time-head';
    timeHead.textContent = time;
    tr.appendChild(timeHead);

    dayDates.forEach(dateStr => {
      const existing = findReservation(selectedCourt, dateStr, time);
      const isPast = dateStr < today;
      const td = document.createElement('td');
      td.className = 'cell ' + (existing ? 'booked' : 'available') + (isPast ? ' disabled' : '');
      if (existing) {
        td.textContent = existing.customerName;
        td.title = existing.customerName + (existing.phone ? ' · ' + existing.phone : '');
      }
      if (!isPast) {
        td.addEventListener('click', () => {
          if (existing) openDetail(existing);
          else openBookingForm(selectedCourt, dateStr, time);
        });
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

function renderAll() {
  document.getElementById('weekRangeLabel').textContent = formatWeekRange(selectedWeekStart);
  document.getElementById('jumpDate').value = selectedWeekStart;
  renderCourtTabs();
  renderWeekGrid();
}

/* =========================================================================
   Booking form
   ========================================================================= */
function openBookingForm(court, date, time) {
  pendingSlot = { court, date, time };
  document.getElementById('bookingTitle').textContent = `${court} · ${date} · ${time}`;
  document.getElementById('bkName').value = '';
  document.getElementById('bkPhone').value = '';
  document.getElementById('bkNotes').value = '';
  document.getElementById('bookingOverlay').classList.remove('hidden');
  document.getElementById('bkName').focus();
}
function closeBookingForm() {
  pendingSlot = null;
  document.getElementById('bookingOverlay').classList.add('hidden');
}

async function submitBooking(e) {
  e.preventDefault();
  if (!pendingSlot) return;
  const name = document.getElementById('bkName').value.trim();
  if (!name) return;

  const reservation = {
    id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    court: pendingSlot.court,
    date: pendingSlot.date,
    startTime: pendingSlot.time,
    customerName: name,
    phone: document.getElementById('bkPhone').value.trim(),
    notes: document.getElementById('bkNotes').value.trim(),
  };

  reservations.push(reservation);
  const ok = await commitReservations(`Book ${reservation.court} ${reservation.date} ${reservation.startTime} (${name})`);
  if (ok) {
    showToast('Reservation saved.');
    closeBookingForm();
    renderAll();
  } else {
    reservations = reservations.filter(r => r.id !== reservation.id); // roll back
  }
}

/* =========================================================================
   Reservation detail / cancel
   ========================================================================= */
function openDetail(reservation) {
  pendingReservationId = reservation.id;
  const dl = document.getElementById('detailFields');
  dl.innerHTML = '';
  const rows = [
    ['Court', reservation.court],
    ['Date', reservation.date],
    ['Time', reservation.startTime],
    ['Name', reservation.customerName],
    ['Phone', reservation.phone || '—'],
    ['Notes', reservation.notes || '—'],
  ];
  rows.forEach(([label, value]) => {
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value;
    dl.append(dt, dd);
  });
  document.getElementById('detailCancel').classList.toggle('hidden', !token);
  document.getElementById('detailOverlay').classList.remove('hidden');
}
function closeDetail() {
  pendingReservationId = null;
  document.getElementById('detailOverlay').classList.add('hidden');
}

async function cancelReservation() {
  if (!pendingReservationId) return;
  const id = pendingReservationId;
  const removed = reservations.find(r => r.id === id);
  const backup = reservations;
  reservations = reservations.filter(r => r.id !== id);

  const ok = await commitReservations(
    `Cancel ${removed.court} ${removed.date} ${removed.startTime} (${removed.customerName})`
  );
  if (ok) {
    showToast('Reservation cancelled.');
    closeDetail();
    renderAll();
  } else {
    reservations = backup; // roll back
  }
}

/* =========================================================================
   Admin panel wiring
   ========================================================================= */
function wireSettingsPanel() {
  document.getElementById('settingsToggle').addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.toggle('hidden');
  });

  document.getElementById('toggleTokenVisibility').addEventListener('click', () => {
    const input = document.getElementById('cfgToken');
    const btn = document.getElementById('toggleTokenVisibility');
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    btn.textContent = showing ? 'Show' : 'Hide';
  });

  document.getElementById('saveTokenBtn').addEventListener('click', async () => {
    const val = document.getElementById('cfgToken').value.trim();
    if (!val) return;
    const remember = document.getElementById('cfgRemember').checked;
    token = val;
    saveToken(val, remember);
    document.getElementById('cfgToken').value = '';
    document.getElementById('toggleTokenVisibility').textContent = 'Show';
    document.getElementById('cfgToken').type = 'password';
    await fetchReservations();
    renderAll();
  });

  document.getElementById('clearTokenBtn').addEventListener('click', () => {
    forgetToken();
    setStatus('Token forgotten on this device.');
  });
}

function wireScheduleControls() {
  document.getElementById('prevWeek').addEventListener('click', () => {
    selectedWeekStart = addDays(selectedWeekStart, -7); renderAll();
  });
  document.getElementById('nextWeek').addEventListener('click', () => {
    selectedWeekStart = addDays(selectedWeekStart, 7); renderAll();
  });
  document.getElementById('thisWeekBtn').addEventListener('click', () => {
    selectedWeekStart = getWeekStart(todayStr()); renderAll();
  });
  document.getElementById('jumpDate').addEventListener('change', (e) => {
    if (!e.target.value) return;
    selectedWeekStart = getWeekStart(e.target.value); renderAll();
  });

  document.getElementById('bookingForm').addEventListener('submit', submitBooking);
  document.getElementById('bookingCancel').addEventListener('click', closeBookingForm);

  document.getElementById('detailClose').addEventListener('click', closeDetail);
  document.getElementById('detailCancel').addEventListener('click', cancelReservation);
}

/* =========================================================================
   Init
   ========================================================================= */
async function init() {
  token = loadToken();
  selectedWeekStart = getWeekStart(todayStr());

  wireSettingsPanel();
  wireScheduleControls();

  try {
    await fetchReservations();
  } catch (e) {
    // status already set by fetchReservations
  }
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);
