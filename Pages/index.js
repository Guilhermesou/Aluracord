import appConfig from '../config.json'
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react'
import {Box, Button, Text, Input, Image} from '@chakra-ui/react'

const  theme = extendTheme(appConfig.theme.colors)

function GlobalStyle() {
    return (
        <style global jsx>{`
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
            `}
        </style>
    )
}

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
  
  // Componente React
  // function HomePage() {
  //     // JSX
  //     return (
  //         <div>
  //             <GlobalStyle />
  //             <Titulo tag="h2">Boas vindas de volta!</Titulo>
  //             <h2>Discord - Alura Matrix</h2>
  //         </div>
  //     )
  // }
  // export default HomePage
  
function PaginaInicial() {
    const username = 'Guilhermesou';
  
    return (
      <>
        <GlobalStyle />
        <Box 
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColor={'#1A1A1A'}

        backgroundRepeat={'no-repeat'}
        backgroundSize={'cover'}
        backgroundBlendMode= {'multiply'}
        >
          <Box
            display= {'flex'}
            alignItems= {'center'}
            justifyContent= {'space-between'}
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
              display={'flex'} 
              flexDirection={'column'}
              alignItems={'center'} 
              justifyContent={'center'}
              width={ {xs: '100%', sm: '50%'}}
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
                textStyle={{
                    neutral: {
                      mainColor: appConfig.theme.colors.neutrals[900],
                      mainColorHighlight: appConfig.theme.colors.primary[500],
                  
                    }}
                }
              />
              <Button
                marginTop={'25px'}              
                type='submit'
                isFullWidth
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
              <Image
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


//Envolve o Provider do ChakraUI na aplicação
 export default function App() {
    return (
      <ChakraProvider theme={theme}>
          <CSSReset/>
        <PaginaInicial/>
      </ChakraProvider>
    )
  }