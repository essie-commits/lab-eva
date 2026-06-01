import { cadastrarUsuario, popUp } from './back-end.js';

const inputSenha = document.getElementById('cadastro_senha');

const mostrarSenha = document.getElementById('mostrarsenha');

mostrarSenha.addEventListener(`click`, (e) => {

    if (inputSenha.type === 'password') {

        inputSenha.type = 'text';
        mostrarSenha.textContent = 'Esconder'

    } else {

        inputSenha.type = 'password';
        mostrarSenha.textContent = 'Mostrar'

    }

});

const inputConfirmar = document.getElementById('cadastro_confirmar');

const mostrarConfirmar = document.getElementById('mostrarconfirmar');

mostrarConfirmar.addEventListener(`click`, (e) => {

    if (inputConfirmar.type === 'password') {

        inputConfirmar.type = 'text';
        mostrarConfirmar.textContent = 'Esconder'

    } else {

        inputConfirmar.type = 'password';
        mostrarConfirmar.textContent = 'Mostrar'

    }

});

document.getElementById('cadastro').addEventListener(`submit`, async (e) => {

    e.preventDefault();

    const nome = document.getElementById('cadastro_nome').value;
    const email = document.getElementById('cadastro_email').value;
    const senha = document.getElementById('cadastro_senha').value;
    const confirmar = document.getElementById('cadastro_confirmar').value;

    if (senha !== confirmar) {

        popUp('Senhas divergentes!', '#e74c3c');
        
        return

    };

    try {

        await cadastrarUsuario(email, senha, nome)

    } catch (error) {

        popUp('Não foi possível completar este cadastro!', '#e74c3c');

    }

})
