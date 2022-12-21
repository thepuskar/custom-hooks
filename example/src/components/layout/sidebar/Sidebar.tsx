import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { regularRoutes } from 'routes'

import { useOnClickOutside, useWindowSize } from 'hooks'
import { snakeToCamel, uid, moveArrayPosition } from 'utils'

interface ISidebarProps {
  toggleSidebar: () => void
  isActive: boolean
  setIsActive: (isActive: boolean) => void
}

export const SideBar = (props: ISidebarProps) => {
  const { width } = useWindowSize()
  const ref = useRef<HTMLDivElement>(null)

  const closeHander = () => {
    if (width < 768) return props?.setIsActive(false)
    return
  }
  useOnClickOutside(ref, closeHander)

  return (
    <>
      <div
        id='drawer-example'
        className={` fixed overflow-y-auto bg-[rgba(0,0,0,0.35)] md:w-72 w-full ease-in-out duration-300 origin-left transition-all ${
          props?.isActive
            ? 'md:transform-none left-0'
            : 'md:transform-none -left-full'
        }`}
        aria-labelledby='drawer-label'
      >
        <div
          className='space-y-2 w-72 bg-white dark:bg-gray-800 p-4 h-screen'
          ref={ref}
        >
          {moveArrayPosition(regularRoutes, '/', 0, 'path')?.map(
            (data: RouteObject) => (
              <div key={uid()}>
                <Link
                  to={data?.path || '/'}
                  className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                >
                  <span className='ml-3'>
                    {data?.path === '/'
                      ? 'Home'
                      : snakeToCamel(data?.path || 'Home')}
                  </span>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}
