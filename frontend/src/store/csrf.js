import Cookies from 'js-cookie';

// Fetch and restore the CSRF token
export async function restoreCSRF() {
  try {
    const response = await csrfFetch('/api/csrf/restore');
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to restore CSRF token');
  } catch (error) {
    console.error('Error restoring CSRF token:', error);
    throw error;
  }
}


export async function csrfFetch(url, options = {}) {
  // Default method to 'GET' if not specified
  options.method = options.method || 'GET';
  
  // Default headers to an empty object if not specified
  options.headers = options.headers || {};

  // Set headers for non-GET requests
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  try {
    const response = await window.fetch(url, options);

    // Handle non-2xx responses
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Network response was not ok');
    }

    return response;
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error; 
  }
}
