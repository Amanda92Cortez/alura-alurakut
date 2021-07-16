import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {AlurakutStyles} from '../src/lib/AlurakutCommons'


const GlobalStyle = createGlobalStyle`
/*Reset CSS (Necolas Reset CSS <3) */
*{
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background-image: url("https://wallpaperforu.com/wp-content/uploads/2021/04/Wallpaper-Route-66-Map-Road-Usa-Highway-North-America33-scaled.jpg");// no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-color: #D9E6F6;
  }

#__next{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

img{
  max-width: 100%;
  height: auto;
  display: block;
}

${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
