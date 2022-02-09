export default function authHeader() {
  const token = localStorage.getItem('accessToken');
  // if (user && user.accessToken) {
  if (token) {
    return { Authorization: 'Bearer ' + token }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}
