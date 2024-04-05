import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UserTokenProvider from './components/context/UserTokenContext'
import MyCart from './pages/MyCart/MyCart'
import MyCartItemProvider from './components/context/MyCartItemContext'
import Admin from './pagesAdmin/Admin'
import Product from './pages/Product/Product'
import ProductFilter from './pages/Product/ProductFilter'
import ProductDetails from './pages/ProductDetails/ProductDetails'

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
    path: '/product/',
    element: 
    <>

          <Product/>

    </>,
    children: [
      {
        path: "/product/:name",
        element:
        <>
            <ProductFilter/>
        </>,
      }
    ]
  },
  {
    path: '/productdetails/',
    element: 
    <>
      <ProductDetails/>
    </>,
    children:[{
      path: "/productdetails/:permalink",
      element: <>

      </>
    }]
  },
  {
    path: '/mycart',
    element: 
    <>
      <Navbar/>
        <div  className={ contentBodyStyle }>
          <MyCart/>
        </div>
      <Footer/>
    </>
  },
  {
    path: '/login',
    element: 
    <>
      <Navbar/>
        <div  className={ contentBodyStyle }>
          <Login/>
        </div>
      <Footer/>
    </>
  },
  {
    path: '/admin',
    element: 
    <>
      <Navbar/>
        <div  className={ contentBodyStyle }>
          <Admin/>
        </div>
      <Footer/>
    </>
  }
  ])

  return (<>
        <div>
        <MyCartItemProvider>
        <UserTokenProvider>
            <RouterProvider router={router}/>
        </UserTokenProvider>
        </MyCartItemProvider>

        </div>
    </>
  )
}

export default AppContent
