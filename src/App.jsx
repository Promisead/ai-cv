import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
//import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { useDispatch, useSelector } from 'react-redux';
//import './App.css';
import FallBackComponent from './components/Fallback';
//import 'bootstrap/dist/js/bootstrap.bundle.min.js';






function App() {
  
  

  return (
    <>
     {/*  <Header/> */}
      <Outlet/>
      <Toaster />
    </>
  )
}

export default App
