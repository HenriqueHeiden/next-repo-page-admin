import { Stack } from "@chakra-ui/react";
import Router from "next/router";
import { RiAccountBoxFill, RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection title="Geral">
                <NavLink icon={RiAccountBoxFill} href={'/Post'}>Links</NavLink>
                <NavLink icon={RiAccountBoxFill} href={'/Post/Create'}>Cadastrar novo link</NavLink>
                <NavLink icon={RiAccountBoxFill} href={'/Post/Create'}>Analytics</NavLink>
            </NavSection>
        </Stack>
    );

}