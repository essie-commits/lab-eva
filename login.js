import { fazerLogin, popUp } from './back-end.js';

const mostrarSenha = document.getElementById('mostrarsenha');

const inputSenha = document.getElementById('login_senha');

mostrarSenha.addEventListener(`click`, () => {

    if (inputSenha.type === 'password') {

        inputSenha.type = 'text';

        mostrarSenha.textContent = 'Esconder'

    } else {

        inputSenha.type = 'password';

        mostrarSenha.textContent = 'Mostrar'

    }

});

document.getElementById('login').addEventListener(`submit`, async (e) => {

    e.preventDefault();

    const email = document.getElementById('login_email').value;

    const senha = document.getElementById('login_senha').value;

    try {

        await fazerLogin(email, senha);
    
    } catch (error) {

        popUp('Não foi possível fazer login!', '#e74c3c')

    }

});