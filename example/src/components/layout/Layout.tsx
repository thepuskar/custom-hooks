import { useState } from 'react'

import { Navbar } from './navbar'
import { SideBar } from './sidebar'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const toggleSidebar = () => {
    setIsActive((curr) => !curr)
  }
  return (
    <div className='main'>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className='sidebar'>
        <SideBar
          toggleSidebar={toggleSidebar}
          isActive={isActive}
          setIsActive={setIsActive}
        />
        <div className='body'>{children}</div>
      </div>
    </div>
  )
}
