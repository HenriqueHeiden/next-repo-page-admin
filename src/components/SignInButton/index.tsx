

import { FaCreativeCommonsShare } from 'react-icons/fa';
import { FiX } from 'react-icons/fi'
import useAuth from "../../../hooks/useAuth"
import { Flex, Button, HStack } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { Input } from '../Form/Input';
import { useForm } from 'react-hook-form';

export function SignInButton() {
    const { user, signin, setEmail, setSenha, signout } = useAuth();
    const { formState, handleSubmit } = useForm();

    console.log('User', user);

    const handleLogin = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        signin();
    }

    const isUserLoggedIn = user;

    return isUserLoggedIn ? (
        <button className={styles.signInButton}>
            <FaCreativeCommonsShare color="#04d361" />
            {user.email}
            <FiX color="#737380" className={styles.closeIcon}
                onClick={() => signout()} />
        </button>
    ) : (
        <Flex
            w="50vh"
            h="100vh"
            align="center"
            justify="right"
        >

            <Flex
                as="form"
                width="100%"
                maxWidth={390}
                h="auto"
                bg="gray.800"
                p="4"
                borderRadius={8}
                flexDir="row"
                marginTop="30"
                zIndex={1}
                ml="auto"
                onSubmit={handleSubmit(handleLogin)}
            >

                <HStack spacing="1">
                    <Input
                        name="emal"
                        type="email"
                        label="E-mail"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        name="senha"
                        type="password"
                        label="Senha"
                        onChange={event => setSenha(event.target.value)}
                    />
                    <Button type='submit' h="20" colorScheme="cyan" isLoading={formState.isSubmitting}>Logar</Button>
                </HStack>

            </Flex>
        </Flex>
    )
}