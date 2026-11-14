/**
 * StudySync Tracker - Frontend Client
 * Communicates with REST API at http://localhost:3000
 * Automatically persists all updates into the backend database.
 */

const API_BASE = window.location.origin.startsWith('http') ? window.location.origin : 'http://localhost:3000';
const THEME_KEY = 'studysync_theme_pref';

// Subject SVG icons map
const SUBJECT_ICONS = {
  os: `<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  aiml: `<svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`,
  toc: `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
  cc: `<svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"/></svg>`,
  ipr: `<svg class="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
  medchem: `<svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`,
  indpharm: `<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`,
  pharmcol: `<svg class="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
  pharmacog: `<svg class="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`,
  juris: `<svg class="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>`
};

// Client State
let state = {
  subjects: [],
  stats: null,
  activeFilter: 'all',
  searchQuery: '',
  collapsedMap: {},
  activeNotesUnit: null,
  activeEditUnit: null,
  isServerConnected: false
};

// API Helpers
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }
  return await response.json();
}

// Initialize App
async function initApp() {
  setupTheme();
  bindGlobalEvents();
  await loadDataFromBackend();
}

// Load Data from Backend REST API
async function loadDataFromBackend() {
  const serverBadge = document.getElementById('serverStatusBadge');
  const serverText = document.getElementById('serverStatusText');

  try {
    const [subjectsRes, statsRes] = await Promise.all([
      fetchAPI('/api/subjects'),
      fetchAPI('/api/stats')
    ]);

    state.subjects = subjectsRes.data || [];
    state.stats = statsRes.data || null;
    state.isServerConnected = true;

    if (serverBadge && serverText) {
      serverBadge.className = 'text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5';
      serverText.textContent = `Connected (localhost:3000)`;
    }

    render();
  } catch (err) {
    console.warn("Backend not reached at", API_BASE, err);
    state.isServerConnected = false;

    if (serverBadge && serverText) {
      serverBadge.className = 'text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium flex items-center gap-1.5';
      serverText.textContent = 'Backend Offline • Check server';
    }

    // Try fallback to local cache if available
    const cached = localStorage.getItem('studysync_offline_cache');
    if (cached) {
      try {
        state.subjects = JSON.parse(cached);
        render();
      } catch (e) {}
    }
  }
}

// Theme handling
function setupTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  const html = document.documentElement;
  const moonIcon = document.getElementById('themeMoonIcon');
  const sunIcon = document.getElementById('themeSunIcon');

  if (savedTheme === 'light') {
    html.classList.remove('dark');
    html.classList.add('light');
    moonIcon?.classList.remove('hidden');
    sunIcon?.classList.add('hidden');
  } else {
    html.classList.remove('light');
    html.classList.add('dark');
    moonIcon?.classList.add('hidden');
    sunIcon?.classList.remove('hidden');
  }
}

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  const nextTheme = isDark ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, nextTheme);
  setupTheme();
}

// Bind Global UI Listeners
function bindGlobalEvents() {
  // Theme Toggle
  document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);

  // Sync / Refresh Button
  document.getElementById('refreshBtn')?.addEventListener('click', async () => {
    await loadDataFromBackend();
  });

  // Search Input
  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    renderSubjects();
  });

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active-filter', 'bg-indigo-600', 'text-white');
        b.classList.add('text-slate-400');
      });
      btn.classList.add('active-filter', 'bg-indigo-600', 'text-white');
      btn.classList.remove('text-slate-400');
      state.activeFilter = btn.dataset.filter;
      renderSubjects();
    });
  });

  // Toggle All Accordions
  document.getElementById('toggleAllAccordionBtn')?.addEventListener('click', toggleAllAccordions);

  // Export Data from Backend
  document.getElementById('exportBtn')?.addEventListener('click', exportDatabase);

  // Import Data to Backend
  document.getElementById('importFileInput')?.addEventListener('change', importDatabase);

  // Reset Modal Triggers
  document.getElementById('resetAllBtn')?.addEventListener('click', () => openModal('resetConfirmModal'));
  document.getElementById('cancelResetBtn')?.addEventListener('click', () => closeModal('resetConfirmModal'));
  document.getElementById('confirmResetBtn')?.addEventListener('click', resetAllProgress);

  // Notes Modal Events
  document.getElementById('closeNotesModalBtn')?.addEventListener('click', () => closeModal('notesModal'));
  document.getElementById('saveNotesBtn')?.addEventListener('click', saveActiveNote);

  // Edit Title Modal Events
  document.getElementById('closeEditTitleModalBtn')?.addEventListener('click', () => closeModal('editTitleModal'));
  document.getElementById('cancelEditTitleBtn')?.addEventListener('click', () => closeModal('editTitleModal'));
  document.getElementById('saveEditTitleBtn')?.addEventListener('click', saveActiveUnitTitle);

  // Modal backdrop click
  ['notesModal', 'editTitleModal', 'resetConfirmModal'].forEach(id => {
    const modal = document.getElementById(id);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(id);
    });
  });

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ['notesModal', 'editTitleModal', 'resetConfirmModal'].forEach(id => closeModal(id));
    }
  });
}

// Modal Helpers
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('modal-open'), 10);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('modal-open');
  setTimeout(() => modal.classList.add('hidden'), 200);
}

// Render UI & Metrics
function render() {
  updateMetrics();
  renderSubjects();
  // Cache state locally in case backend is temporarily restarted
  try {
    localStorage.setItem('studysync_offline_cache', JSON.stringify(state.subjects));
  } catch (e) {}
}

// Update Top Analytics
function updateMetrics() {
  let totalUnits = 0;
  let completedUnits = 0;
  let inProgressUnits = 0;
  let subjectsCompleted = 0;
  let subjectsInProgress = 0;
  let totalRevisions = 0;

  state.subjects.forEach(subject => {
    let subCompleted = 0;
    subject.units.forEach(unit => {
      totalUnits++;
      if (unit.completed || unit.status === 'completed') {
        completedUnits++;
        subCompleted++;
      } else if (unit.status === 'in_progress') {
        inProgressUnits++;
      }
      totalRevisions += (unit.revisions || 0);
    });

    if (subCompleted === subject.units.length && subject.units.length > 0) {
      subjectsCompleted++;
    } else if (subCompleted > 0 || subject.units.some(u => u.status === 'in_progress')) {
      subjectsInProgress++;
    }
  });

  const percentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
  const remaining = totalUnits - completedUnits;

  // Percentage & Unit ratio
  const overallPercentage = document.getElementById('overallPercentage');
  if (overallPercentage) overallPercentage.textContent = `${percentage}%`;

  const overallUnitRatio = document.getElementById('overallUnitRatio');
  if (overallUnitRatio) overallUnitRatio.textContent = `${completedUnits} of ${totalUnits} units completed`;

  // Circular progress in Hero
  const circle = document.getElementById('overallCircleProgress');
  const circleText = document.getElementById('overallCircleText');
  if (circle) {
    const circumference = 2 * Math.PI * 32;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }
  if (circleText) {
    circleText.textContent = `${percentage}%`;
  }

  // Linear Progress Bar
  const overallProgressBar = document.getElementById('overallProgressBar');
  if (overallProgressBar) {
    overallProgressBar.style.width = `${percentage}%`;
  }

  // Motivational Message
  const motivationalMessage = document.getElementById('motivationalMessage');
  if (motivationalMessage) {
    if (percentage === 100) {
      motivationalMessage.innerHTML = `🎉 Mastered! All ${totalUnits} units completed! 100% Exam Ready!`;
    } else if (percentage >= 75) {
      motivationalMessage.innerHTML = '🔥 Final stretch! Over 75% of your syllabus is covered!';
    } else if (percentage >= 50) {
      motivationalMessage.innerHTML = '⚡ Halfway mark achieved! Keep the momentum high!';
    } else if (percentage >= 25) {
      motivationalMessage.innerHTML = '📈 Solid start! 1/4th of your curriculum mastered!';
    } else if (percentage > 0) {
      motivationalMessage.innerHTML = '🚀 Progress logged in database! Keep going step by step.';
    } else {
      motivationalMessage.innerHTML = 'Ready to begin your study journey! 🚀';
    }
  }

  // Header Subtitle & Badge
  const headerBadge = document.getElementById('subjectsHeaderBadge');
  if (headerBadge) {
    headerBadge.textContent = `${state.subjects.length} Subjects • ${totalUnits} Units`;
  }
  const allFilterBtn = document.querySelector('button[data-filter="all"]');
  if (allFilterBtn) {
    allFilterBtn.textContent = `All (${totalUnits})`;
  }

  // Units remaining
  const unitsRemainingText = document.getElementById('unitsRemainingText');
  if (unitsRemainingText) {
    unitsRemainingText.textContent = remaining === 0 ? 'All units finished!' : `${remaining} units remaining`;
  }

  // Subjects Mastered Metric
  const subjectsCompletedCount = document.getElementById('subjectsCompletedCount');
  if (subjectsCompletedCount) {
    subjectsCompletedCount.textContent = `${subjectsCompleted} / ${state.subjects.length}`;
  }

  const subjectsCompletedSubtext = document.getElementById('subjectsCompletedSubtext');
  if (subjectsCompletedSubtext) {
    if (subjectsCompleted === state.subjects.length && state.subjects.length > 0) {
      subjectsCompletedSubtext.textContent = `All ${state.subjects.length} subjects mastered! 🏆`;
    } else if (subjectsCompleted > 0) {
      subjectsCompletedSubtext.textContent = `${subjectsCompleted} of ${state.subjects.length} subjects at 100% completion`;
    } else {
      subjectsCompletedSubtext.textContent = 'No subjects finished yet';
    }
  }

  const subjectsInProgressCount = document.getElementById('subjectsInProgressCount');
  if (subjectsInProgressCount) {
    subjectsInProgressCount.textContent = `${subjectsInProgress} active`;
  }

  // Revisions & Streak
  const totalRevisionsCount = document.getElementById('totalRevisionsCount');
  if (totalRevisionsCount) {
    totalRevisionsCount.textContent = totalRevisions;
  }

  const streakDays = document.getElementById('studyStreakDays');
  if (streakDays && state.stats && state.stats.streak) {
    streakDays.textContent = `${state.stats.streak.count || 1} day${state.stats.streak.count === 1 ? '' : 's'}`;
  }

  // Celebration on 100%
  if (percentage === 100 && !state.hasTriggeredFullCelebration) {
    triggerCelebration(true);
    state.hasTriggeredFullCelebration = true;
  } else if (percentage < 100) {
    state.hasTriggeredFullCelebration = false;
  }
}

// Render All Subject Cards
function renderSubjects() {
  const container = document.getElementById('subjectsContainer');
  if (!container) return;

  container.innerHTML = '';

  const { activeFilter, searchQuery } = state;

  state.subjects.forEach(subject => {
    const isCollapsed = !!state.collapsedMap[subject.id];
    const totalUnits = subject.units.length;
    const completedUnits = subject.units.filter(u => u.completed || u.status === 'completed').length;
    const subjectPercent = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
    const isSubjectDone = completedUnits === totalUnits;

    // Filter units based on active status filter & search query
    const visibleUnits = subject.units.filter(unit => {
      if (activeFilter === 'completed' && !(unit.completed || unit.status === 'completed')) return false;
      if (activeFilter === 'in_progress' && unit.status !== 'in_progress') return false;
      if (activeFilter === 'not_started' && (unit.completed || unit.status !== 'not_started')) return false;

      if (searchQuery) {
        const matchesSubject = subject.name.toLowerCase().includes(searchQuery) || subject.code.toLowerCase().includes(searchQuery);
        const matchesUnit = unit.title.toLowerCase().includes(searchQuery) || `unit ${unit.num}`.includes(searchQuery);
        if (!matchesSubject && !matchesUnit) return false;
      }
      return true;
    });

    if (searchQuery && visibleUnits.length === 0 && !subject.name.toLowerCase().includes(searchQuery)) {
      return;
    }

    const card = document.createElement('div');
    card.className = `rounded-3xl bg-slate-900/80 border ${isSubjectDone ? 'border-emerald-500/30' : 'border-slate-800/80'} shadow-xl overflow-hidden backdrop-blur-xl transition duration-300`;

    const accentBorder = {
      emerald: 'from-emerald-500 to-teal-400',
      indigo: 'from-indigo-500 to-purple-500',
      amber: 'from-amber-500 to-yellow-400',
      sky: 'from-sky-500 to-cyan-400',
      rose: 'from-rose-500 to-pink-500',
      teal: 'from-teal-500 to-emerald-400',
      blue: 'from-blue-500 to-indigo-500',
      fuchsia: 'from-fuchsia-500 to-pink-500',
      lime: 'from-lime-500 to-emerald-500',
      violet: 'from-violet-500 to-purple-500'
    }[subject.color] || 'from-indigo-500 to-cyan-400';

    const accentText = {
      emerald: 'text-emerald-400',
      indigo: 'text-indigo-400',
      amber: 'text-amber-400',
      sky: 'text-sky-400',
      rose: 'text-rose-400',
      teal: 'text-teal-400',
      blue: 'text-blue-400',
      fuchsia: 'text-fuchsia-400',
      lime: 'text-lime-400',
      violet: 'text-violet-400'
    }[subject.color] || 'text-indigo-400';

    const iconSvg = SUBJECT_ICONS[subject.id] || SUBJECT_ICONS.os;

    card.innerHTML = `
      <!-- Subject Header -->
      <div class="p-5 sm:p-6 border-b border-slate-800/60 bg-gradient-to-r from-slate-900/90 to-slate-900/40">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <!-- Subject Title & Badge -->
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center flex-shrink-0 shadow-inner">
              ${iconSvg}
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-lg sm:text-xl font-bold text-white tracking-tight">${subject.name}</h2>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-medium border border-slate-700">
                  ${totalUnits} Units
                </span>
                ${isSubjectDone ? `
                  <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <span>✓</span> Completed
                  </span>
                ` : ''}
              </div>
              <p class="text-xs text-slate-400 mt-0.5">
                ${completedUnits} of ${totalUnits} units mastered • ${totalUnits - completedUnits} remaining
              </p>
            </div>
          </div>

          <!-- Subject Progress & Actions -->
          <div class="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
            <div class="text-right">
              <span class="text-lg font-extrabold ${accentText}">${subjectPercent}%</span>
              <div class="w-24 sm:w-32 bg-slate-800 rounded-full h-2 overflow-hidden mt-1 p-0.5">
                <div class="h-full bg-gradient-to-r ${accentBorder} rounded-full transition-all duration-500 ease-out" style="width: ${subjectPercent}%"></div>
              </div>
            </div>

            <!-- Header Quick Actions -->
            <div class="flex items-center gap-1 pl-2 border-l border-slate-800">
              <button data-action="mark-subject-all" data-subject="${subject.id}" title="Mark all units in ${subject.name} complete" class="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-xl transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              </button>
              <button data-action="reset-subject" data-subject="${subject.id}" title="Reset ${subject.name}" class="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </button>
              <button data-action="toggle-accordion" data-subject="${subject.id}" title="Expand / Collapse" class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition">
                <svg class="w-4 h-4 transform transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Units List -->
      <div id="accordion-${subject.id}" class="accordion-content ${isCollapsed ? 'collapsed' : ''}">
        <div class="p-4 sm:p-6 space-y-3">
          ${visibleUnits.length === 0 ? `
            <div class="py-8 text-center text-sm text-slate-500">
              No units match the current filter or search query.
            </div>
          ` : ''}

          ${visibleUnits.map(unit => {
            const isDone = unit.completed || unit.status === 'completed';
            const statusClass = isDone ? 'status-completed' : unit.status === 'in_progress' ? 'status-in-progress' : 'status-not-started';
            const statusLabel = isDone ? 'Completed' : unit.status === 'in_progress' ? 'In Progress' : 'Not Started';
            const hasNotes = unit.notes && unit.notes.trim().length > 0;

            return `
              <div class="unit-card group flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/60 border ${isDone ? 'border-emerald-500/20 bg-emerald-950/10' : 'border-slate-800/80 hover:border-slate-700/80'} transition-all duration-200">
                
                <!-- Left Details -->
                <div class="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                  <input 
                    type="checkbox" 
                    class="unit-checkbox mt-0.5 sm:mt-0" 
                    data-action="toggle-unit" 
                    data-subject="${subject.id}" 
                    data-unit="${unit.id}" 
                    ${isDone ? 'checked' : ''}
                    title="Mark complete / incomplete"
                  >

                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300">
                        Unit ${unit.num}
                      </span>
                      <span class="status-pill text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusClass}">
                        ${statusLabel}
                      </span>
                      ${(unit.revisions || 0) > 0 ? `
                        <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                          🔄 ${unit.revisions} rev${unit.revisions > 1 ? 's' : ''}
                        </span>
                      ` : ''}
                      ${hasNotes ? `
                        <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
                          📝 Notes
                        </span>
                      ` : ''}
                    </div>

                    <div class="mt-1 flex items-center gap-2">
                      <h4 class="text-sm font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-100'} truncate-2-lines transition">
                        ${unit.title}
                      </h4>
                      <button 
                        data-action="edit-title" 
                        data-subject="${subject.id}" 
                        data-unit="${unit.id}" 
                        title="Edit Unit Title" 
                        class="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-indigo-400 transition flex-shrink-0"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Right Actions -->
                <div class="flex items-center gap-2 self-end md:self-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/40 w-full md:w-auto justify-between md:justify-end">
                  
                  <!-- Status Dropdown -->
                  <select 
                    data-action="change-status" 
                    data-subject="${subject.id}" 
                    data-unit="${unit.id}" 
                    class="text-xs px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer font-medium"
                  >
                    <option value="not_started" ${unit.status === 'not_started' && !unit.completed ? 'selected' : ''}>Not Started</option>
                    <option value="in_progress" ${unit.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                    <option value="completed" ${unit.status === 'completed' || unit.completed ? 'selected' : ''}>Completed</option>
                  </select>

                  <!-- Revise Button -->
                  <button 
                    data-action="increment-revision" 
                    data-subject="${subject.id}" 
                    data-unit="${unit.id}" 
                    title="Increment revision count" 
                    class="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                    <span class="hidden sm:inline">Revise</span>
                    <span class="font-bold text-amber-400">+1</span>
                  </button>

                  <!-- Notes Trigger -->
                  <button 
                    data-action="open-notes" 
                    data-subject="${subject.id}" 
                    data-unit="${unit.id}" 
                    title="Study Notes for Unit ${unit.num}" 
                    class="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl ${hasNotes ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'} transition"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    <span class="hidden sm:inline">Notes</span>
                  </button>

                </div>

              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  bindSubjectCardEvents(container);
}

// Bind Dynamic Card Events
function bindSubjectCardEvents(container) {
  // Toggle Checkbox
  container.querySelectorAll('input[data-action="toggle-unit"]').forEach(chk => {
    chk.addEventListener('change', async (e) => {
      const subjectId = e.target.dataset.subject;
      const unitId = e.target.dataset.unit;
      const isChecked = e.target.checked;
      await updateUnitOnBackend(subjectId, unitId, { completed: isChecked });
    });
  });

  // Change Status Select
  container.querySelectorAll('select[data-action="change-status"]').forEach(select => {
    select.addEventListener('change', async (e) => {
      const subjectId = e.target.dataset.subject;
      const unitId = e.target.dataset.unit;
      const newStatus = e.target.value;
      await updateUnitOnBackend(subjectId, unitId, { status: newStatus });
    });
  });

  // Increment Revision
  container.querySelectorAll('button[data-action="increment-revision"]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const unitId = e.currentTarget.dataset.unit;
      try {
        await fetchAPI(`/api/units/${unitId}/revise`, { method: 'POST' });
        await loadDataFromBackend();
      } catch (err) {
        console.error("Failed to revise:", err);
      }
    });
  });

  // Open Notes
  container.querySelectorAll('button[data-action="open-notes"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      const unitId = e.currentTarget.dataset.unit;
      openNotesModalForUnit(subjectId, unitId);
    });
  });

  // Edit Unit Title
  container.querySelectorAll('button[data-action="edit-title"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      const unitId = e.currentTarget.dataset.unit;
      openEditTitleModalForUnit(subjectId, unitId);
    });
  });

  // Toggle Accordion
  container.querySelectorAll('button[data-action="toggle-accordion"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      state.collapsedMap[subjectId] = !state.collapsedMap[subjectId];
      renderSubjects();
    });
  });

  // Mark all units in subject complete
  container.querySelectorAll('button[data-action="mark-subject-all"]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      try {
        await fetchAPI(`/api/subjects/${subjectId}/mark-all`, {
          method: 'POST',
          body: JSON.stringify({ completed: true })
        });
        triggerCelebration(false);
        await loadDataFromBackend();
      } catch (err) {
        console.error("Failed to mark all:", err);
      }
    });
  });

  // Reset subject
  container.querySelectorAll('button[data-action="reset-subject"]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const subjectId = e.currentTarget.dataset.subject;
      try {
        await fetchAPI(`/api/subjects/${subjectId}/mark-all`, {
          method: 'POST',
          body: JSON.stringify({ completed: false })
        });
        await loadDataFromBackend();
      } catch (err) {
        console.error("Failed to reset subject:", err);
      }
    });
  });
}

// Backend Update Helpers
async function updateUnitOnBackend(subjectId, unitId, changes) {
  // Optimistic UI update
  const subject = state.subjects.find(s => s.id === subjectId);
  if (subject) {
    const unit = subject.units.find(u => u.id === unitId);
    if (unit) {
      if (typeof changes.completed === 'boolean') {
        unit.completed = changes.completed;
        unit.status = changes.completed ? 'completed' : 'not_started';
      }
      if (changes.status) {
        unit.status = changes.status;
        unit.completed = (changes.status === 'completed');
      }
      render();
    }
  }

  try {
    await fetchAPI(`/api/units/${unitId}`, {
      method: 'PATCH',
      body: JSON.stringify(changes)
    });
    // Check if subject completed
    if (subject && subject.units.every(u => u.completed)) {
      triggerCelebration(false);
    }
    await loadDataFromBackend();
  } catch (err) {
    console.error("Backend update failed, reverting:", err);
    await loadDataFromBackend();
  }
}

// Toggle All Accordions
function toggleAllAccordions() {
  const anyOpen = state.subjects.some(s => !state.collapsedMap[s.id]);
  const btnLabel = document.getElementById('accordionBtnLabel');
  const collapseIcon = document.getElementById('collapseIcon');

  state.subjects.forEach(s => {
    state.collapsedMap[s.id] = anyOpen;
  });

  if (btnLabel) btnLabel.textContent = anyOpen ? 'Expand All' : 'Collapse All';
  if (collapseIcon) {
    if (anyOpen) collapseIcon.classList.remove('rotate-180');
    else collapseIcon.classList.add('rotate-180');
  }

  renderSubjects();
}

// Notes Handling
function openNotesModalForUnit(subjectId, unitId) {
  const subject = state.subjects.find(s => s.id === subjectId);
  if (!subject) return;
  const unit = subject.units.find(u => u.id === unitId);
  if (!unit) return;

  state.activeNotesUnit = { subjectId, unitId };

  const tag = document.getElementById('notesModalSubjectTag');
  const title = document.getElementById('notesModalUnitTitle');
  const textarea = document.getElementById('notesModalTextarea');

  if (tag) tag.textContent = `${subject.name} • Unit ${unit.num}`;
  if (title) title.textContent = unit.title;
  if (textarea) textarea.value = unit.notes || '';

  openModal('notesModal');
  setTimeout(() => textarea?.focus(), 50);
}

async function saveActiveNote() {
  if (!state.activeNotesUnit) return;
  const { unitId } = state.activeNotesUnit;
  const textarea = document.getElementById('notesModalTextarea');
  const notesText = textarea ? textarea.value : '';

  try {
    await fetchAPI(`/api/units/${unitId}/notes`, {
      method: 'PUT',
      body: JSON.stringify({ notes: notesText })
    });
    await loadDataFromBackend();
  } catch (err) {
    console.error("Failed to save notes:", err);
  }

  closeModal('notesModal');
}

// Custom Unit Title Handling
function openEditTitleModalForUnit(subjectId, unitId) {
  const subject = state.subjects.find(s => s.id === subjectId);
  if (!subject) return;
  const unit = subject.units.find(u => u.id === unitId);
  if (!unit) return;

  state.activeEditUnit = { subjectId, unitId };
  const input = document.getElementById('editTitleInput');
  if (input) input.value = unit.title;

  openModal('editTitleModal');
  setTimeout(() => input?.focus(), 50);
}

async function saveActiveUnitTitle() {
  if (!state.activeEditUnit) return;
  const { unitId } = state.activeEditUnit;
  const input = document.getElementById('editTitleInput');
  const newTitle = input ? input.value.trim() : '';

  if (newTitle) {
    try {
      await fetchAPI(`/api/units/${unitId}/title`, {
        method: 'PUT',
        body: JSON.stringify({ title: newTitle })
      });
      await loadDataFromBackend();
    } catch (err) {
      console.error("Failed to update title:", err);
    }
  }

  closeModal('editTitleModal');
}

// Reset Entire Database
async function resetAllProgress() {
  try {
    await fetchAPI('/api/reset', { method: 'POST' });
    await loadDataFromBackend();
  } catch (err) {
    console.error("Failed to reset:", err);
  }
  closeModal('resetConfirmModal');
}

// Export Database JSON
async function exportDatabase() {
  try {
    const data = await fetchAPI('/api/export');
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `studysync_database_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    alert("Export failed: " + err.message);
  }
}

// Import Database JSON
function importDatabase(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      await fetchAPI('/api/import', {
        method: 'POST',
        body: JSON.stringify(imported)
      });
      await loadDataFromBackend();
      alert("Database imported successfully!");
    } catch (err) {
      alert("Failed to import: " + err.message);
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// Confetti Animations
function triggerCelebration(isBigBurst = false) {
  if (typeof confetti !== 'function') return;

  if (isBigBurst) {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const interval = setInterval(function() {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: 0.2, y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: 0.8, y: Math.random() - 0.2 } });
    }, 250);
  } else {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, zIndex: 9999 });
  }
}

document.addEventListener('DOMContentLoaded', initApp);
