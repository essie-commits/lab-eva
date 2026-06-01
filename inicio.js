const login = document.getElementById('inicio_login');

const cadastrar = document.getElementById('inicio_cadastrar');

login.addEventListener('click', (e) => {
    window.location.href = 'login.html'
});

cadastrar.addEventListener('click', (e) => {
    window.location.href = 'cadastro.html'
});
