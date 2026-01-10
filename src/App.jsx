import { useState } from 'react'
import ThreeScene from './components/ThreeScene'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React3D Animation</h1>
      <p>
        <b>Керування:</b>
        - Клавіша 1: idle
        - Клавіша 2: walk
        - Клавіша 3: jump
        - мишка: орієнтація камери
      </p>
      <ThreeScene />
    </>
  )
}

export default App
