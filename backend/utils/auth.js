export const getAuthToken = () => {
  return sessionStorage.getItem('authToken');
};

export const isAuthenticated = () => {
  return getAuthToken() !== null;
};
