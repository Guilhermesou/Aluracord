import appConfig from '../config.json'
import { Box, Button, Text, Input, Avatar } from '@chakra-ui/react'
import { MdLogin } from 'react-icons/md'
import { useState } from 'react'
import { useRouter } from 'next/router'


 /* 
        ------------|TODO|-------------- 
    [ ] Colocar verificação se o usuário existe no github
    [ ] Mudar cor padrão para azul?
*/






function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
    </>
  );
}


export default function PaginaInicial() {
  const [username, setUsername] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const router = useRouter()
  return (
    <>
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
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
          maxWidth={'600px'}
          borderRadius={'10px'}
          padding={'32px'}
          margin={'16px'}
          boxShadow={'0 2px 10px 0 rgb(0 0 0 / 20%)'}
          backgroundColor={appConfig.theme.colors.neutrals[700]}

        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault()
              router.push(`/chat?username=${username}`);
            }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            width={{ xs: '100%', sm: '50%' }}
            textAlign={'center'}
            marginBottom={'32px'}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              marginBottom={'32px'}
              color={appConfig.theme.colors.neutrals[300]}>
              {appConfig.name}
            </Text>

            <Input
              isFullWidth
              textColor={appConfig.theme.colors.neutrals[200]}
              backgroundColor={appConfig.theme.colors.neutrals[800]}
              borderColor={appConfig.theme.colors.neutrals[800]}
              value={username}
              onChange={function (event) {
                const valor = event.target.value;
                if (event.target.value.length <= 2) {
                  setIsButtonDisabled(true)
                }
                else {setIsButtonDisabled(false)}
                setUsername(valor);
                
              }}
              
              
            />


            <Button
              marginTop={'15px'}
              type='submit'
              isDisabled={isButtonDisabled}
              isFullWidth
              rightIcon={<MdLogin/>}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            >Entrar
            </Button>

          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            maxWidth={'200px'}
            padding={'16px'}
            //backgroundColor={appConfig.theme.colors.neutrals[800]}
            //border={'1px solid'}
            borderRadius={'10px'}
            flex={1}
            minHeight={'240px'}
          >
            <Avatar
              size={'3xl'}
              borderRadius={'50%'}
              marginBottom={'16px'}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              color={appConfig.theme.colors.neutrals[200]}
              backgroundColor={appConfig.theme.colors.neutrals[800]}
              padding={'3px 10px'}
              borderRadius={'1000px'}

            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

