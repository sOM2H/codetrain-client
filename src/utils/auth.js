export const authHeader = ()  => {
  const accessToken = JSON.parse(localStorage.getItem('access-token'));

  if (accessToken) {
    return { Authorization: 'Bearer ' + accessToken };
  } else {
    return {};
  }
}

export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  const accessToken = localStorage.getItem("access-token");
  return user && accessToken;
}
