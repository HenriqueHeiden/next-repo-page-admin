import { Box, Button, Divider, Flex, Heading, HStack, Icon, SimpleGrid, VStack, Input as InputChakra, Image, Text } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import Head from 'next/head';
import { Input } from "../../components/Form/Input";
import Link from "next/link";
import { sorteio } from '../../../api/firestore';
import useAuth from '../../../hooks/useAuth';
import { RiFile4Line, RiSearchLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Question from '../../components/Question';
import Toast from "../../components/Toast";
import { Loading } from "../../components/Progress";

type videoData = {
    id: string
    title: string
    thumbnail_url: string
}

export default function CreatePost() {
    const { user, perfil } = useAuth();
    const [title, setTitle] = useState('');
    const [thumbnail_url, setThumbnail_url] = useState('');
    const [success, setSuccess] = useState(false);

    const [dateSorteio, setDateSorteio] = useState('');
    const [hashSorteio, setHashSorteio] = useState('');
    const [dadosVideo, setDadosVideo] = useState<videoData[]>([]);


    const newSorteio = (user, title, dateSorteio, hashSorteio) => {
        sorteio(user, title, dateSorteio, hashSorteio).then(() => {
            setSuccess(true);
        }).catch(() => {
            setSuccess(false);
        })
    }

    let permission = true;

    //debugger;
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
            <Box>
                <Header />
                <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                    <Sidebar />
                    {!permission ? <Loading />
                        :
                        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
                            <Heading size="lg" fontWeight="normal">Criar novo sorteio</Heading>
                            <Divider my="6" borderColor="cyan.700" />
                            <VStack spacing="8">
                                <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">

                                    <Flex as="label" flex="1" py="4" px="8" ml="6" maxWidth={400} alignSelf="center"
                                        color="gray.200" position="relative" bg="gray.800" borderRadius="full">
                                        <InputChakra
                                            type="file"
                                            display="none"
                                            color="gray.50"
                                            variant="unstyled"
                                            _placeholder={{ color: 'gray.400' }}
                                        />
                                        {thumbnail_url && <Image src={thumbnail_url} alt='Dan Abramov' />}
                                        {!thumbnail_url && <Text> Imagem do post</Text>}
                                        {!thumbnail_url && <Icon as={RiFile4Line} ml="10" fontSize="50" color="cyan.500" />}

                                    </Flex>
                                </SimpleGrid>

                                <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                    <Input name="name" label="Titulo do Sorteio" value={title}
                                        onChange={event => setTitle(event.target.value)} />

                                    <Input type="date" name="name" label="Data do sorteio" value={dateSorteio}
                                        onChange={event => setDateSorteio(event.target.value)} />
                                </SimpleGrid>

                                <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                    <Input name="sorteio" label="# do sorteio" value={hashSorteio}
                                        onChange={event => setHashSorteio(event.target.value)} />
                                </SimpleGrid>
                            </VStack>
                            <Flex mt="8" justify="flex-end">
                                <HStack spacing="4">
                                    <Link href="/Post" passHref>
                                        <Button colorScheme="red">Cancelar</Button>
                                    </Link >
                                    <Button colorScheme="cyan" onClick={() => newSorteio(
                                        user,
                                        title,
                                        dateSorteio,
                                        hashSorteio
                                    )}>Salvar</Button>
                                </HStack>
                            </Flex>
                        </Box>
                    }
                </Flex>
                {success == true && <Toast tpmsg={['success']} msg={'Post cadastrado com sucesso!'} />}
            </Box >
        </>
    )
}