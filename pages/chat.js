import { Box, Button, Input, Text, Image, IconButton } from "@chakra-ui/react";
import { MdLogout, MdSend, MdOutlineDelete } from 'react-icons/md'
import { useState } from "react";
import appConfig from '../config.json'

export default function Chat() {


    /*
        --------------| Desafio |-------------

        [X] Colocar um botão de enviar
        [ ] Colocar um botão de deletar mensagem(Usar método filter)
    
    */

    const [mensagem, setMensagem] = useState('');
    const [messages, setmessages] = useState([])

    function handleNewMessage(newMessage) {
        const message = {
            id: messages.length + 1,
            from: 'Guilhermesou',
            text: newMessage,
        }
        setmessages([
            message,
            ...messages
        ]);
        setMensagem('');
    }

    function handleDeleteMessage(messageIdToDelete) {
        setmessages(messages.filter((msg) => msg.id !== messageIdToDelete))


    }

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            backgroundColor={'#1A1A1A'}
            backgroundImage={`url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`}
            backgroundRepeat={'no-repeat'}
            backgroundSize={'cover'}
            backgroundBlendMode={'multiply'}

        >
            <Box
                display={'flex'}
                flexDirection={'column'}
                flex={1}
                boxShadow={'0 2px 10px 0 rgb(0 0 0 / 20%)'}
                borderRadius={'5px'}
                backgroundColor={appConfig.theme.colors.neutrals[700]}
                height={'100%'}
                maxW={'95%'}
                maxH={'95vh'}
                padding={'32px'}

            >
                <Header />
                <Box
                    position={'relative'}
                    display={'flex'}
                    flex={1}
                    justifyContent={'flex-end'}
                    height={'80%'}
                    backgroundColor={appConfig.theme.colors.neutrals[700]}
                    flexDirection={'column'}
                    borderRadius={'5px'}
                    padding={'16px'}
                >

                    <MessageList messagesData={messages} deleteFunction={handleDeleteMessage}/>

                    <Box
                        as="form"
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Input
                            value={mensagem}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNewMessage(mensagem)
                                }
                            }}
                            onChange={(event) => {
                                const valor = event.target.value
                                setMensagem(valor)
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type={'textarea'}
                            width={'100%'}
                            border={'0'}
                            resize={'none'}
                            borderRadius={'5px'}
                            padding={'6px 8px'}
                            backgroundColor={appConfig.theme.colors.neutrals[800]}
                            mr={'12px'}
                            textColor={appConfig.theme.colors.neutrals[200]}
                        />
                        <IconButton
                            icon={<MdSend/>}
                            onClick={() => {handleNewMessage(mensagem)}}
                        />
                    </Box>

                </Box>

            </Box>
        </Box>
    );
}


function Header() {
    return (
        <>
            <Box
                width={'100%'}
                marginBottom={'16px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}

            >
                <Text textColor={appConfig.theme.colors.neutrals['000']}>
                    Chat
                </Text>
                <Button leftIcon={<MdLogout />} href="/">
                    Logout
                </Button>

            </Box>
        </>
    )
}

function MessageList(props) {
    
    
    return (
        <Box tag="ul"
            overflow={'auto'}
            display={'flex'}
            flex={1}
            flexDirection={'column-reverse'}
            textColor={appConfig.theme.colors.neutrals["000"]}
            marginBottom={'16px'}

        >
            {props.messagesData.map((message) => {
                return (
                    <Text
                        key={message.id}
                        borderRadius={'5px'}
                        tag={'li'}
                        padding={'6px'}
                        marginBottom={'12px'}
                        
                    >
                        <Box
                            marginBottom={'8px'}
                            display={'flex'}
                            flex={1}
                            flexDirection={'row'}
                            alignItems={'flex-end'}
                        >
                            <Image
                                width={'30px'}
                                height={'30px'}
                                borderRadius={'50%'}
                                display={'inline-block'}
                                marginRight={'9px'}
                                src={'https://github.com/Guilhermesou.png'}
                            />
                            <Text tag={'strong'}>
                                {message.from}
                            </Text>
                            <Text
                                fontSize={'10px'}
                                marginLeft={'8px'}
                                textColor={appConfig.theme.colors.neutrals[300]}
                                tag={"span"}
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <IconButton left={'67%'} colorScheme={'white'} icon={<MdOutlineDelete/>} onClick={() => {
                                props.deleteFunction(message.id)
                            }}/>
                        </Box>
                        {message.text}
                        
                    </Text>
                )
            })}

        </Box>
    )
}