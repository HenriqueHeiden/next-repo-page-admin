import { GetStaticProps } from 'next';
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { SiHive, SiMarketo, SiMicrosoft } from 'react-icons/si'
import useAuth from '../../../hooks/useAuth'
import { ActionButton } from '../../components/Planos/ActionButton'
import { PricingCard } from '../../components/Planos/PricingCard'
import { stripe } from '../../services/stripe';


// Client-sid
// Server-side
// Static Site Generation

export default function Planos(product) {
  debugger;
  return (
    <Box
      as="section"

      py="14"
      px={{ base: '4', md: '8' }}
    >
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={{ base: '8', lg: '0' }}
        maxW="7xl"
        mx="auto"
        justifyItems="center"
        alignItems="center"
      >
        <PricingCard
          data={{
            price: product?.product?.amount,
            name: 'Iniciante',
            followers: '500',
            features: [
              'Para até 15 mil de seguidores',
              '1 post por dia',
              '450 mil notificações por mes',
              '10 sorteios por mes'
            ],
          }}
          icon={SiMicrosoft}
          button={<ActionButton product={product?.product?.priceId}>Assinar</ActionButton>} /><PricingCard
          zIndex={1}
          isPopular
          transform={{ lg: 'scale(1.05)' }}
          data={{
            price: product?.product2?.amount,
            name: 'Avançado',
            followers: '500',
            features: [
              'Para até 250 mil de seguidores',
              '1 post por dia',
              '7.500 milhões notificações por mes',
              '20 sorteios por mes'
            ],
          }}
          icon={SiHive}
          button={<ActionButton product={product?.product2?.priceId}>Assinar</ActionButton>} /><PricingCard
          data={{
            price: product?.product3?.amount,
            name: 'Pro',
            followers: '500',
            features: [
              'Para até 1 milhão de seguidores',
              '1 post por dia',
              '30 milhões notificações por mes',
              '30 sorteios por mes'
            ],
          }}
          icon={SiMarketo}
          button={<ActionButton product={product?.product3?.priceId}>Assinar</ActionButton>}
        />
      </SimpleGrid>
    </Box>
  )
}
/*Head Deve ser definidos as metas de SEO*/

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KULc3CO5khUb3DNcMaDMZmb', {
    expand: ['product']
  });

  const price2 = await stripe.prices.retrieve('price_1KULc3CO5khUb3DNMFIDG40A', {
    expand: ['product']
  });

  const price3 = await stripe.prices.retrieve('price_1Kh52KCO5khUb3DNS12sbGzZ', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount / 100),
  };

  const product2 = {
    priceId: price2.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price2.unit_amount / 100),
  };

  const product3 = {
    priceId: price3.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price3.unit_amount / 100),
  };

  return {
    props: {
      product,
      product2,
      product3
    },
    revalidate: 60 * 60 * 24, // 24 hrs
  }
}