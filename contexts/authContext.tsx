import Router from 'next/router';
import { createContext, useState, useEffect } from 'react';
import firebase from '../lib/firebase';
import cookie from 'js-cookie';
import { collection, getDocs, query, where } from "firebase/firestore";

interface IContextProps {
    // dispatch: ({ type }: { type: string }) => void;
    user: any;
    perfil: any;
    carregarPerfil: any;
    setEmail: any;
    setSenha: any;
    loading: any;
    signin: any;
    signout: any;
    handleForgotPassword: any;
}

const AuthContext = createContext(
    {} as IContextProps
)

const formatUser: any = async (user: any) => ({
    uid: user.uid,
    email: user.email,
    token: user.token

})

interface userInterface {
    user: boolean;
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [senha, setSenha] = useState(null);
    const [loading, setLoading] = useState(true);
    const [perfil, setPerfil] = useState(['']);

    // useEffect(() => {
    //     if (user.uid) {
    //         carregarPerfil();
    //     }
    // }, [user]);

    const db = firebase.firestore();
    const handleUser = async (currentUser) => {
        if (currentUser) {
            debugger
            const formatedUser = await formatUser(currentUser);
            setUser(formatedUser);
            setSession(true);
            Router.push('/Post');
            return formatUser.email;
        }

        setUser(false);
        setSession(false);
        return false;
    }

    const setSession = (session) => {
        if (session) {
            cookie.set('HMSHARE', session, {
                expires: 1
            });
        } else {
            cookie.remove('HMSHARE');
        }
    }

    const signin = async () => {
        try {
            //debugger;
            setLoading(true);
            const response = await firebase
                .auth()
                .signInWithEmailAndPassword(email, senha);
            handleUser(response.user);
            console.log(perfil);
        } finally {
            setLoading(false);
        }
    }

    const carregarPerfil = async (data) => {
        if (data) {
            let perfil = [];
            const q = await query(collection(db, "influencer"), where("id", "==", data.uid));
            const querySnapshot = await getDocs(q);
            await querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(' carregarPerfil #########################');
                console.log(doc.id, " => ", doc.data());
                perfil.push(doc.data());
            });
            if (!perfil.length) {
                await createProfile(data);
            } else {
                await setPerfil(perfil);
            }
        }
    }

    const createProfile = async (data) => {
        if (data.uid) {
            await db.collection('influencer').add(
                {
                    email: data.email,
                    id: data.uid,
                    stripe_status: 'canceled'
                });
            carregarPerfil(data);
        }

    }

    const handleForgotPassword = () => {
        /*auth()
            .signInWithEmailAndPassword(email)
            .then(() => Alert.alert('Redefinir senha', "Enviamos um e-mail para vocÊ!"))
            .catch(error => console.log(error));*/
    }

    const signout = async () => {
        try {
            Router.push('/');
            await firebase.auth().signOut();
            handleUser(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
        return () => unsubscribe();
    }, [])

    return <AuthContext.Provider value={{
        user,
        perfil,
        carregarPerfil,
        setEmail,
        setSenha,
        loading,
        signin,
        signout,
        handleForgotPassword,
    }}>{children}</AuthContext.Provider>
};

export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;