import { GetStaticProps } from 'next';
import Head from 'next/head';
import useAuth from "../../hooks/useAuth";
import { Header } from '../components/Header';
import { Box, CircularProgress, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import { Sidebar } from '../components/SideBar';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getSeguidores } from '../../api/firestore';
import Planos from './Planos';
import { Loading } from '../components/Progress';
import { stripe } from '../services/stripe';
import { ApexOptions } from 'apexcharts';

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

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

// Client-sid
// Server-side
// Static Site Generation

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product, product2, product3 }: HomeProps) {
  const { user, perfil, signout, carregarPerfil } = useAuth();
  const [seguidores, setSeguidores] = useState<any[]>([]);
  const [datas, setDatas] = useState(['']);
  const [load, setLoad] = useState(true);
  const [datasTratada, setDatasTratadas] = useState(['']);
  const [qtdSeguidoresDia, setQtdSeguidoresDia] = useState([]);
  // const [perfil, setPerfil] = useState(['']);

  useEffect(() => {
    // getSeguidores(user, setSeguidores);
    carregarPerfil(user);
    // carregarPerfil(user, setPerfil);
    formatData();
  }, [user]);

  useEffect(() => {
    carregarMenu();
  }, [perfil]);



  useEffect(() => {
    console.log(seguidores);
    let valor = [];
    valor = [0, 0, 0, 0, 0, 0, 0];

    if (seguidores) {
      seguidores.map((res, index) => {
        let dt = new Date(res.Data.seconds);
        datas.map((res, index) => {
          if (new Date(res).getTime() === dt.getTime() * 1000) {
            valor[index] += 1;
          }
          console.log(new Date(res).getTime() === dt.getTime() * 1000);
        })
      });
      setQtdSeguidoresDia(valor);
      console.log(qtdSeguidoresDia);
    }
  }, [seguidores]);

  useEffect(() => {
    console.log(qtdSeguidoresDia);
    //debugger;

  }, [qtdSeguidoresDia]);

  const carregarMenu = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoad(false);
  }

  function formatData() {
    let data = new Date();
    let newDate = new Date(data);
    let resultado = [];
    let resultado2 = [];
    //debugger;
    for (let index = 1; index < 8; index++) {
      resultado.push(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate() - index}t00:00:00.000`);
      resultado2.push(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate() - index}`);
    }
    //debugger;
    setDatasTratadas(resultado);
    setDatas(resultado2);
  }
  const options : ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: theme.colors.gray[500],
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600]
      },
      axisTicks: {
        color: theme.colors.gray[600]
      },
      categories: datasTratada
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dar',
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    }
  };
  const series = [
    {
      name: 'series1', data: qtdSeguidoresDia
    }
  ]
  // let permission = perfil[0].stripe_status === 'active';
  let permission = true;
  return (
    <>
      <Head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie || !document.cookie.includes('HMSHARE')) {
                window.location.href = "/"
              }
            `,
          }}
        />
        <title>Inicio | HMSHARE</title>
      </Head>
      {permission ?
        <>
          {(<Flex direction={"column"} h="100vh">
            <Header />
            <Flex
              w="100%"
              my="6"
              maxWidth={1480}
              mx="auto"
              px="6"
            >

              <Sidebar />
              <SimpleGrid flex="1" gap="4" minChildWidth="320px">
                <Box
                  p={["6", "8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
                >
                  <Text fontSize="lg" mb="4" >Inscritos da semana</Text>
                  {load ? <Loading /> :
                    <Chart options={options} series={series} type="area" height={160} />}

                </Box>

                <Box
                  p={["6", "8"]}
                  bg="gray.800"
                  borderRadius={8}
                  pb="4"
                >
                  <Text fontSize="lg" mb="4" >Inscritos do mes</Text>
                  {load ? <Loading /> :
                    <Chart options={options} series={series} type="area" height={160} />}
                </Box>
              </SimpleGrid>
            </Flex>
          </Flex>)}
        </>
        :
        <>
          <Header />
          <Planos product={product} product2={product2} product3={product3} />
        </>
      }
      {/* <h1>Bem vindo: {user?.email}</h1> */}

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