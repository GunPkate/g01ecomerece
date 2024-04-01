import { createContext, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function AppContent() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
  {
    path: '/',
    element:
    <>
      <Navbar/>
        <h1 className='text-primary-300 bg-primary'>Start Project</h1>
      <Footer/>
    </> 
  },
  {
    path: '/product',
    element: 
    <>
      <Navbar/>
        <h1 className='text-blue-500 font-bold'>new Product</h1>
      <Footer/>
    </>
  },
  {
    path: '/product2',
    element: 
    <>
      <Navbar/>
        <h1 className='text-blue-500 font-bold'>new Product</h1>
      <Footer/>
    </>
  },
  {
    path: '/login',
    element: 
    <>
      <Navbar/>
        <Login/>
      <Footer/>
    </>
  }
  ])

  return (<>
        <div className='min-h-[90vh]'>
          <RouterProvider router={router}/>
        </div>
    </>
  )
}

export default AppContent
