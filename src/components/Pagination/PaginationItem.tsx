import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
    isCurrent?: boolean;
    number: number
}
export function PaginationItem({ isCurrent = false, number }: PaginationItemProps) {

    if (isCurrent) {
        return (
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="cyan"
                disabled
                _disabled={{
                    bg: 'cyan.500',
                    cursor: 'default'
                }}
            >
                {number}
            </Button>
        )
    }

    return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            bg="gray.700"
            _disabled={{
                bg: 'cyan.500',
                cursor: 'default'
            }}

        >
            {number}
        </Button>
    );
}