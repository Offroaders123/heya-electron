/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')

render(() => <App />, root!)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
