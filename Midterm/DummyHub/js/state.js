const initialState = {
  auth: { user: null, accessToken: null, refreshToken: null },
  route: { name: 'dashboard', params: {}, query: {} },
  cart: [],
  shop: { status: 'idle', items: [], total: 0, page: 1, q: '', category: '', sortBy: '', order: 'asc', inStockOnly: false, error: null },
  recipes: { status: 'idle', items: [], total: 0, tag: '', mealType: '', difficulty: 'all', maxTime: '', error: null },
  community: { status: 'idle', items: [], skip: 0, total: 0, error: null },
  people: { status: 'idle', items: [], role: '', error: null },
  tasks: { status: 'idle', items: [], filter: 'all', error: null },
  dashboard: { status: 'idle', quote: null, cartSummary: null, todoSummary: null, postCount: 0, error: null }
};

let currentState = { ...initialState };
const listeners = new Set();

export function getState() {
  return currentState;
}

export function setState(patch) {
  currentState = {
    ...currentState,
    ...patch
  };
  listeners.forEach(listener => listener(currentState));
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}