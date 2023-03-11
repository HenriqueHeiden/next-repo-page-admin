import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'
import { useRef, useState } from "react"

export default function Question({ setValue, msg }) {
    const [isOpen, setIsOpen] = useState(true)
    const onClose = () => setIsOpen(false)
    const setValN = () => {
        setValue(false);
        onClose();
    }
    const setValY = () => {
        setValue(true);
        onClose();
    }
    const yesRef = useRef();

    //debugger;
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={yesRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent bg="gray.800">
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Atenção
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {msg}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme='red' onClick={setValN}>
                                Não
                            </Button>
                            <Button ref={yesRef} colorScheme='cyan' onClick={setValY} ml={3}>
                                Sim
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}