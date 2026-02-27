import './App.css'
import HomePage from "./HomePage.jsx"
import {useEffect,useState,useRef} from 'react'
import Navbar from "./components/Navbar.jsx"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CartRender from './components/Cart/Cart Render/CartRender.jsx'
import {createContext} from "react"
import ProductInfo from "./components/ProductInfo/ProductInfo.jsx"
import ProductList from "./components/Product List/ProductList.jsx"
import Login from "./components/Login_Signup/Login.jsx"
import Signup from "./components/Login_Signup/Signup.jsx"
import BackToTopBtn from "./components/BackToTopBtn/BackToTopBtn.jsx"

export const varContext=createContext()
export const account = [
    {
      id:"1",
      name: "Dũng",
      username: "tandung5532",
      password: "1",
      email: "tandung5532@gmail.com",
      // SDT: "0342973837",
    },
  ];
const infoPD=[]
const spreadValue=(Info)=>{
  infoPD.push(Info)
}


function App() {
  const [dataCoffe,setDataCoffe]=useState([])
  const [infoProduct,setInfoProduct]=useState([])
  const [results,setResults]=useState([])
  const [storage,setStorage]=useState([])
  const [loading,setLoading]=useState(false)
  const scrollTop=useRef()

  const getDataCoffe = async ()=>{
    try{
    const response= await fetch('/coffe')
    if (!response.ok) throw new Error("HTTP status " + response.status);

    const dataJson= await response.json()
    setLoading(true)
    setDataCoffe([...dataCoffe,...dataJson])
    }catch(err){
      console.error("Fail fetch:",err)
    }
  }
  useEffect(()=>{
      getDataCoffe();
  },[dataCoffe])
  return (
    <div id="container" ref={scrollTop}>
      <varContext.Provider value={{infoProduct,setInfoProduct,dataCoffe,setDataCoffe,results,setResults,storage,setStorage,loading,setLoading,scrollTop}}>
      <BrowserRouter>
        <Navbar  infoPD={infoPD}/>
          <Routes>
            <Route path={'/'} element={<HomePage spreadValue={spreadValue} />} />
            <Route path={'/cart-render'} element={<CartRender infoPD={infoPD}/>} />
            <Route path={'/back'} element={<HomePage spreadValue={spreadValue}/>} />
            <Route path={'/product-info'} element={<ProductInfo  infoPD={infoPD}/>}/>
            <Route path={'/productList-find'} element={<ProductList />}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/signup'} element={<Signup />}/>
          </Routes>
        <BackToTopBtn />
      </BrowserRouter>
      </varContext.Provider>
    </div>
  )
}

export default App
