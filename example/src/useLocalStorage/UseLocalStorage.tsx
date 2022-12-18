import { useLocalStorage } from 'custom-hooks'

export const UseLocalStorage = () => {
  const [name, setName] = useLocalStorage('name', 'Puskar')
  return (
    <div>
      <input
        type='text'
        placeholder='Enter your name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  )
}
