import { getState, setState } from './state.js';
import { renderLogin, mountLogin } from './views/login.js';
import { renderDashboard, mountDashboard } from './views/dashboard.js';
import { renderShop, mountShop } from './views/shop.js';
import { renderProductDetail, mountProductDetail } from './views/product-detail.js';
import { renderCart, mountCart } from './views/cart.js';
import { renderRecipes, mountRecipes } from './views/recipes.js';
import { renderRecipeDetail, mountRecipeDetail } from './views/recipe-detail.js';
import { renderCommunity, mountCommunity } from './views/community.js';
import { renderPostDetail, mountPostDetail } from './views/post-detail.js';
import { renderPeople, mountPeople } from './views/people.js';
import { renderUserProfile, mountUserProfile } from './views/user-profile.js';
import { renderTasks, mountTasks } from './views/tasks.js';
import { renderNotFound, mountNotFound } from './views/not-found.js';

const routes = [
  { path: '#/login', view: 'login', render: renderLogin, mount: mountLogin, guestOnly: true },
  { path: '#/', view: 'dashboard', render: renderDashboard, mount: mountDashboard, protected: true },
  { path: '#/shop', view: 'shop', render: renderShop, mount: mountShop },
  { path: '#/shop/:id', view: 'productDetail', render: renderProductDetail, mount: mountProductDetail },
  { path: '#/cart', view: 'cart', render: renderCart, mount: mountCart, protected: true },
  { path: '#/recipes', view: 'recipes', render: renderRecipes, mount: mountRecipes },
  { path: '#/recipes/:id', view: 'recipeDetail', render: renderRecipeDetail, mount: mountRecipeDetail },
  { path: '#/community', view: 'community', render: renderCommunity, mount: mountCommunity },
  { path: '#/community/:id', view: 'postDetail', render: renderPostDetail, mount: mountPostDetail },
  { path: '#/people', view: 'people', render: renderPeople, mount: mountPeople },
  { path: '#/people/:id', view: 'userProfile', render: renderUserProfile, mount: mountUserProfile },
  { path: '#/tasks', view: 'tasks', render: renderTasks, mount: mountTasks, protected: true }
];

export function handleRoute() {
  const hash = window.location.hash || '#/';
  const state = getState();
  const isAuthenticated = Boolean(state.auth.user);

  let matchedRoute = null;
  let params = {};

  // Simple route matcher supporting parameters
  for (const route of routes) {
    const routeParts = route.path.split('/');
    const hashParts = hash.split('/');

    if (routeParts.length === hashParts.length) {
      let match = true;
      const tempParams = {};

      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          tempParams[routeParts[i].substring(1)] = hashParts[i];
        } else if (routeParts[i] !== hashParts[i]) {
          match = false;
          break;
        }
      }

      if (match) {
        matchedRoute = route;
        params = tempParams;
        break;
      }
    }
  }

  // Guard handling[cite: 7, 8, 9]
  if (!matchedRoute) {
    matchedRoute = { view: 'notFound', render: renderNotFound, mount: mountNotFound };
  } else if (matchedRoute.protected && !isAuthenticated) {
    window.location.hash = '#/login';
    return;
  } else if (matchedRoute.guestOnly && isAuthenticated) {
    window.location.hash = '#/';
    return;
  }

  setState({ route: { name: matchedRoute.view, params } });

  const appOutlet = document.getElementById('app');
  appOutlet.innerHTML = matchedRoute.render(getState());
  matchedRoute.mount();
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}