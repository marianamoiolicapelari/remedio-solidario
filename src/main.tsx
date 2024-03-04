import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme.ts'
import AppRoutes from './routes/routes.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
