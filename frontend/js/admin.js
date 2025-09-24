function logout() {
    localStorage.removeItem('loggedIn');
    location.hash = '#login';
}
