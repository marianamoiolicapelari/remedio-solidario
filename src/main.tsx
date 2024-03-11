import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme.ts'
import AppRoutes from './routes/routes.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer autoClose={2000} theme="colored" />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
