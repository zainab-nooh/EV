import sendRequest from './send-request';

const BASE_URL = '/api/categories';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function create(categoryData) {
  return sendRequest(BASE_URL, 'POST', categoryData);
}

export function update(id, categoryData) {
  return sendRequest(`${BASE_URL}/${id}`, 'PUT', categoryData);
}

export function deleteCategory(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}