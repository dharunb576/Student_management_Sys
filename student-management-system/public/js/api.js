const API_URL = '';

function getToken() { return localStorage.getItem('token'); }
function getUser()  { return JSON.parse(localStorage.getItem('user') || 'null'); }

function setAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

function requireAuth() {
  if (!getToken()) { window.location.href = 'index.html'; return; }
}

function logout() {
  clearAuth();
  window.location.href = 'index.html';
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(API_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
}

function showAlert(id, message, type = 'success') {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `alert alert-${type} show`;
  el.textContent = message;
  setTimeout(() => el.classList.remove('show'), 4000);
}

function renderUserInfo() {
  const user = getUser();
  if (!user) return;
  const nameEl   = document.getElementById('userName');
  const roleEl   = document.getElementById('userRole');
  const avatarEl = document.getElementById('userAvatar');
  if (nameEl)   nameEl.textContent   = user.name;
  if (roleEl)   roleEl.textContent   = user.role;
  if (avatarEl) avatarEl.textContent = user.name?.charAt(0).toUpperCase();

  // Populate profile dropdown account info
  const pdName   = document.getElementById('pdName');
  const pdEmail  = document.getElementById('pdEmail');
  const pdRole   = document.getElementById('pdRole');
  const pdAvatar = document.getElementById('pdAvatar');
  if (pdName)   pdName.textContent   = user.name;
  if (pdEmail)  pdEmail.textContent  = user.email;
  if (pdRole)   pdRole.textContent   = user.role;
  if (pdAvatar) pdAvatar.textContent = user.name?.charAt(0).toUpperCase();
}

// ✅ ROLE BASED PERMISSIONS
function canDo(action) {
  const role = getUser()?.role;
  const perms = {
    admin:   ['view', 'create', 'edit', 'delete', 'enroll', 'status'],
    teacher: ['view', 'create', 'edit', 'enroll', 'status'],
    student: ['view'],
  };
  return perms[role]?.includes(action) ?? false;
}

// ✅ RESTRICT PAGE ACCESS BY ROLE
function restrictPage(allowedRoles) {
  const role = getUser()?.role;
  if (!allowedRoles.includes(role)) {
    document.body.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#f1f5f9">
        <div style="background:white;padding:40px;border-radius:12px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,0.1)">
          <div style="font-size:48px;margin-bottom:16px">🚫</div>
          <h2 style="margin-bottom:8px;color:#0f172a">Access Denied</h2>
          <p style="color:#64748b;margin-bottom:24px">You don't have permission to view this page.</p>
          <a href="dashboard.html" style="background:#2563eb;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:500">Go to Dashboard</a>
        </div>
      </div>`;
  }
}

function openModal(id) {
  document.getElementById(id)?.classList.add('active');
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('active');
  const form = document.querySelector(`#${id} form`);
  if (form) form.reset();
}

// ──────────────────────────────────────────────
// PROFILE DROPDOWN
// ──────────────────────────────────────────────
function toggleProfileDropdown(e) {
  if (e) e.stopPropagation();
  const dd = document.getElementById('profileDropdown');
  if (dd) dd.classList.toggle('open');
}

// Close dropdown on click outside
document.addEventListener('click', function(e) {
  const dd = document.getElementById('profileDropdown');
  const uc = document.querySelector('.user-card');
  if (dd && dd.classList.contains('open') && !dd.contains(e.target) && (!uc || !uc.contains(e.target))) {
    dd.classList.remove('open');
  }
});

// Collapsible sections
function togglePdSection(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('open');
  btn.classList.toggle('expanded');
}

// ──────────────────────────────────────────────
// THEME TOGGLE
// ──────────────────────────────────────────────
function applyTheme(mode) {
  localStorage.setItem('theme', mode);
  if (mode === 'dark') {
    document.body.classList.add('dark');
  } else if (mode === 'light') {
    document.body.classList.remove('dark');
  } else {
    // System
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  // Update active button
  document.querySelectorAll('.theme-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === mode);
  });
}

// Apply saved theme on load
(function() {
  const saved = localStorage.getItem('theme') || 'light';
  if (saved === 'dark') {
    document.body.classList.add('dark');
  } else if (saved === 'system') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    }
  }
})();

// Init theme toggle buttons after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('theme') || 'light';
  document.querySelectorAll('.theme-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === saved);
  });
});

// ──────────────────────────────────────────────
// PROFILE SETTINGS
// ──────────────────────────────────────────────
function showPdAlert(id, msg, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `pd-alert pd-alert-${type} show`;
  el.textContent = msg;
  setTimeout(() => el.classList.remove('show'), 3000);
}

async function updateDisplayName(e) {
  e.preventDefault();
  const name = document.getElementById('pdNewName').value.trim();
  if (!name) return;
  try {
    const res = await apiFetch('/auth/profile', { method: 'PUT', body: JSON.stringify({ name }) });
    // Update local storage
    const user = getUser();
    user.name = res.user.name;
    localStorage.setItem('user', JSON.stringify(user));
    renderUserInfo();
    showPdAlert('pdNameAlert', '✅ Name updated!', 'success');
    document.getElementById('pdNewName').value = '';
    // Update welcome name if on dashboard
    const wn = document.getElementById('welcomeName');
    if (wn) wn.textContent = user.name;
  } catch(err) {
    showPdAlert('pdNameAlert', err.message, 'danger');
  }
}

async function changeUserPassword(e) {
  e.preventDefault();
  const curr = document.getElementById('pdCurrentPw').value;
  const newPw = document.getElementById('pdNewPw').value;
  const confirm = document.getElementById('pdConfirmPw').value;
  if (newPw !== confirm) {
    showPdAlert('pdPwAlert', 'Passwords do not match', 'danger');
    return;
  }
  try {
    await apiFetch('/auth/change-password', { method: 'PUT', body: JSON.stringify({ currentPassword: curr, newPassword: newPw }) });
    showPdAlert('pdPwAlert', '✅ Password changed!', 'success');
    document.getElementById('pdCurrentPw').value = '';
    document.getElementById('pdNewPw').value = '';
    document.getElementById('pdConfirmPw').value = '';
  } catch(err) {
    showPdAlert('pdPwAlert', err.message, 'danger');
  }
}