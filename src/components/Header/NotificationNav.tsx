import { HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export function NotificationNav() {
    return (
        <HStack
            spacing={["4", "8"] }
            mx={["4", "8"] }
            pr={["4", "8"] }
            py="1"
            color="cyan.300"
            borderRightWidth={1}
            borderColor="cyan.700"
        >
            <Icon as={RiNotificationLine} fontSize="20" />
            <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>
    );
}