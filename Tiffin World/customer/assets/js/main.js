// Shared customer dashboard behaviour for the static portfolio copy.
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('appSidebar');
  const toggle = document.getElementById('sidebarToggler');
  const close = document.getElementById('sidebarClose');

  const setSidebarOpen = (open) => {
    if (!sidebar) return;
    sidebar.classList.toggle('show', open);
    toggle?.setAttribute('aria-expanded', String(open));
  };

  if (toggle && sidebar) {
    toggle.setAttribute('aria-controls', 'appSidebar');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => setSidebarOpen(!sidebar.classList.contains('show')));
  }
  close?.addEventListener('click', () => setSidebarOpen(false));
  sidebar?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setSidebarOpen(false)));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setSidebarOpen(false);
  });
  document.addEventListener('click', event => {
    if (!sidebar || !sidebar.classList.contains('show') || window.innerWidth >= 992) return;
    if (!sidebar.contains(event.target) && !toggle?.contains(event.target)) setSidebarOpen(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) setSidebarOpen(false);
  });

  // Bootstrap is loaded separately by the page; enhance only when it is available.
  if (window.bootstrap?.Tooltip) {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      new window.bootstrap.Tooltip(el);
    });
  }
});
