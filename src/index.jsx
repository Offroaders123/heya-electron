import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root = /** @type {HTMLDivElement} */ (document.getElementById('root'))

createRoot(root).render(
  <StrictMode>
    <App/>
  </StrictMode>
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
