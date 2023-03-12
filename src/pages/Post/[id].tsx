import { Box, Button, Divider, Flex, Heading, HStack, Icon, SimpleGrid, VStack, Input as InputChakra, Image, Text, Select } from "@chakra-ui/react";
import Router from 'next/router';
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import Head from 'next/head';
import { Input } from "../../components/Form/Input";
import Link from "next/link";
import { setPost } from '../../../api/firestore';
import useAuth from '../../../hooks/useAuth';
import { RiFile4Line, RiSearchLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Question from '../../components/Question';
import Toast from "../../components/Toast";
import { Loading } from "../../components/Progress";
import { cadastro } from "../../utils/LinkDAO";
import axios from "axios";

export async function getServerSideProps(context) {
    const id = context.query.id;
    let body = JSON.stringify({
        id: id
    });
    let dados = [];

    var authOptions = {
        method: "post",
        url: `http://localhost:3000/api/consultaById`,
        data: body,
        headers: {
            "Content-Type": "application/json",
        },
        json: true,
    };
    const teste = await axios(authOptions);
    return {
        props: {
            dados: teste?.data,
            id: id
        }
    }
}

export default function EditPost(props) {
    const { user, perfil } = useAuth();
    debugger
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [campoSelect, setCampoSelect] = useState('');

    const [thumbnail_url, setThumbnail_url] = useState('');
    const [success, setSuccess] = useState(false);
    const editarPost = async (user, link, title, campoSelect) => {

        let body = JSON.stringify({
            id: props.id,
            email: user.email,
            customer: {
                title: title,
                link: link,
                tipoLink: campoSelect
            }
        });

        debugger

        var authOptions = {
            method: "post",
            url: 'http://localhost:3000/api/editarById',
            data: body,
            headers: {
                "Content-Type": "application/json",
            },
            json: true,
        };

        axios(authOptions)
            .then((resp) => {
                Router.push('/Post');
            })
            .catch((error) => {
                alert(error);
            });
        clearInput();
    }

    useEffect(() => {
        debugger
        if (props?.dados) {
            setLink(props.dados[0].link);
            setCampoSelect(props.dados[0].tipoLink)
            setTitle(props.dados[0].title)
        }
    }, [props])

    const clearInput = () => {
        title && setTitle('')
        link && setLink('')
    }

    let permission = true

    return (
        <>
            <Head>
                <script
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

                    {!permission ? <Loading /> :
                        <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
                            <Heading size="lg" fontWeight="normal">Editar</Heading>
                            <Divider my="6" borderColor="cyan.700" />
                            <VStack spacing="8">

                                {
                                    (campoSelect === 'outros' && false) &&

                                    <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                        <Flex
                                            as="label"
                                            flex="1"
                                            py="4"
                                            px="8"
                                            ml="6"
                                            maxWidth={400}
                                            alignSelf="center"
                                            color="gray.200"
                                            position="relative"
                                            bg="gray.800"
                                            borderRadius="full"
                                        >

                                            <InputChakra
                                                type="file"
                                                display="none"
                                                color="gray.50"
                                                variant="unstyled"
                                                _placeholder={{ color: 'gray.400' }}
                                            />
                                            {thumbnail_url && <Image src={thumbnail_url} alt='Dan Abramov' />}
                                            {!thumbnail_url && <Text> Imagem do link</Text>}
                                            {!thumbnail_url && <Icon as={RiFile4Line} ml="10" fontSize="50" color="cyan.500" />}

                                        </Flex>
                                    </SimpleGrid>
                                }

                                {
                                    campoSelect === 'outros' &&
                                    <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                        <Input name="title" label="Titulo do Link" value={title}
                                            onChange={event => setTitle(event.target.value)} />
                                    </SimpleGrid>
                                }

                                <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                                    <Input name="link" label="Link" value={link}
                                        onChange={event => setLink(event.target.value)} />

                                    <span>
                                        <p>Tipo de link</p>
                                        <Select style={{ background: "#171923" }} border="0" size="md" mt="2" h={10}
                                            onChange={event => setCampoSelect(event.target.value)}
                                            defaultValue={campoSelect}
                                            value={campoSelect}
                                        >
                                            <option style={{ background: "#171923" }} value='site'>Site</option>
                                            <option style={{ background: "#171923" }} value='facebook'>Facebook</option>
                                            <option style={{ background: "#171923" }} value='instagram'>Instagram</option>
                                            <option style={{ background: "#171923" }} value='tiktok'>TikTok</option>
                                            <option style={{ background: "#171923" }} value='whatsapp'>Whatsapp</option>
                                            <option style={{ background: "#171923" }} value='linkedin'>Linkedin</option>
                                            <option style={{ background: "#171923" }} value='github'>Github</option>
                                            <option style={{ background: "#171923" }} value='hotmart'>Hotmart</option>
                                            <option style={{ background: "#171923" }} value='braip'>Braip</option>
                                            <option style={{ background: "#171923" }} value='outros'>Outros</option>
                                        </Select>
                                    </span>
                                </SimpleGrid>
                            </VStack>
                            <Flex mt="8" justify="flex-end">
                                <HStack spacing="4">
                                    <Link href="/Post" passHref>
                                        <Button colorScheme="red">Cancelar</Button>
                                    </Link >
                                    <Button colorScheme="cyan" onClick={() => editarPost(
                                        user,
                                        link,
                                        title,
                                        campoSelect
                                    )}>Salvar</Button>
                                </HStack>
                            </Flex>
                        </Box>}

                </Flex>
                {success == true && <Toast tpmsg={['success']} msg={'Post cadastrado com sucesso!'} />}
            </Box >
        </>
    )
}