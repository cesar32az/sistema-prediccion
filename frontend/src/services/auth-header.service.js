export const authHeader = () => {
  let token = localStorage.getItem('jwt');
  if (token) {
    return { 'x-access-token': token, 'Content-Type': 'application/json' };
  } else {
    console.log('No te has logueado');
  }
};
