import { useEffect } from 'react'
import { useLocalStorage } from 'react-custome-hooks'
import './App.css'

function App() {
  const [name, setName] = useLocalStorage('name', 'Puskar')
  console.log(name)

  useEffect(() => {
    setName({
      name1: 'Jhon',
      address: 'Bangalore'
    })
  }, [])

  return (
    <div className='App'>
      Hello {name?.name1}
      <input
        type='text'
        value={name?.name1}
        onChange={(e) => setName(name?.name1(e.target.value))}
      />
    </div>
  )
}

export default App
