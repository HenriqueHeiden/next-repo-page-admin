import { Box, Button, Divider, Flex, Heading, HStack, Icon, SimpleGrid, VStack, Input as InputChakra, Image, Text, Select } from "@chakra-ui/react";
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
import { cadastro } from "../../utils/linkDAO";
import axios from "axios";

type videoData = {
    id: string,
    title: string,
    thumbnail_url: string
}

export default function CreatePost() {
    const { user, perfil } = useAuth();

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [campoSelect, setCampoSelect] = useState('');

    const [thumbnail_url, setThumbnail_url] = useState('');
    const [success, setSuccess] = useState(false);
    const newPost = async (user, link, title, campoSelect) => {
        let body = JSON.stringify({
            email: user.email,
            title: title,
            link: link,
            tipoLink: campoSelect});

        var authOptions = {
            method: "post",
            url: 'http://localhost:3000/api/cadastro',
            data: body,
            headers: {
                "Content-Type": "application/json",
            },
            json: true,
        };

        axios(authOptions)
            .then((resp) => {
                debugger
                console.log("response :- ", resp);
            })
            .catch((error) => {
                alert(error);
            });
        clearInput();
    }

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
                            <Heading size="lg" fontWeight="normal">Criar Link</Heading>
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
                                            defaultValue={'site'}
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
                                    <Button colorScheme="cyan" onClick={() => newPost(
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