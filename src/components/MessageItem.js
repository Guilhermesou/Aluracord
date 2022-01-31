import React, {memo, useEffect, useState} from 'react'
import { Avatar, Text, Box, IconButton, Tooltip, Image, SkeletonCircle, SkeletonText, Heading } from '@chakra-ui/react';
import appConfig from '../../config.json'
function MessageItem(props) {
    const message = props.message
    const data = new Date(message.created_at)
                const dataFormatada = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
                const horaFormatada = ((data.getHours())) + ":" + ((data.getMinutes()))
    return (
        <Text
                        key={message.id}
                        borderRadius={'5px'}
                        tag={'li'}
                        padding={'6px'}
                        marginBottom={'12px'}
                        _hover={{
                            background: appConfig.theme.colors.neutrals[800],
                        }}
                    >
                        
                        <Box
                            marginBottom={'10px'}
                            display={'flex'}
                            flex={1}
                            flexDirection={'row'}
                            alignItems={'flex-end'}
                        >
                            <Tooltip bg={'blackAlpha.900'} borderRadius={'xl'} label={<Profile username={message.from} />} placement="right">
                                <Avatar
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
                                {dataFormatada + ' às ' + horaFormatada}
                            </Text>

                        </Box>

                        {message.text.startsWith(':sticker:') ?
                            <Image maxW={'110px'} src={message.text.replace(':sticker:', '')} />
                            :
                            message.text
                        }



                        {  message.from === props.user &&
                            <IconButton padding={0} position={'relative'} float={'right'} colorScheme={'white'} icon={<MdOutlineDelete />} onClick={() => {
                                props.deleteFunction(message.id)
                            }} />}

                    </Text>
    );
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


export default memo(MessageItem);