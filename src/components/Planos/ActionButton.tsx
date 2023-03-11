import { Button, ButtonProps } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

import useAuth from '../../../hooks/useAuth';
import Toast from '../../components/Toast';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

interface HomeProps {
  ButtonProps,
  product: {
    priceId: string;
    amount: number;
  }
}


export function ActionButton(product) {
  const { user, perfil } = useAuth();
  const [isNotLogged, setTeste] = useState(false);
  const priceId = product.product;
  async function handleSubscribe() {
    if (!user) {
      setTeste(true);
      return;
    }
    try {
      const response = await api.post('/subscribe', { params: { user, perfil, priceId } })
      const { sessionId } = response.data;
      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message);
    }
  }
  useEffect(() => {
    if (isNotLogged) {
      setTeste(false);
    }
  }, [isNotLogged])

  return (
    <Button
      colorScheme="blue"
      size="lg"
      w="full"
      fontWeight="extrabold"
      onClick={handleSubscribe}
      py={{ md: '8' }}      
    >
      Assinar
      {isNotLogged && <Toast tpmsg={['success']} msg={'Você precisa realizar o login!'} />}
    </Button>
  );
}
