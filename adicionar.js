import { salvarPlanta, popUp, auth, onAuthStateChanged } from "./back-end.js";

const addPlanta = document.getElementById('adicionar');

const verJardim = document.getElementById('adicionar_retornar');

verJardim.addEventListener(`click`, (e) => {

    window.location.href = "jardim.html"

});

addPlanta.addEventListener(`submit`, async (e) => {

    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {

        popUp('Não foi possível cadastrar nova plantação!', '#e74c3c');
        return

    } else {

    let nome = document.getElementById('adicionar_descricao').value;
    let inicio = document.getElementById('adicionar_inicio').value;
    let tipo = document.getElementById('adicionar_tipo').value;
    let local = document.getElementById('adicionar_local').value;
    let colheita = document.getElementById('adicionar_colheita').value;

    try {
        
        await salvarPlanta(nome, inicio, tipo, local, colheita);
        popUp('Parabéns, sua plantação foi registrada!', '#64e73c');

    } catch (error) {
    
        console.error(error);
        popUp('Erro ao salvar a planta. Tente novamente.', '#e74c3c');
    
    }

    }

})