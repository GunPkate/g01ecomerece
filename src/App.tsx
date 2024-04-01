
import { createContext, useState } from 'react'
import './App.css'
import AppContent from './AppContent'
import Footer from './components/Footer'
import Navbar from './components/Navbar'



function App() {
  // const myCart = createContext()
  const [itemList,setItemList] = useState([])
  const MyCart = createContext(itemList);

  return (<>
  <MyCart.Provider value={itemList}>
    <AppContent/>
  </MyCart.Provider>
  </>)
}

export default App
