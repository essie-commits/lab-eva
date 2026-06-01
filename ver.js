import { db, doc, getDoc, updateDoc, popUp } from './back-end.js';

const url = new URLSearchParams(window.location.search);

const plantaId = url.get('id');

if (!plantaId) {

    popUp('Não é possível visualizar esta plantação.', '#e74c3c');

    setTimeout(() => { window.location.href = 'jardim.html'; }, 2000);

    throw new Error('ID não encontrado');

}

let editando = false;

let dadosOriginais = {};

async function carregarDados() {

    try {

        const docRef = doc(db, 'plantas', plantaId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            dadosOriginais = docSnap.data();

            document.getElementById('visualizar_descricao').value = dadosOriginais.nome || '';
            document.getElementById('visualizar_inicio').value = dadosOriginais.inicio || '';
            document.getElementById('visualizar_tipo').value = dadosOriginais.tipo || '';
            document.getElementById('visualizar_local').value = dadosOriginais.local || '';
            document.getElementById('visualizar_colheita').value = dadosOriginais.colheita || '';

        } else {

            popUp('Plantação não encontrada', '#e74c3c');

            setTimeout(() => { window.location.href = 'jardim.html'; }, 2000);

        }

    } catch (error) {

        console.error(error);
        popUp('Erro ao carregar dados', '#e74c3c');

    }

}

carregarDados();

const btnPrincipal = document.getElementById('visualizar_editar');

const btnVoltar = document.getElementById('visualizar_retornar');

function enableEditing(enable) {

    const inputs = ['visualizar_descricao', 'visualizar_inicio', 'visualizar_local', 'visualizar_colheita'];

    inputs.forEach(id => document.getElementById(id).readOnly = !enable);

    document.getElementById('visualizar_tipo').disabled = !enable;

}

btnPrincipal.addEventListener('click', async () => {

    if (!editando) {

        enableEditing(true);

        btnPrincipal.textContent = 'Salvar';

        editando = true;

    } else {

        const novosDados = {
            nome: document.getElementById('visualizar_descricao').value,
            inicio: document.getElementById('visualizar_inicio').value,
            tipo: document.getElementById('visualizar_tipo').value,
            local: document.getElementById('visualizar_local').value,
            colheita: document.getElementById('visualizar_colheita').value
        };
        
        if (JSON.stringify(novosDados) === JSON.stringify(dadosOriginais)) {
            
            enableEditing(false);

            btnPrincipal.textContent = 'Editar';

            editando = false;

            return;
        }

        try {

            const docRef = doc(db, 'plantas', plantaId);

            await updateDoc(docRef, novosDados);

            popUp('Plantação atualizada com sucesso!', '#2ecc71');

            
            await carregarDados(); 

            enableEditing(false);

            btnPrincipal.textContent = 'Editar';

            editando = false;

        } catch (error) {

            console.error(error);

            popUp('Erro ao editar plantação', '#e74c3c');

        }
    }
});

btnVoltar.addEventListener('click', () => {

    if (editando) {

        popUp('A edição foi interrompida. Estamos retornando ao Jardim...', '#e74c3c');
        
        window.location.href = "jardim.html";

    } else {

        window.location.href = "jardim.html";

    }
});