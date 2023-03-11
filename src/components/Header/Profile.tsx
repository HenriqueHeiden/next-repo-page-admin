import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import useAuth from "../../../hooks/useAuth";


interface ProfleProps {
    showProfileData?: boolean
}
export function Profile({ showProfileData = true }: ProfleProps) {

    const { user } = useAuth();

    return (
        <Flex align="center">
            {showProfileData && (<Box mr="4" textAlign="right">
                {/* <Text>Henrique Heiden</Text> */}
                <Text color="cyan.300" fontSize="small">
                    {user.email}</Text>
            </Box>)}
            <Avatar size="md" name={user.email} />
        </Flex>
    );
}