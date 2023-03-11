import { useToast, Wrap, WrapItem } from "@chakra-ui/react"

export default function Toast({tpmsg, msg}) {
    const toast = useToast()
    const statuses = tpmsg
    console.log(msg);
    /*['success', 'error', 'warning', 'info']*/
    //debugger;
    return (
        <Wrap>
            <WrapItem display="none">
                {toast({
                    title: `${msg}`,
                    status: statuses,
                    isClosable: true,
                })}
            </WrapItem>
        </Wrap>
    )
}