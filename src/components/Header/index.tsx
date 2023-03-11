import { Button, Flex, Icon, IconButton, Text, useBreakpointValue, } from '@chakra-ui/react';
import useAuth from '../../../hooks/useAuth';
import { Logo } from './Logo';
import { NotificationNav } from './NotificationNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

import { useSidebarDrawer } from '../../../contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';
import { SignInButton } from '../SignInButton';

export function Header() {

    const { onOpen } = useSidebarDrawer();
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    });
    const { user, signin, setEmail, setSenha, signout } = useAuth();
    const isUserLoggedIn = user;

    const handleSignout = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        signout();
    }


    return (
        isUserLoggedIn ? (
            <Flex
                as="header"
                w="100%"
                maxWidth={1480}
                h="20"
                mx="auto"
                mt="4"
                px="6"
                align="center"
            >

                <Logo />
                {isWideVersion && (<SearchBox />)}
                <Flex
                    align="center"
                    ml="auto"
                >

                    <NotificationNav />
                    <Profile showProfileData={isWideVersion} />
                    <NotificationNav />
                    <Button bg={'gray.900'} onClick={() => handleSignout()}>
                        Sair
                    </Button>

                </Flex>
            </Flex >
        ) : (
            <Flex
                as="header"
                w="100%"
                maxWidth={1480}
                h="20"
                mx="auto"
                mt="4"
                px="6"
                align="center"
            >
                <Logo />
                {/* <Flex
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
                  
                    <Icon as={RiSearchLine} fontSize="20" color="cyan.500" />
                </Flex> */}

                <Flex
                    align="center"
                    ml="auto"
                >
                    <SignInButton />
                </Flex>
            </Flex>
        )
    );
}