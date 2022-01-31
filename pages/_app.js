import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react'

import appConfig from '../config.json'
const  theme = extendTheme(appConfig.theme.colors)


//Sign IN Session implementation
import { supabase } from '@supabase/supabase-js'











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


export default function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            <GlobalStyle/>
            <Component {...pageProps}/>
            
        </ChakraProvider>
    )
}