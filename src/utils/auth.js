export default function auth() {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('auth')) {
      return JSON.parse(localStorage.getItem('auth'));
    }
    return false;
  }
  return false;
}

export const getToken = () => {
  if (localStorage.getItem('access_token')) {
    return localStorage.getItem('access_token');
  }
  return false;
};
