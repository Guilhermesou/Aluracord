import { Box, Button, Input, Text, Image, IconButton, SkeletonCircle, SkeletonText, Tooltip, Avatar, Heading } from "@chakra-ui/react";
import { MdLogout, MdSend, MdOutlineDelete } from 'react-icons/md'
import { useEffect, useState } from "react";
import appConfig from '../config.json'
import { createClient } from "@supabase/supabase-js";
import 'react-loading-skeleton'
import { useRouter } from "next/router";
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM5MjI5MCwiZXhwIjoxOTU4OTY4MjkwfQ.qxUg6wh4zCx2eJZqnxnQsr9S2QxR_usBmee-l8hH-EA'
const SUPABASE_URL = 'https://trjwjshcnqalajssbxko.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function listenMessages(addNewMessage) {
    return supabaseClient
        .from('messages')
        .on('INSERT', (response) => {
            addNewMessage(response.new);
        })
        .subscribe();
}

export default function Chat() {


    /*
        --------------| Desafio Aula 3|-------------

        [X] Colocar um botão de enviar
        [X] Colocar um botão de deletar mensagem(Usar método filter)
    
    */
    /*
        --------------| Desafio Aula 4|-------------

        [X] Colocar loading (skelleton de preferencia)
        [ ] Colocar mouse hover na imagem de perfil do usuário (Rosto maior, link github, quantos repositórios)

    */

    /*
        --------------| Desafio Aula 5|-------------

        [ ] Poderia Colocar um botão de enquete, quiz.... **
        

    */

    //Todo = [Desabilitar botão enviar caso input tenha 0 caracteres ]

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
                .then(({ data }) => {
                    setmessages(data)
                    setIsLoading(false)
                })
            listenMessages((newMessage) => {
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
            .then(() => {})
        setMensagem('');
    }

    async function handleDeleteMessage(messageIdToDelete) {
        await supabaseClient.from('messages').delete().match({ id: messageIdToDelete })
        //setmessages(messages.filter((msg) => msg.id !== messageIdToDelete))


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

                    <MessageList messagesData={messages} deleteFunction={handleDeleteMessage} loaded={isLoading} />

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
                                if (valor.length > 0) {
                                    setIsSendButtonDisabled(false)
                                }
                                else {
                                    setIsSendButtonDisabled(true)
                                }
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
    console.log("Carregando? ", props.messagesData)
    const messages = props.messagesData
    if (props.loaded) {
        return (
            <>
                <Box mb={'20px'}>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={3} spacing='3' />
                </Box>
                <Box mb={'20px'}>
                    <SkeletonCircle size='10' />
                    <SkeletonText mt='4' noOfLines={3} spacing='3' />
                </Box>
            </>
        )
    }
    if (messages.length === 0) {
        return (
            <Box
                display={'flex'}
                flex={1}
                justifyContent={'center'}
                alignItems={'center'}
            >

                <Text
                    fontSize={'2xl'}
                    position={'relative'}

                    textColor={'#9AA5B1'}
                    textAlign={'center'}

                >
                    <Text fontSize={'8xl'}>
                        😕
                    </Text>
                    Parece que não tem nenhuma mensagem
                </Text>
            </Box>
        )
    }
    return (

        <Box tag="ul"
            overflow={'auto'}

            display={'flex'}
            flex={1}
            flexDirection={'column-reverse'}
            textColor={appConfig.theme.colors.neutrals["000"]}
            css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#0A0A0A',
                  borderRadius: '24px',
                },
              }}

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
                            marginBottom={'10px'}
                            display={'flex'}
                            flex={1}
                            flexDirection={'row'}
                            alignItems={'flex-end'}
                        >
                            <Tooltip label={<Profile username={message.from} />} placement="right">
                                <Image
                                    width={'45px'}
                                    height={'45px'}
                                    borderRadius={'50%'}
                                    display={'inline-block'}
                                    marginRight={'9px'}
                                    src={`https://github.com/${message.from}.png`}
                                />
                            </Tooltip>

                            <Text tag={'strong'} >
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
                            <IconButton position={'relative'} right={'0'} colorScheme={'white'} icon={<MdOutlineDelete />} onClick={() => {
                                props.deleteFunction(message.id)
                            }} />
                        </Box>
                        {message.text.startsWith(':sticker:') ?
                            <Image maxW={'md'} src={message.text.replace(':sticker:', '')} />
                            :
                            message.text
                        }


                    </Text>
                )
            })

            }

        </Box >
    )
}

function Profile(props) {
    const [profileData, setProfileData] = useState('')

    useEffect(
        () => {
            fetch(`https://api.github.com/users/${props.username}`)
                .then(async (data) => {
                    const response = await data.json()
                    setProfileData(response)
                })
        }, []
    )

    console.log('profile: ', profileData)
    if (!profileData) {
        return (
            <Box mb={'20px'}>
                <SkeletonCircle size='10' />
                <SkeletonText mt='4' noOfLines={3} spacing='3' />
            </Box>
        )
    }
    return (

        <Box p={'10px'}>
            <Avatar src={profileData.avatar_url} />
            <Heading>{profileData.login}</Heading>
            <Text>Repositórios: {profileData.public_repos}</Text>
            <Text>Seguidores: {profileData.followers}</Text>
            <Text>Seguindo: {profileData.following}</Text>
        </Box>
    )
}