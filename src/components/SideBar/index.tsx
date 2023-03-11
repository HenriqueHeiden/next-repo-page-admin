import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../../contexts/SidebarDrawerContext";
import useAuth from "../../../hooks/useAuth";
import { Loading } from "../Progress";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
    const { perfil } = useAuth();
    const { isOpen, onClose } = useSidebarDrawer();
    const isDrawerSideBar = useBreakpointValue({
        base: true,
        lg: false
    })
    let permission = true;
    if (isDrawerSideBar) {
        return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent bg="gray.800" p="4">
                        <DrawerCloseButton mt="6" />
                        <DrawerHeader>Navegação</DrawerHeader>
                        <DrawerBody>
                            {!permission  ? <Loading /> :
                                <SidebarNav />}
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        );
    }
    return (
        <Box as="aside" w="64" mr="8">
            {!permission  ? <Loading /> :
                <SidebarNav />}
        </Box>
    )
}