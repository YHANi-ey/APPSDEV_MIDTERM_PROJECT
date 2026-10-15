import { initRouter, handleRoute } from './router.js';
import { getState, setState, subscribe } from './state.js';
import { escapeHTML } from './utils.js';

function renderHeaderUI(state) {
  const userArea = document.getElementById('user-area');
  const cartBadge = document.getElementById('cart-badge');

  // Update Cart Badge[cite: 10]
  if (cartBadge) {
    const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
    cartBadge.textContent = cartCount;
  }

  // Highlight active nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    const targetRoute = link.getAttribute('data-route');
    if (state.route.name === targetRoute) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Render Auth User Profile in Header
  if (state.auth.user) {
    userArea.innerHTML = `
      <img src="${escapeHTML(state.auth.user.image)}" alt="${escapeHTML(state.auth.user.firstName)}" class="avatar" />
      <span>${escapeHTML(state.auth.user.firstName)}</span>
      <button id="logout-btn" class="btn btn-secondary">Logout</button>
    `;
  } else {
    userArea.innerHTML = `<a href="#/login" class="btn">Login</a>`;
  }
}

// Global Event Handler for Header Actions
document.getElementById('user-area').addEventListener('click', (e) => {
  if (e.target.id === 'logout-btn') {
    setState({
      auth: { user: null, accessToken: null, refreshToken: null },
      cart: []
    });
    window.location.hash = '#/login';
  }
});

// Re-render UI on state updates[cite: 3, 7, 12]
subscribe((state) => {
  renderHeaderUI(state);
});

// App Bootstrap[cite: 2, 6]
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
});