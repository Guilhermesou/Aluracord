import React from 'react';
import { Box, IconButton, Text, Image } from '@chakra-ui/react';
import appConfig from '../../config.json';
import { MdGif } from 'react-icons/md';

export function ButtonSendQuiz(props) {
    const [isOpen, setOpenState] = React.useState('');
    //Quando passar por cima dos Stikers colocar hover

    return (
        <Box

            position='relative'
            
        >
            <IconButton

                borderRadius='50%'
                //padding='0 3px 0 0'
                minWidth='40px'
                minHeight='40px'
                marginRight={'10px'}
                                
                lineHeight='0'
                display='flex'
                alignItems='center'
                justifyContent='center'
                backgroundColor={appConfig.theme.colors.neutrals[200]}
                //filter={isOpen ? 'grayscale(0)' : 'grayscale(1)'}
                //hover={
                //    filter = 'grayscale(0)'
                //}
                
                icon={<MdGif size={'sm'}/>}
                onClick={() => setOpenState(!isOpen)}
            />
            {isOpen && (
                <Box

                    display='flex'
                    flexDirection='column'
                    borderRadius='20px'
                    position='absolute'
                    backgroundColor={appConfig.theme.colors.neutrals[800]}
                    width={'300px'}
                    maxW={'3xl'}
                    height='300px'
                    right='30px'
                    bottom='40px'
                    padding='16px'
                    boxShadow='rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px'

                    onClick={() => setOpenState(false)}
                    
                >
                    <Text

                        color={appConfig.theme.colors.neutrals["000"]}
                        fontWeight='bold'

                    >
                        Stickers
                    </Text>
                    <Box
                        tag="ul"

                        display='flex'
                        flexWrap='wrap'
                        justifyContent='space-between'
                        flex={1}
                        paddingTop='16px'
                        overflow='scroll'
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
                        {appConfig.stickers.map((sticker) => (
                            <Text
                                onClick={() => {
                                    // console.log('[DENTRO DO COMPONENTE] Clicou no sticker=', sticker);
                                    if (Boolean(props.onStickerClick)) {
                                        props.onStickerClick(sticker);
                                    }
                                }}
                                tag="li" key={sticker}

                                width='50%'
                                borderRadius='5px'
                                padding='10px'
                                //focus={
                                //    backgroundColor = appConfig.theme.colors.neutrals[600]
                                //}
                                //hover={
                                //    backgroundColor = appConfig.theme.colors.neutrals[600]
                                //}

                            >
                                <Image src={sticker} />
                            </Text>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}