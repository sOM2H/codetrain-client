export default function authHeader() {
  const accessToken = JSON.parse(localStorage.getItem('access-token'));

  if (accessToken) {
    return { Authorization: 'Bearer ' + accessToken };
  } else {
    return {};
  }
}
