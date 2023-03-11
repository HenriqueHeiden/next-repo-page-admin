import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';
import { Header } from '../components/Header';
import Planos from './Planos';

// Client-sid
// Server-side
// Static Site Generation

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }

  product2: {
    priceId: string;
    amount: number;
  }
  product3: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product, product2, product3 }: HomeProps) {
  return (
    <>
      <Header />
      <Head>
        <title>Inicio | HMSHARE</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Bem vindo </span>
          <h1> <span>HMSHARE</span></h1>
          <p>
            Avisamos o seu publico <br />
            a cada conteudo novo! <br />
            <span> Por apenas {product.amount} mes</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="HMSHARE" />
      </main>

      <Planos product={product}  product2={product2} product3={product3}/>
    </>
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