import { useState } from 'react'
// import solidLogo from './assets/solid.svg'
// import viteLogo from '/electron-vite.animate.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src='./src/assets/solid.svg' className="logo" alt="Vite logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src='./public/electron-vite.animate.svg' className="logo solid" alt="Solid logo" />
        </a>
      </div>
      <h1>Vite + <s>Solid</s> <em>React</em></h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and Solid logos to learn more
      </p>
    </>
  )
}

export default App
