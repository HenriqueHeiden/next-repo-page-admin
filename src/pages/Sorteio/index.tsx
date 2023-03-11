import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/SideBar";
import Head from 'next/head';
import { Pagination } from "../../components/Pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSorteio } from "../../../api/firestore";
import useAuth from "../../../hooks/useAuth";
import Planos from "../Planos";


export default function PostLit() {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const { user, perfil } = useAuth();
    const [listSorteio, setListSorteio] = useState<any[]>([]);

    useEffect(() => {
        getSorteio(user, setListSorteio);
    }, []);

    let permission = perfil[0].stripe_status === 'active';

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
                    <Box>
                        <Header />
                        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                            <Sidebar />
                            <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                                <Flex mb="8" justify="space-between" align="center">
                                    <Heading size="lg" fontWeight="normal">Posts</Heading>
                                    <Link href="Post/Create" passHref>
                                        <Button as="a" size="sm" colorScheme="telegram" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                                            Criar novo
                                        </Button>
                                    </Link>
                                </Flex>
                                <Text>Teste</Text>
                                {listSorteio && listSorteio.map(sorteios => {
                                    return (
                                        <>
                                            <Text>{sorteios.title}</Text>
                                        </>
                                    )
                                })}
                                <Table colorScheme="whiteAlpha">
                                    <Thead>
                                        <Tr>
                                            <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                                <Checkbox colorScheme="cyan" />
                                            </Th>
                                            <Th>Post</Th>
                                            {isWideVersion && <Th>Data de cadastro</Th>}
                                            <Th width="8"></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {listSorteio && listSorteio.map(sorteio => {
                                            return (
                                                <>
                                                    <Tr>
                                                        <Td px={["4", "4", "6"]}>
                                                            <Checkbox colorScheme="cyan" />
                                                        </Td>
                                                        <Td>
                                                            <Box>
                                                                <Text fontWeight="bold">{sorteio.title}</Text>
                                                                <Text fontSize="sm" color="cyan.300"></Text>
                                                            </Box>
                                                        </Td>
                                                        {isWideVersion &&
                                                            <Td>{sorteio.dateSorteio}</Td>
                                                        }
                                                        <Td>
                                                            <Button as="a" size="sm" colorScheme="facebook" leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                                                                {isWideVersion ? 'Editar' : ''}
                                                            </Button>
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
                    </Box>
                </>
                :
                <>
                    <Header />
                    <Planos />
                </>
            }
        </>
    )
}