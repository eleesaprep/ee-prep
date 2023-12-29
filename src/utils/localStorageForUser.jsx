export const saveUserToLocalStorage = (user, jwt) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('jwt', jwt);
};

export const getUserFromLocalStorage = () => JSON.parse(localStorage.getItem('user'));

export const getUserJwtFromLocalStorage = () => localStorage.getItem('jwt');

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
};
