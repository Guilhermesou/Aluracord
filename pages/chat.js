import { Box, Button, Input, Text, IconButton, Avatar, Heading, OrderedList } from "@chakra-ui/react";
import { MdLogout, MdSend, MdOutlineDelete, AiFillHeart } from 'react-icons/md'
import { useEffect, useState } from "react";
import appConfig from '../config.json'
import { createClient } from "@supabase/supabase-js";
import MessageList from "../src/components/MessageList";
import { useRouter } from "next/router";
import { ButtonSendSticker } from '../src/components/ButtonSendSticker.js';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5MjI5MCwiZXhwIjoxOTU4OTY4MjkwfQ.qxUg6wh4zCx2eJZqnxnQsr9S2QxR_usBmee-l8hH-EA'
const SUPABASE_URL = 'https://trjwjshcnqalajssbxko.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function listenMessages(addNewMessage, removeMessage) {
    return supabaseClient
        .from('messages')
        .on('INSERT', (response) => {
            addNewMessage(response.new);
        })
        .on('DELETE', (messageDeleted) => {
            removeMessage(messageDeleted.new)
        })
        .subscribe();
}

export default function Chat() {



    /* 
        ------------|TODO|-------------- 
    
    
    [X] Desabilitar botão enviar caso input tenha 0 caracteres
    [X] Desabilitar envio de mensagem em branco
    [X] Colocar botão de apagar no lado
    [ ] Atualizar msgs quando deletar uma mensagem
    [ ] Colocar Quiz
    [ ] Colocar botão de likes
    [ ] Adicionar tela de profile do usuário logado
    [ ] Aprimorar Design e Responsividade
    [X] Colocar foto de usuário no header
    [X] Diminuir tamanho do stickers na lista de msg
    [X] Colocar ação no botão de Logout
    [ ] Verificar memory leaking na message list
    */
    const [mensagem, setMensagem] = useState('');
    const [messages, setmessages] = useState([
        //{
        //    id: 1,
        //    from: 'Guilhermesou',
        //    text: ':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_1.png'
        //}
    ]);

    const [isLoading, setIsLoading] = useState(true)
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true)

    const router = useRouter()
    const usuarioLogado = router.query.username



    useEffect(
        () => {
            supabaseClient
                .from('messages')
                .select('*')
                .order('id', { ascending: false })
                .then(({ data }) => {
                    setmessages(data)
                    setIsLoading(false)
                })
            listenMessages((newMessage, messageDeleted) => {

                setmessages((oldMessages) => {
                    return [
                        newMessage,
                        ...oldMessages
                    ]
                });
            });
        }, []
    )




    function handleNewMessage(newMessage) {

        const message = {
            //id: messages.length + 1,
            from: usuarioLogado,
            text: newMessage,
        }

        supabaseClient
            .from('messages')
            .insert([message])
            .then(() => { })
        setMensagem('');
    }

    async function handleDeleteMessage(messageIdToDelete) {
        await supabaseClient.from('messages').delete().match({ id: messageIdToDelete })
        setmessages(messages.filter((msg) => msg.id !== messageIdToDelete))


    }
    const handleChange = (event) => {

        const valor = event.target.value
        event.preventDefault
        if (valor.length > 0) {
            setIsSendButtonDisabled(false)
        }
        else {
            setIsSendButtonDisabled(true)
        }
        setMensagem(valor)
    }

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            backgroundColor={'#1A1A1A'}
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

                <Header usuarioLogado={usuarioLogado} router={router} />
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

                    <MessageList messagesData={messages} deleteFunction={handleDeleteMessage} loaded={isLoading} user={usuarioLogado} />

                    <Box
                        as="form"
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Input
                            
                            onKeyPress={(event) => {

                                if (event.key === 'Enter' && event.target.value.length > 0) {
                                    event.preventDefault();
                                    handleNewMessage(mensagem)
                                }

                            }}

                            onChange={
                                handleChange
                            }
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
                        <ButtonSendSticker onStickerClick={
                            (sticker) => {
                                handleNewMessage(`:sticker: ${sticker}`)
                            }
                        } />
                        <IconButton
                            icon={<MdSend />}
                            isDisabled={isSendButtonDisabled}
                            onClick={() => { handleNewMessage(mensagem) }}
                        />
                    </Box>

                </Box>

            </Box>
        </Box>
    );
}


function Header(props) {

    return (
        <>
            <Box
                width={'100%'}
                marginBottom={'16px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}

            >
                <Avatar src={`https://github.com/${props.usuarioLogado}.png`} />
                <Text textColor={appConfig.theme.colors.neutrals['000']}>
                    Chat
                </Text>
                <Button leftIcon={<MdLogout />} onClick={
                    (event) => {
                        event.preventDefault()
                        props.router.push(`/`)
                    }}>
                    Logout
                </Button>

            </Box>
        </>
    )
}
