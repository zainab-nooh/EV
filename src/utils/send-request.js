import { getToken } from './users-service';
export default async function sendRequest(url, method = 'GET', payload = null) {
  console.log(`Making ${method} request to: ${url}`);
  console.log('Payload:', payload);
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  console.log('Token:', token);
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, options);
    console.log('Response status:', res.status);
    console.log('Response ok:', res.ok);
    if (res.ok) {
      const data = await res.json();
      console.log('Response data:', data);
      return data;
    }
    // Get more detailed error information
    const errorText = await res.text();
    console.error('Error response:', errorText);
    throw new Error(`Request failed: ${res.status} ${res.statusText} - ${errorText}`);
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
}