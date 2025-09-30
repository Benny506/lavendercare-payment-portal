import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PaymentPage from './components/PaymentPage'
import { Route, Routes, useNavigate } from 'react-router'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentFailure from './components/PaymentFailure'

function App() {
  const navigate = useNavigate()

  const goToPay = () => navigate('/pay?amount=5000&email=dummy@gmail.com&user_id=dummyUser&provider_id=dummyProvider&payment_for=dummyReason')

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

      <Route 
        path='/payment-success'
        element={
          <PaymentSuccess />
        }
      />  

      <Route 
        path='/payment-failure'
        element={
          <PaymentFailure />
        }
      />            
    </Routes>
  )
}

export default App
