import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThreeD from './components/ThreeD'
import { Canvas } from '@react-three/fiber'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-slate-500 h-screen w-screen' >
    <h1 className='text-red-500 text-5xl'>Lie Dice</h1>
    <ThreeD/>

    </div>
  )
}

export default App
