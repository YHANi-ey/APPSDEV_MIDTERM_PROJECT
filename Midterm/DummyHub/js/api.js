import { getState } from './state.js';

const BASE_URL = 'https://dummyjson.com';

export async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const { accessToken } = getState().auth;

  if (auth && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const endpointUrl = auth ? `${BASE_URL}/auth${path}` : `${BASE_URL}${path}`;

  try {
    const res = await fetch(endpointUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `HTTP Request failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error on [${method} ${path}]:`, error.message);
    throw error;
  }
}


export const apiLogin = (credentials) => request('/users/login', { method: 'POST', body: credentials });
export const apiGetMe = () => request('/me', { method: 'GET', auth: true });
export const apiGetProducts = (params = '') => request(`/products${params}`);
export const apiGetProductById = (id) => request(`/products/${id}`);
export const apiGetCategories = () => request('/products/categories');
export const apiGetRecipes = (params = '') => request(`/recipes${params}`);
export const apiGetRecipeById = (id) => request(`/recipes/${id}`);
export const apiGetPosts = (params = '') => request(`/posts${params}`);
export const apiGetPostById = (id) => request(`/posts/${id}`);
export const apiGetCommentsByPost = (id) => request(`/posts/${id}/comments`);
export const apiAddComment = (commentData) => request('/comments/add', { method: 'POST', body: commentData });
export const apiGetUsers = (params = '') => request(`/users${params}`);
export const apiGetUserById = (id) => request(`/users/${id}`);
export const apiGetUserTodos = (userId) => request(`/users/${id}/todos`, { auth: true });
export const apiAddTodo = (todoData) => request('/todos/add', { method: 'POST', body: todoData });
export const apiUpdateTodo = (id, data) => request(`/todos/${id}`, { method: 'PUT', body: data });
export const apiDeleteTodo = (id) => request(`/todos/${id}`, { method: 'DELETE' });
export const apiGetRandomQuote = () => request('/quotes/random');