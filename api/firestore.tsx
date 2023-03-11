import firebase from '../lib/firebase';
import { collection, getDocs, query, where, updateDoc } from "firebase/firestore";


// eslint-disable-next-line import/no-anonymous-default-export

const db = firebase.firestore();

export const getSeguidores = async (user, setSeguidores) => {
    if (user) {
        //debugger;
        let seguidores = [];

        const seguidoresRef = db.collection('seguidores');
        console.log('seguidoresRef: ', seguidoresRef);

        // Today in timestamp.
        const today = new Date();
        today.setDate(today.getDate() - 7);// Todo: pametrizar aqui para tempos.
        console.log('today: ', today);

        //timestamp date to firebase query.
        const timestamp = firebase.firestore.Timestamp.fromDate(today);
        console.log('timestamp: ', timestamp);

        const querySnapshot = await seguidoresRef.where('seguindo', '==', 'rx26LWIQ7kZvZu5cj54o')
            .where('date', '>', timestamp).get();

        console.log('querySnapshot: ', querySnapshot);

        querySnapshot.forEach(doc => {
            console.log('LISTAGEM: ', doc.id, '=>', doc.data());
            seguidores.push(doc.data());
        });

        setSeguidores(seguidores);
    }
}

export const updatePerfil = async (user, stripe_custumer_id) => {
    const influencers = await db.collection('influencer');
    let result = await influencers.where("id", "==", user.uid).get();
    let id_doc = '';
    result.forEach((doc) => {
        id_doc = doc.id;
    });

    if (id_doc != '') {
        db.collection('influencer').doc(id_doc).update({
            stripe_custumer_id
        })
    }
}

export const getPerfilPerCustumerId = async (stripeCustumerId) => {
    let perfil = [];
    debugger;
    const q = query(collection(db, "influencer"),
        where("stripe_custumer_id", "==", stripeCustumerId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        perfil.push(doc.data(), { doc_id: doc.id });
    });
    return perfil;
}

export const updatePlan = async (
    user,
    subscription
) => {
    debugger;
    db.collection('influencer').doc(user[1].doc_id).update({
        stripe_subscriptionId: subscription.id,
        stripe_status: subscription.status,
        stripe_price_id: subscription.items.data[0].price.id,
    })
}


// export const carregarPerfil = async (user, setPerfil) => {
//     if (user) {
//         console.log('#########################');
//         console.log(user);
//         let perfil = [];
//         const q = query(collection(db, "influencer"), where("id", "==", user.uid));
//         const querySnapshot = await getDocs(q);
//         querySnapshot.forEach((doc) => {
//             // doc.data() is never undefined for query doc snapshots
//             console.log('#########################');
//             console.log(doc.id, " => ", doc.data());
//             perfil.push(doc.data());
//         });
//         if (!perfil.length) {
//             createProfile(user, setPerfil);
//         } else {
//             setPerfil(perfil);
//         }
//     }
// }

// export const createProfile = async (user, setPerfil) => {
//     await db.collection('influencer').add(
//         {
//             email: user.email,
//             id: user.uid,
//             plan: ''
//         });
//     carregarPerfil(user, setPerfil);
// }

export const getSorteio = async (user, setListSorteio) => {
    if (user) {
        let sorteios = [];

        const q = query(collection(db, "sorteio"),
            where("id_usuario", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            sorteios.push(doc.data());
        });

        //debugger;
        setListSorteio(sorteios);
    }
}

export const getPost = async (user, setPosts) => {
    if (user) {
        let posts = [];
        const q = query(collection(db, "Posts"), where("id_usuario", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            posts.push(doc.data());
        });
        setPosts(posts);
    }

}
export const setPost = async (user, title, campoSelect) => {
    let newPost = await db.collection('Posts').add(
        {
            id_usuario: user.uid,
            email: user.email,
            title: title,
            youtubeLink: youtube,
            facebook,
            instagram,
            tikTok,
            other,
            sorteio
        });
    return newPost;
}

export const sorteio = async (user, title, dateSorteio, hashSorteio) => {

    //debugger;
    let newSorteio = await db.collection('sorteio').add(
        {
            id_usuario: user.uid,
            email: user.email,
            title,
            dateSorteio,
            hashSorteio

        });
    return newSorteio;
}
