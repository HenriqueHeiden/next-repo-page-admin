import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Toast from '../Toast';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const { user } = useAuth();
    const [isNotLogged, setTeste] = useState(false);
    function handleSubscribe() {
        if (!user) {
            setTeste(true);
        }
    }
    useEffect(() => {
        if (isNotLogged) {
            setTeste(false);
        }
    }, [isNotLogged])
    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Ver todos os  planos
            {isNotLogged && <Toast tpmsg={['success']} msg={'Você precisa realizar o login!'} />}
        </button>
    );
}