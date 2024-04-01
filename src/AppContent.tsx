import { createContext, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function AppContent() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
  {
    path: '/',
    element: <h1 className='text-red-500 font-bold'>Start Project</h1>
  },
  {
    path: '/2',
    element: <h1 className='text-blue-500 font-bold'>new Project</h1>
  }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default AppContent
