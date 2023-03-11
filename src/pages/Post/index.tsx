import { Box, Button, Checkbox, Flex, Heading, Icon, Image, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiEdit2Fill, RiFacebookBoxFill, RiFacebookBoxLine, RiInstagramFill, RiLinkedinBoxFill, RiPencilLine, RiSearchLine } from "react-icons/ri";
import { BsFacebook, BsInstagram, BsWhatsapp, BsLinkedin, BsFillRecord2Fill, BsHammer, BsAt, BsLink, BsGithub } from "react-icons/bs";
import { BiWorld } from 'react-icons/bi'
import { FaTiktok } from 'react-icons/fa'
import { AiFillFire } from 'react-icons/ai'

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import Head from 'next/head';
import { Pagination } from "../../components/Pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPost } from "../../../api/firestore";
import useAuth from "../../../hooks/useAuth";
import { Loading } from "../../components/Progress";
import axios from "axios";

export async function getServerSideProps(context) {
    const id = context.query.id;
    let body = JSON.stringify({
        email: 'henrique.heiden@gmail.com'
    });
    let dados = [];

    var authOptions = {
        method: "post",
        url: 'http://localhost:3000/api/consulta',
        data: body,
        headers: {
            "Content-Type": "application/json",
        },
        json: true,
    };
    const teste = await axios(authOptions);
    return {
        props: {
            dados: teste?.data
        }
    }
}


export default function PostLit(props) {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })
    const { user, perfil } = useAuth();
    const [posts, setPosts] = useState<any[]>([]);

    const [dados, setDados] = useState(props.dados)

    useEffect(() => {
        getPost(user, setPosts);
    }, []);

    useEffect(() => {
        if (user) {

            debugger
            let body = JSON.stringify({
                email: user?.email
            });

            var authOptions = {
                method: "post",
                url: 'http://localhost:3000/api/consulta',
                data: body,
                headers: {
                    "Content-Type": "application/json",
                },
                json: true,
            };

            axios(authOptions)
                .then((resp) => {
                    debugger
                    setDados(resp?.data)
                    console.log("response :- ", resp);
                })
                .catch((error) => {
                    alert(error);
                });
        }

    }, [])

    // useEffect(() => {
    //     if (dados) {
    //         debugger
    //     }
    // }, [dados])

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
            {!permission ? <Loading /> : <Box>
                <Header />
                <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                    <Sidebar />
                    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                        <Flex mb="8" justify="space-between" align="center">
                            <Heading size="lg" fontWeight="normal">Links</Heading>
                            <Link href="Post/Create" passHref>
                                <Button as="a" size="sm" colorScheme="telegram" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                                    Criar novo
                                </Button>
                            </Link>
                        </Flex>
                        <Table colorScheme="whiteAlpha">
                            <Thead>
                                <Tr>
                                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                        <Checkbox colorScheme="cyan" />
                                    </Th>
                                    <Th>Nome</Th>
                                    <Th>Tipo Link</Th>
                                    <Th>Link</Th>
                                    {isWideVersion && <Th>Data de cadastro</Th>}

                                    <Th width="8"></Th>
                                </Tr>


                            </Thead>
                            <Tbody>
                                {dados && dados.map((post) => {
                                    return (
                                        <>
                                            <Tr>
                                                <Td px={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="cyan" />
                                                </Td>
                                                <Td>
                                                    {
                                                        post.title && <Box>
                                                            <Text fontSize="sm" color="cyan.300">{post.title}</Text>
                                                        </Box>
                                                    }

                                                    {
                                                        !post.title &&
                                                        <Box>
                                                            <Text fontSize="sm" color="cyan.300">
                                                                <Icon as={
                                                                    post.tipoLink === 'facebook' && BsFacebook ||
                                                                    post.tipoLink === 'instagram' && BsInstagram ||
                                                                    post.tipoLink === 'tiktok' && FaTiktok ||
                                                                    post.tipoLink === 'whatsapp' && BsWhatsapp ||
                                                                    post.tipoLink === 'linkedin' && BsLinkedin ||
                                                                    post.tipoLink === 'github' && BsGithub ||
                                                                    post.tipoLink === 'hotmart' && AiFillFire ||
                                                                    post.tipoLink === 'braip' && BsHammer ||
                                                                    post.tipoLink === 'site' && BiWorld
                                                                } fontSize="20" color="cyan.500" />
                                                            </Text>
                                                        </Box>
                                                    }


                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Text fontWeight="bold">{post.tipoLink}</Text>
                                                    </Box>
                                                </Td>
                                                <Td>


                                                    <Box>
                                                        <Text fontWeight="bold"><a href={post.link} target="_blank" rel="noopener noreferrer">{post.link}</a></Text>
                                                    </Box>
                                                </Td>
                                                {isWideVersion &&
                                                    <Td>23 de Fevereiro de 2022</Td>
                                                }

                                                <Td>
                                                    <Link href={`Post/${post._id}`} passHref>
                                                        <Button as="a" size="sm" colorScheme="facebook" leftIcon={<Icon as={RiEdit2Fill} fontSize="20" />}>
                                                            Editar
                                                        </Button>
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        </>
                                    )
                                })}
                            </Tbody>
                        </Table>
                        <Pagination />
                    </Box>
                </Flex>
            </Box>}
        </>
    )
}