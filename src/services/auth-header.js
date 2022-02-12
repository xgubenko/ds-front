export default function authHeader() {
    const token = localStorage.getItem('accessToken');
    if (token) {
        return {Authorization: 'Bearer ' + token}; // for Spring Boot back-end
    } else {
        return {};
    }
}
