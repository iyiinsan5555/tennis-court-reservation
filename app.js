/* =========================================================================
   Court Schedule — site settings
   ========================================================================= */
const COURTS = ["Ana Kort"];
const OPEN_HOUR = 14;
const CLOSE_HOUR = 24;
const SLOT_MINUTES = 60;

const DEFAULT_CONFIG = {
  owner: 'iyiinsan5555',
  repo: 'tennis-court-reservation',
  branch: 'main',
  path: 'data/reservations.json',
};

const LS_TOKEN = 'tcr_token_v1';
const SS_TOKEN = 'tcr_token_v1';
const LS_LANG = 'tcr_lang_v1';

/* =========================================================================
   Internationalization (i18n)
   ========================================================================= */
const I18N = {
  tr: {
    pageTitle: 'Saha Programı',
    headerTitle: 'Saha Programı',
    admin: 'Yönetici',
    langBtn: 'EN',
    adminTitle: 'Yönetici Erişimi',
    adminHint: 'Rezervasyon eklemek veya iptal etmek için bir GitHub kişisel erişim anahtarı (PAT) gereklidir (programı görüntülemek herkes için çalışır). Yalnızca <code>tennis-court-reservation</code> deposu için <strong>Contents: Read and write</strong> iznine sahip <strong>fine-grained token</strong> kullanın. Bunu bir şifre gibi koruyun.',
    lblToken: 'Kişisel erişim anahtarı',
    show: 'Göster',
    hide: 'Gizle',
    rememberToken: 'Bu anahtarı bu cihazda hatırla (ortak/açık bilgisayarlarda işaretlemeyin)',
    saveToken: 'Anahtarı kaydet',
    clearToken: 'Anahtarı unut',
    statusNotConnected: 'Bağlantı yok.',
    prevWeek: 'Önceki hafta',
    nextWeek: 'Sonraki hafta',
    thisWeek: 'Bu hafta',
    jumpTitle: 'Tarihe git',
    newReservation: 'Yeni rezervasyon',
    name: 'İsim',
    phone: 'Telefon',
    optional: '(isteğe bağlı)',
    notes: 'Notlar',
    cancel: 'İptal',
    saveReservation: 'Rezervasyonu kaydet',
    reservationDetail: 'Rezervasyon',
    close: 'Kapat',
    cancelReservation: 'Rezervasyonu iptal et',
    courtLabel: 'Saha',
    dateLabel: 'Tarih',
    timeLabel: 'Saat',
    nameLabel: 'İsim',
    phoneLabel: 'Telefon',
    notesLabel: 'Notlar',
    available: 'Boş',
    weekdays: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    locale: 'tr-TR',
    loadingSchedule: 'Program yükleniyor…',
    fileNotFoundToken: 'Veri dosyası henüz bulunamadı — oluşturmak için bir rezervasyon kaydedin.',
    fileNotFoundNoToken: 'Veri dosyası depoda henüz bulunamadı.',
    authError: 'Erişim anahtarı reddedildi veya depo erişimi eksik. Yönetici panelindeki anahtarı kontrol edin.',
    loadError: (status) => `Program yüklenemedi (HTTP ${status}).`,
    jsonError: 'Veri dosyası mevcut ancak geçerli bir JSON değil — depoda kontrol edin.',
    connectedWrite: 'Bağlandı — rezervasyon ekleyebilir ve iptal edebilirsiniz.',
    connectedRead: 'Bağlandı (salt okunur — düzenlemek için Yönetici panelinden anahtar ekleyin).',
    addTokenToast: 'Değişiklikleri kaydetmek için Yönetici panelinden kişisel erişim anahtarı ekleyin.',
    conflictToast: 'Program başka bir yerde değiştirildi — en son veriler yeniden yükleniyor, lütfen tekrar deneyin.',
    tokenRejectedToast: 'Erişim anahtarı reddedildi — bu depoya yazma erişimi olduğunu kontrol edin.',
    saveFailedToast: (status) => `Kaydetme başarısız oldu (HTTP ${status}).`,
    savedToast: 'Rezervasyon kaydedildi.',
    cancelledToast: 'Rezervasyon iptal edildi.',
    forgottenToast: 'Erişim anahtarı bu cihazda unutuldu.',
    weeklyCourseLabel: 'Haftalık kurs (her hafta tekrarlanır)',
    courseNameLabel: 'Kurs adı',
    descriptionLabel: 'Açıklama',
    dayLabel: 'Gün',
    sinceLabel: 'Tekrar başlangıcı',
    courseDetail: 'Haftalık kurs',
    deleteCourse: 'Kursu sil',
    courseSavedToast: 'Haftalık kurs kaydedildi.',
    courseDeletedToast: 'Kurs silindi.',
    slotTakenToast: 'Bu saat az önce dolduruldu — lütfen başka bir saat seçin.',
    savingEllipsis: 'Kaydediliyor…'
  },
  en: {
    pageTitle: 'Court Schedule',
    headerTitle: 'Court Schedule',
    admin: 'Admin',
    langBtn: 'TR',
    adminTitle: 'Admin access',
    adminHint: 'A GitHub personal access token is required to add or cancel reservations (viewing the schedule works for everyone without one). Use a <strong>fine-grained token</strong> scoped only to the <code>tennis-court-reservation</code> repo with <strong>Contents: Read and write</strong> permission. Treat it like a password.',
    lblToken: 'Personal access token',
    show: 'Show',
    hide: 'Hide',
    rememberToken: 'Remember this token on this device (skip on shared/public computers)',
    saveToken: 'Save token',
    clearToken: 'Forget token',
    statusNotConnected: 'Not connected.',
    prevWeek: 'Previous week',
    nextWeek: 'Next week',
    thisWeek: 'This week',
    jumpTitle: 'Jump to a date',
    newReservation: 'New reservation',
    name: 'Name',
    phone: 'Phone',
    optional: '(optional)',
    notes: 'Notes',
    cancel: 'Cancel',
    saveReservation: 'Save reservation',
    reservationDetail: 'Reservation',
    close: 'Close',
    cancelReservation: 'Cancel reservation',
    courtLabel: 'Court',
    dateLabel: 'Date',
    timeLabel: 'Time',
    nameLabel: 'Name',
    phoneLabel: 'Phone',
    notesLabel: 'Notes',
    available: 'Available',
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    locale: 'en-US',
    loadingSchedule: 'Loading schedule…',
    fileNotFoundToken: 'Data file not found yet — save a reservation to create it.',
    fileNotFoundNoToken: 'Data file not found in the repo yet.',
    authError: 'Token rejected or missing repo access. Check the token in Admin.',
    loadError: (status) => `Could not load schedule (HTTP ${status}).`,
    jsonError: 'Data file exists but is not valid JSON — check it in the repo.',
    connectedWrite: 'Connected — you can add and cancel reservations.',
    connectedRead: 'Connected (read-only — add a token in Admin to edit).',
    addTokenToast: 'Add a personal access token in Admin to save changes.',
    conflictToast: 'The schedule changed elsewhere — reloading latest data, please retry.',
    tokenRejectedToast: 'Token was rejected — check it has write access to this repo.',
    saveFailedToast: (status) => `Save failed (HTTP ${status}).`,
    savedToast: 'Reservation saved.',
    cancelledToast: 'Reservation cancelled.',
    forgottenToast: 'Token forgotten on this device.',
    weeklyCourseLabel: 'Weekly course (repeats every week)',
    courseNameLabel: 'Course name',
    descriptionLabel: 'Description',
    dayLabel: 'Day',
    sinceLabel: 'Repeats since',
    courseDetail: 'Weekly course',
    deleteCourse: 'Delete course',
    courseSavedToast: 'Weekly course saved.',
    courseDeletedToast: 'Course deleted.',
    slotTakenToast: 'That slot was just taken — please pick another.',
    savingEllipsis: 'Saving…'
  }
};

/* =========================================================================
   State
   ========================================================================= */
const config = DEFAULT_CONFIG;
let currentLang = localStorage.getItem(LS_LANG) || 'tr';
let token = null;
let reservations = [];
let courses = [];              // weekly-recurring course definitions (see findCourse)
let fileSha = null;
let selectedCourt = COURTS[0];
let selectedWeekStart = null;
let selectedDayIndex = 0;
let pendingSlot = null;
let pendingReservationId = null;
let pendingOccupantKind = null; // 'booking' or 'course' — which kind the open detail panel refers to
let lastStatusKind = null;
let lastStatusKey = null;

/* =========================================================================
   Date helpers
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

function getWeekStart(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const dow = dt.getUTCDay();
  const diffToMonday = (dow === 0) ? -6 : 1 - dow;
  dt.setUTCDate(dt.getUTCDate() + diffToMonday);
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`;
}

function weekDates(weekStart) {
  const out = [];
  for (let i = 0; i < 7; i++) out.push(addDays(weekStart, i));
  return out;
}

// Monday-first weekday index (0=Mon..6=Sun) for a date string. Stored on
// courses as a plain number — never a translated day name — so a course
// created in one language still matches correctly after switching languages.
function weekdayIndex(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0=Sun..6=Sat
  return dow === 0 ? 6 : dow - 1;
}

function formatDateLong(dateStr) {
  const t = I18N[currentLang];
  const d = new Date(dateStr + 'T00:00:00Z');
  return d.toLocaleDateString(t.locale, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

function formatWeekRange(weekStart) {
  const t = I18N[currentLang];
  const start = weekStart;
  const end = addDays(weekStart, 6);
  const startD = new Date(start + 'T00:00:00Z');
  const endD = new Date(end + 'T00:00:00Z');
  const startStr = startD.toLocaleDateString(t.locale, { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const endStr = endD.toLocaleDateString(t.locale, { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
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

function resetDayIndexForWeek() {
  const idx = weekDates(selectedWeekStart).indexOf(todayStr());
  selectedDayIndex = idx >= 0 ? idx : 0;
}

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

function showToast(messageKeyOrText, isError, param) {
  const t = I18N[currentLang];
  let message = t[messageKeyOrText];
  if (typeof message === 'function') message = message(param);
  if (!message) message = messageKeyOrText;

  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.toggle('err', !!isError);
  el.classList.remove('hidden');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.add('hidden'), 3500);
}

function setStatus(statusKey, kind, param) {
  lastStatusKey = statusKey;
  lastStatusKind = kind;
  const t = I18N[currentLang];
  let message = t[statusKey];
  if (typeof message === 'function') message = message(param);
  if (!message) message = statusKey;

  const el = document.getElementById('connectionStatus');
  el.textContent = message;
  el.classList.remove('ok', 'err');
  if (kind) el.classList.add(kind);
}

/* =========================================================================
   Token persistence
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
  setStatus('loadingSchedule');
  const res = await fetch(contentsUrl(), { headers: apiHeaders() });

  if (res.status === 404) {
    reservations = [];
    fileSha = null;
    setStatus(token ? 'fileNotFoundToken' : 'fileNotFoundNoToken', 'err');
    return;
  }
  if (res.status === 401 || res.status === 403) {
    setStatus('authError', 'err');
    throw new Error('auth');
  }
  if (!res.ok) {
    setStatus('loadError', 'err', res.status);
    throw new Error('load-failed');
  }

  const data = await res.json();
  fileSha = data.sha;
  try {
    const parsed = JSON.parse(base64ToUtf8(data.content));
    reservations = Array.isArray(parsed.reservations) ? parsed.reservations : [];
    courses = Array.isArray(parsed.courses) ? parsed.courses : [];
  } catch (e) {
    reservations = [];
    courses = [];
    setStatus('jsonError', 'err');
    return;
  }
  setStatus(token ? 'connectedWrite' : 'connectedRead', 'ok');
}

// Performs one raw save attempt against whatever is currently in `reservations`
// / `courses` + `fileSha`. Returns 'ok', 'conflict' (sha stale — caller should
// refresh and retry), or 'error' (already shown a toast, don't retry).
async function attemptCommit(commitMessage) {
  if (!token) {
    showToast('addTokenToast', true);
    return 'error';
  }
  const body = {
    message: commitMessage,
    content: utf8ToBase64(JSON.stringify({ reservations, courses }, null, 2)),
    branch: config.branch,
  };
  if (fileSha) body.sha = fileSha;

  const res = await fetch(contentsUrl().split('?')[0], {
    method: 'PUT',
    headers: { ...apiHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.status === 409) return 'conflict';
  if (res.status === 401 || res.status === 403) {
    showToast('tokenRejectedToast', true);
    return 'error';
  }
  if (!res.ok) {
    showToast('saveFailedToast', true, res.status);
    return 'error';
  }

  const data = await res.json();
  fileSha = data.content.sha;
  return 'ok';
}

// Every save goes through here. A tab that's been sitting open (or unused)
// for a while holds a stale copy of the file, so instead of writing whatever
// it has in memory, this always fetches the latest data first and re-applies
// the change on top of it — then only retries the fetch+apply+save cycle if
// a genuine race loses to another write in the meantime. This is what lets a
// long-idle tab (e.g. a second tab left open) still save without erroring.
//
// `mutate()` applies the change to the freshly-fetched reservations/courses
// and returns true, or returns false if the change no longer makes sense
// against the fresh data (e.g. the slot was booked by someone else in the
// meantime) — in which case `blockedToastKey` is shown and nothing is saved.
async function performWrite(mutate, buildMessage, blockedToastKey) {
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await fetchReservations();
    } catch (e) {
      return 'error'; // fetchReservations already showed a status message
    }
    if (!mutate()) {
      if (blockedToastKey) showToast(blockedToastKey, true);
      return 'blocked';
    }
    const outcome = await attemptCommit(buildMessage());
    if (outcome === 'conflict') continue; // someone else saved between our fetch and our write — retry fresh
    return outcome;
  }
  showToast('conflictToast', true); // extremely unlikely to happen 3 times in a row
  return 'error';
}

/* =========================================================================
   UI Translation Update
   ========================================================================= */
function updateDOMTranslations() {
  const t = I18N[currentLang];
  document.documentElement.lang = currentLang;
  document.getElementById('pageTitle').textContent = t.pageTitle;
  document.getElementById('headerTitle').innerHTML = `<span class="mark">●</span> ${t.headerTitle}`;
  document.getElementById('langToggle').textContent = t.langBtn;
  document.getElementById('settingsToggle').textContent = t.admin;

  document.getElementById('adminTitle').textContent = t.adminTitle;
  document.getElementById('adminHint').innerHTML = t.adminHint;
  document.getElementById('lblToken').childNodes[0].nodeValue = t.lblToken + ' ';

  const pwdInput = document.getElementById('cfgToken');
  const visBtn = document.getElementById('toggleTokenVisibility');
  visBtn.textContent = pwdInput.type === 'text' ? t.hide : t.show;

  document.getElementById('txtRemember').textContent = t.rememberToken;
  document.getElementById('saveTokenBtn').textContent = t.saveToken;
  document.getElementById('clearTokenBtn').textContent = t.clearToken;

  document.getElementById('prevWeek').setAttribute('aria-label', t.prevWeek);
  document.getElementById('nextWeek').setAttribute('aria-label', t.nextWeek);
  document.getElementById('thisWeekBtn').textContent = t.thisWeek;
  document.getElementById('jumpDate').title = t.jumpTitle;

  document.getElementById('bookingTitle').textContent = t.newReservation;
  document.getElementById('txtBkIsCourse').textContent = t.weeklyCourseLabel;
  const isCourseChecked = document.getElementById('bkIsCourse').checked;
  document.getElementById('lblBkName').childNodes[0].nodeValue = (isCourseChecked ? t.courseNameLabel : t.name) + ' ';
  document.getElementById('lblBkPhone').childNodes[0].nodeValue = t.phone + ' ';
  document.getElementById('lblBkNotes').childNodes[0].nodeValue = t.notes + ' ';

  document.querySelectorAll('.optional').forEach(el => el.textContent = t.optional);
  document.getElementById('bookingCancel').textContent = t.cancel;
  document.getElementById('bookingSubmit').textContent = t.saveReservation;

  document.getElementById('detailTitle').textContent = pendingOccupantKind === 'course' ? t.courseDetail : t.reservationDetail;
  document.getElementById('detailClose').textContent = t.close;
  document.getElementById('detailCancel').textContent = pendingOccupantKind === 'course' ? t.deleteCourse : t.cancelReservation;

  if (lastStatusKey) setStatus(lastStatusKey, lastStatusKind);
}

/* =========================================================================
   Rendering
   ========================================================================= */
function renderCourtTabs() {
  const el = document.getElementById('courtTabs');
  el.innerHTML = '';
  if (COURTS.length <= 1) return;
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

// A course occupies every week's matching slot from its startDate onward.
function findCourse(court, date, time) {
  const idx = weekdayIndex(date);
  return courses.find(c => c.court === court && c.startTime === time && c.dayOfWeek === idx && date >= c.startDate);
}

// One-off bookings take precedence if a slot somehow matches both (shouldn't
// normally happen since the UI only lets you book truly open slots).
function findOccupant(court, date, time) {
  const booking = findReservation(court, date, time);
  if (booking) return { kind: 'booking', data: booking };
  const course = findCourse(court, date, time);
  if (course) return { kind: 'course', data: course };
  return null;
}

function makeCellButton(occupant, isPast, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  const kind = occupant ? occupant.kind : null;
  btn.className = 'cell-btn ' + (kind === 'booking' ? 'booked' : kind === 'course' ? 'course' : 'available');
  if (kind === 'booking') {
    btn.textContent = occupant.data.customerName;
    btn.title = occupant.data.customerName + (occupant.data.phone ? ' · ' + occupant.data.phone : '');
  } else if (kind === 'course') {
    btn.textContent = '↻ ' + occupant.data.courseName;
    btn.title = occupant.data.courseName + (occupant.data.description ? ' · ' + occupant.data.description : '');
  }
  if (isPast) {
    btn.disabled = true;
  } else {
    btn.addEventListener('click', onClick);
  }
  return btn;
}

function renderWeekGrid() {
  const t = I18N[currentLang];
  const container = document.getElementById('scheduleGrid');
  container.innerHTML = '';
  const today = todayStr();
  const slots = buildSlots();
  const dayDates = weekDates(selectedWeekStart);

  const table = document.createElement('table');
  table.className = 'week-table';

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  const corner = document.createElement('th');
  corner.className = 'corner';
  headRow.appendChild(corner);

  dayDates.forEach((dateStr, i) => {
    const th = document.createElement('th');
    th.className = 'day-head' + (dateStr === today ? ' today' : '');
    const [, m, d] = dateStr.split('-');
    th.innerHTML = `<span class="wd">${t.weekdays[i]}</span><span class="dm">${d}/${m}</span>`;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  slots.forEach(time => {
    const tr = document.createElement('tr');
    const timeHead = document.createElement('th');
    timeHead.className = 'time-head';
    timeHead.textContent = time;
    tr.appendChild(timeHead);

    dayDates.forEach(dateStr => {
      const occupant = findOccupant(selectedCourt, dateStr, time);
      const isPast = dateStr < today;
      const td = document.createElement('td');
      td.className = 'cell';
      td.appendChild(makeCellButton(occupant, isPast, () => {
        if (occupant) openDetail(occupant); else openBookingForm(selectedCourt, dateStr, time);
      }));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

function renderDayStrip() {
  const t = I18N[currentLang];
  const el = document.getElementById('dayStrip');
  if (!el) return;
  el.innerHTML = '';
  const today = todayStr();
  const dayDates = weekDates(selectedWeekStart);

  dayDates.forEach((dateStr, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'day-pill' + (i === selectedDayIndex ? ' active' : '') + (dateStr === today ? ' today' : '');
    const [, m, d] = dateStr.split('-');
    btn.innerHTML = `<span class="wd">${t.weekdays[i]}</span><span class="dm">${d}/${m}</span><span class="dot"></span>`;
    btn.addEventListener('click', () => {
      selectedDayIndex = i;
      renderDayStrip();
      renderDayList();
    });
    el.appendChild(btn);
  });
}

function renderDayList() {
  const t = I18N[currentLang];
  const el = document.getElementById('dayList');
  if (!el) return;
  el.innerHTML = '';
  const today = todayStr();
  const dateStr = weekDates(selectedWeekStart)[selectedDayIndex];
  const isPast = dateStr < today;
  const slots = buildSlots();

  slots.forEach(time => {
    const occupant = findOccupant(selectedCourt, dateStr, time);
    const kind = occupant ? occupant.kind : null;
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'day-row' + (kind === 'booking' ? ' booked' : kind === 'course' ? ' course' : '');
    const label = kind === 'booking' ? occupant.data.customerName
      : kind === 'course' ? ('↻ ' + occupant.data.courseName)
      : t.available;
    row.innerHTML = `
      <span class="status-dot"></span>
      <span class="time">${time}</span>
      <span class="name">${label}</span>
    `;
    if (isPast) {
      row.disabled = true;
    } else {
      row.addEventListener('click', () => {
        if (occupant) openDetail(occupant); else openBookingForm(selectedCourt, dateStr, time);
      });
    }
    el.appendChild(row);
  });
}

function renderAll() {
  document.getElementById('weekRangeLabel').textContent = formatWeekRange(selectedWeekStart);
  document.getElementById('jumpDate').value = selectedWeekStart;
  renderCourtTabs();
  renderWeekGrid();
  renderDayStrip();
  renderDayList();
}

/* =========================================================================
   Booking form
   ========================================================================= */
function openBookingForm(court, date, time) {
  const t = I18N[currentLang];
  pendingSlot = { court, date, time };
  document.getElementById('bookingTitle').textContent = `${court} · ${date} · ${time}`;
  document.getElementById('bkName').value = '';
  document.getElementById('bkPhone').value = '';
  document.getElementById('bkNotes').value = '';
  document.getElementById('bkIsCourse').checked = false;
  document.getElementById('lblBkPhone').classList.remove('hidden');
  document.getElementById('lblBkName').childNodes[0].nodeValue = t.name + ' ';
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

  const submitBtn = document.getElementById('bookingSubmit');
  if (submitBtn.disabled) return; // a save is already in flight — ignore extra taps
  const slot = pendingSlot;
  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = I18N[currentLang].savingEllipsis;

  try {
    if (document.getElementById('bkIsCourse').checked) {
      const course = {
        id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
        court: slot.court,
        dayOfWeek: weekdayIndex(slot.date),
        startTime: slot.time,
        courseName: name,
        description: document.getElementById('bkNotes').value.trim(),
        startDate: slot.date,
      };
      const outcome = await performWrite(
        () => {
          if (findOccupant(slot.court, slot.date, slot.time)) return false;
          courses.push(course);
          return true;
        },
        () => `Add weekly course ${course.court} ${course.startTime} from ${course.startDate} (${name})`,
        'slotTakenToast'
      );
      if (outcome === 'ok') {
        showToast('courseSavedToast');
        closeBookingForm();
      }
      renderAll();
      return;
    }

    const reservation = {
      id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      court: slot.court,
      date: slot.date,
      startTime: slot.time,
      customerName: name,
      phone: document.getElementById('bkPhone').value.trim(),
      notes: document.getElementById('bkNotes').value.trim(),
    };
    const outcome = await performWrite(
      () => {
        if (findOccupant(slot.court, slot.date, slot.time)) return false;
        reservations.push(reservation);
        return true;
      },
      () => `Book ${reservation.court} ${reservation.date} ${reservation.startTime} (${name})`,
      'slotTakenToast'
    );
    if (outcome === 'ok') {
      showToast('savedToast');
      closeBookingForm();
    }
    renderAll();
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }
}

/* =========================================================================
   Reservation detail / cancel
   ========================================================================= */
function openDetail(occupant) {
  const t = I18N[currentLang];
  pendingReservationId = occupant.data.id;
  pendingOccupantKind = occupant.kind;
  const dl = document.getElementById('detailFields');
  dl.innerHTML = '';

  let rows;
  if (occupant.kind === 'course') {
    const c = occupant.data;
    rows = [
      [t.courtLabel, c.court],
      [t.dayLabel, t.weekdays[c.dayOfWeek]],
      [t.timeLabel, c.startTime],
      [t.courseNameLabel, c.courseName],
      [t.descriptionLabel, c.description || '—'],
      [t.sinceLabel, formatDateLong(c.startDate)],
    ];
    document.getElementById('detailTitle').textContent = t.courseDetail;
    document.getElementById('detailCancel').textContent = t.deleteCourse;
  } else {
    const r = occupant.data;
    rows = [
      [t.courtLabel, r.court],
      [t.dateLabel, r.date],
      [t.timeLabel, r.startTime],
      [t.nameLabel, r.customerName],
      [t.phoneLabel, r.phone || '—'],
      [t.notesLabel, r.notes || '—'],
    ];
    document.getElementById('detailTitle').textContent = t.reservationDetail;
    document.getElementById('detailCancel').textContent = t.cancelReservation;
  }

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
  pendingOccupantKind = null;
  document.getElementById('detailOverlay').classList.add('hidden');
}

async function cancelReservation() {
  if (!pendingReservationId) return;
  const id = pendingReservationId;

  const cancelBtn = document.getElementById('detailCancel');
  if (cancelBtn.disabled) return; // a save is already in flight — ignore extra taps
  const originalLabel = cancelBtn.textContent;
  cancelBtn.disabled = true;
  cancelBtn.textContent = I18N[currentLang].savingEllipsis;

  try {
    if (pendingOccupantKind === 'course') {
      const known = courses.find(c => c.id === id); // snapshot, just for the commit message
      const outcome = await performWrite(
        () => { courses = courses.filter(c => c.id !== id); return true; },
        () => `Delete weekly course ${known?.court ?? ''} ${known?.startTime ?? ''} (${known?.courseName ?? ''})`
      );
      if (outcome === 'ok') {
        showToast('courseDeletedToast');
        closeDetail();
      }
      renderAll();
      return;
    }

    const known = reservations.find(r => r.id === id); // snapshot, just for the commit message
    const outcome = await performWrite(
      () => { reservations = reservations.filter(r => r.id !== id); return true; },
      () => `Cancel ${known?.court ?? ''} ${known?.date ?? ''} ${known?.startTime ?? ''} (${known?.customerName ?? ''})`
    );
    if (outcome === 'ok') {
      showToast('cancelledToast');
      closeDetail();
    }
    renderAll();
  } finally {
    cancelBtn.disabled = false;
    cancelBtn.textContent = originalLabel;
  }
}

/* =========================================================================
   Wiring & Listeners
   ========================================================================= */
function wireSettingsPanel() {
  document.getElementById('settingsToggle').addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.toggle('hidden');
  });

  document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    localStorage.setItem(LS_LANG, currentLang);
    updateDOMTranslations();
    renderAll();
  });

  document.getElementById('toggleTokenVisibility').addEventListener('click', () => {
    const t = I18N[currentLang];
    const input = document.getElementById('cfgToken');
    const btn = document.getElementById('toggleTokenVisibility');
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    btn.textContent = showing ? t.show : t.hide;
  });

  document.getElementById('saveTokenBtn').addEventListener('click', async () => {
    const val = document.getElementById('cfgToken').value.trim();
    if (!val) return;
    const remember = document.getElementById('cfgRemember').checked;
    token = val;
    saveToken(val, remember);
    document.getElementById('cfgToken').value = '';
    const t = I18N[currentLang];
    document.getElementById('toggleTokenVisibility').textContent = t.show;
    document.getElementById('cfgToken').type = 'password';
    await fetchReservations();
    renderAll();
  });

  document.getElementById('clearTokenBtn').addEventListener('click', () => {
    forgetToken();
    setStatus('forgottenToast');
  });
}

function wireScheduleControls() {
  document.getElementById('prevWeek').addEventListener('click', () => {
    selectedWeekStart = addDays(selectedWeekStart, -7);
    resetDayIndexForWeek();
    renderAll();
  });
  document.getElementById('nextWeek').addEventListener('click', () => {
    selectedWeekStart = addDays(selectedWeekStart, 7);
    resetDayIndexForWeek();
    renderAll();
  });
  document.getElementById('thisWeekBtn').addEventListener('click', () => {
    selectedWeekStart = getWeekStart(todayStr());
    resetDayIndexForWeek();
    renderAll();
  });
  document.getElementById('jumpDate').addEventListener('change', (e) => {
    if (!e.target.value) return;
    selectedWeekStart = getWeekStart(e.target.value);
    resetDayIndexForWeek();
    renderAll();
  });

  document.getElementById('bkIsCourse').addEventListener('change', (e) => {
    const t = I18N[currentLang];
    const isCourse = e.target.checked;
    document.getElementById('lblBkPhone').classList.toggle('hidden', isCourse);
    document.getElementById('lblBkName').childNodes[0].nodeValue = (isCourse ? t.courseNameLabel : t.name) + ' ';
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
  resetDayIndexForWeek();

  updateDOMTranslations();
  wireSettingsPanel();
  wireScheduleControls();

  // A tab left open in the background (the common case with multiple tabs)
  // can sit for a long time before it's used again. Refresh it the moment
  // it becomes visible, so it's showing current data before the person even
  // tries to book — on top of performWrite() re-checking at save time.
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
      try { await fetchReservations(); } catch (e) { /* status already shown */ }
      renderAll();
    }
  });

  try {
    await fetchReservations();
  } catch (e) {
    // status handled inside fetchReservations
  }
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);