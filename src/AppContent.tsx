import { createContext, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function AppContent() {
  const contentBodyStyle = 'min-h-[90vh]'
  const router = createBrowserRouter([
  {
    path: '/',
    element:
    <>
      <Navbar/>
        <div  className={ contentBodyStyle }>
          <h1 className='text-primary-300 bg-primary'>Start Project</h1>
        </div>
      <Footer/>
    </> 
  },
  {
    path: '/product',
    element: 
    <>
      <Navbar/>
        <div  className={ contentBodyStyle }>
          <h1 className='text-blue-500 font-bold'>new Product</h1>
        </div>
      <Footer/>
    </>
  },
  {
    path: '/product2',
    element: 
    <>
      <Navbar/>
        <div  className={ contentBodyStyle }>
          <h1 className='text-blue-500 font-bold'>new Product</h1>
        </div>
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
        <div>

            <RouterProvider router={router}/>

        </div>
    </>
  )
}

export default AppContent
