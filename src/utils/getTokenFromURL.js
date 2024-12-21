// src/utils/getTokenFromURL.js
export const getTokenFromURL = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    return token ? decodeURIComponent(token) : null;
  };
  