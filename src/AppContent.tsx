import { createContext, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function AppContent() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
  {
    path: '/',
    element: <h1 className='text-primary-300 bg-primary'>Start Project</h1>
  },
  {
    path: '/product',
    element: <h1 className='text-blue-500 font-bold'>new Product</h1>
  },
  {
    path: '/product2',
    element: <h1 className='text-blue-500 font-bold'>new Product2</h1>
  }
  ])

  return (
    <div className='min-h-[90vh]'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default AppContent
