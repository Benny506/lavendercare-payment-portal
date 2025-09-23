import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PaymentPage from './components/PaymentPage'
import { Route, Routes, useNavigate } from 'react-router'

function App() {
  const navigate = useNavigate()

  const goToPay = () => navigate('/pay?amount=5000&email=olomufeh@gmail.com')

  return (
    <Routes>
      <Route 
        path='*'
        element={
          <button onClick={goToPay}>
            Pay
          </button>
        }
      />      
      <Route 
        path='/pay'
        element={
          <PaymentPage />
        }
      />
    </Routes>
  )
}

export default App
