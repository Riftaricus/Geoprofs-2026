import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen w-screen bg-gray-600'>
        <h1>First header</h1>
      </div>
    </>
  )
}

export default App
