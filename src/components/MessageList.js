import { Avatar, Text, Box, IconButton, SkeletonCircle, SkeletonText, Tooltip, Image } from '@chakra-ui/react';
import  React, { memo } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import appConfig from '../../config.json';
import MessageItem from './MessageItem'
function MessageList(props) {
    const test = (event) => event.preventDefault()
    
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

                <Box
                    fontSize={'2xl'}
                    position={'relative'}

                    textColor={'#9AA5B1'}
                    textAlign={'center'}
                    _hover={{
                        background: appConfig.theme.colors.neutrals[200],
                    }}
                >
                    <Text fontSize={'8xl'}>
                        😕
                    </Text>
                    Parece que não tem nenhuma mensagem
                </Box>
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

                    <MessageItem message={message}/>
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

        <Box p={'10px'} >
            <Avatar size={2} src={profileData.avatar_url} />
            <Heading>{profileData.login}</Heading>
            <Text>Repositórios: {profileData.public_repos}</Text>
            <Text>Seguidores: {profileData.followers}</Text>
            <Text>Seguindo: {profileData.following}</Text>
        </Box>
    )
}

export default MessageList