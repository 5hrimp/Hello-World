import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import LoginProvider from './LoginContext.tsx'




createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
  <LoginProvider>
    <App />
  </LoginProvider>
  </StrictMode>,
)
