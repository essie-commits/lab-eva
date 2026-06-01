import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword,
collection, signOut, addDoc, getDoc, getDocs, updateDoc, deleteDoc, setDoc, doc, query, where, onAuthStateChanged } from './firebase-config.js';

async function popUp(texto, cor) {

    let msg = document.getElementById('mensagem-flutuante');

    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'mensagem-flutuante';
        msg.style.position = 'fixed';
        msg.style.bottom = '20px';
        msg.style.right = '20px';
        msg.style.backgroundColor = cor;
        msg.style.color = 'white';
        msg.style.padding = '10px 20px';
        msg.style.borderRadius = '8px';
        msg.style.fontFamily = 'Arial';
        msg.style.zIndex = '999';
        document.body.appendChild(msg);
    }

    msg.textContent = texto;
    msg.style.backgroundColor = cor;
    msg.style.display = 'block';
    setTimeout(() => {
        msg.style.display = 'none';
    }, 3000);

}

async function cadastrarUsuario (email, senha, nome) {

    try {

        const usuario = await createUserWithEmailAndPassword(auth, email, senha);
        const uid = usuario.user.uid;

        await setDoc(doc(db, "usuarios", uid), {
            nome: nome,
            email: email
        });

        localStorage.setItem('nomeUsuario', nome);

        window.location.href = "jardim.html"

    } catch (error) {

        popUp('Não foi possível cadastrar o usuário!', '#e74c3c');
        console.error(error)

    }

};

async function fazerLogin (email, senha) {

    try {

        const usuario = await signInWithEmailAndPassword(auth, email, senha);

        const uid = usuario.user.uid;

        const docRef = doc(db, "usuarios", uid);
        
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const nome = docSnap.data().nome;

            localStorage.setItem('nomeUsuario', nome);

        } else {

            localStorage.setItem('nomeUsuario', 'visitante')

        }

        window.location.href = "jardim.html"

    } catch (error) {

        popUp('Não foi possível fazer login!', '#e74c3c')

    }

}

async function fazerLogoff() {

    try {

        await signOut(auth);
        
        localStorage.clear();

        window.location.href = "index.html"

    } catch (error) {

        popUp('Não foi possível fazer logoff!', '#e74c3c')

    }

}

async function salvarPlanta(nome, inicio, tipo, local, colheita) {

    const user = auth.currentUser;

    try {

        await addDoc(collection(db, "plantas"), {
            userId: user.uid,
            nome: nome,
            inicio: inicio,
            tipo: tipo,
            local: local,
            colheita: colheita

        })

    } catch (error) {

        popUp('Não foi possível cadastrar nova plantação!', '#e74c3c')
        console.log(error)
    }

}

async function buscarPlantas() {

    const user = auth.currentUser;

    const queryPlantas = query(collection(db, "plantas"), where("userId", "==", user.uid));

    const snap = await getDocs(queryPlantas);

    let lista = [];

    snap.forEach((d) => {
        lista.push({id: d.id, ...d.data()});
    });

    return lista

}

export { onAuthStateChanged, auth, db, doc, getDoc, updateDoc, deleteDoc, popUp, cadastrarUsuario, fazerLogin, fazerLogoff, salvarPlanta, buscarPlantas }