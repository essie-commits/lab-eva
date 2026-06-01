import { fazerLogoff, popUp, buscarPlantas, doc, auth, onAuthStateChanged, deleteDoc, db} from './back-end.js';

const nome = localStorage.getItem('nomeUsuario');

const verNome = document.getElementById('jardim_usuario');

verNome.innerText = nome || 'Visitante';

const refresh = document.getElementById('jardim_recarregar');

refresh.addEventListener(`click`, (e) => {

    window.location.reload();

});

const jardim = document.getElementById('container_planta');

async function verJardim() {

    try {

        const plantas = await buscarPlantas();

        if (plantas.length === '0') {

            jardim.innerHTML = 'Você ainda não cadastrou uma plantação. Vamos lá!'
        
        } else {

            let planta = '';

            for (const p of plantas) {

                planta += `<h3>${p.nome}</h3>` + `${p.tipo} | ${p.inicio}` + `<button class="visualizar-planta" data-id="${p.id}">Visualizar</button>` + `<button class="excluir-planta" data-id="${p.id}">Excluir</button>`

            };

            jardim.innerHTML = planta

            document.querySelectorAll('.visualizar-planta').forEach(botao => {
            
            botao.addEventListener('click', (e) => {
                const id = botao.getAttribute('data-id');
                console.log(id);
                window.location.href = `ver.html?id=${id}`
            })
        })

            document.querySelectorAll('.excluir-planta').forEach(botao => {

                botao.addEventListener('click', async (e) => {

                    const id = botao.getAttribute('data-id');

                    try {

                        const plantaRef = doc(db, "plantas", id);

                        await deleteDoc(plantaRef);

                        popUp('Planta excluída com sucesso!', '#2ecc71');

                        verJardim();
                        
                    } catch (error) {

                        console.error(error);

                        popUp('Erro ao excluir planta!', '#e74c3c');

                    }
                });
            });

        }

    } catch (error) {

            popUp('Não foi possível visualizar as plantações!', '#e74c3c');

    }

}

onAuthStateChanged(auth, (user) => {

    if (user) {

        verJardim();

    } else {

        popUp('Não foi possível visualizar as plantações!', '#e74c3c');

    }

});

const logoff = document.getElementById('jardim_sair');

logoff.addEventListener(`click`, async (e) => {

    try {

        await fazerLogoff();

    } catch (error) {

        popUp('Não foi possível sair da conta!', '#e74c3c');

    }

})

const adicionar = document.getElementById('jardim_adicionar');

adicionar.addEventListener(`click`, async (e) => {

    window.location.href = "adicionar.html"

})