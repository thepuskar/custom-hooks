import React, { useState, ChangeEvent } from 'react'
import { useDebounce } from './useDebounce'

export const UseDebounceDemo = () => {
  const [searchParam, setSearchParam] = useState<string>('')

  const searchDebounce = useDebounce(searchParam, 400)

  const handlerSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(event.target.value)
  }

  return (
    <div>
      <input type='text' onChange={handlerSearch} />
      <p>Without debounce :{searchParam}</p>
      <p>Debounce Value :{searchDebounce}</p>
    </div>
  )
}
