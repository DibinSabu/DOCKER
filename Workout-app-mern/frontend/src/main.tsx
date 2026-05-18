import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WorkoutProvider } from './context/WorkoutContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkoutProvider>
      <App />
    </WorkoutProvider>
  </StrictMode>,
)
