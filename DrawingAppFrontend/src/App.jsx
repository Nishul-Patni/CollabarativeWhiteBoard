import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// import AuthenticationPage from "./components/AuthenticationPage"
import Draw from './components/Draw';
import { DrawingContextProvider } from './components/Context/DrawingContext';
import { CanvasContextProvider } from './components/Context/CanvasContext';
import AuthenticationPage from "./components/AuthenticationPage"
import Home from './components/Home';
import User from './components/User';
import AuthGuard from './components/AuthGuard';
import { UserContextProvider } from './components/Context/UserContext';

function App() {

  return (
    <>
    <UserContextProvider>
      <CanvasContextProvider>
        <DrawingContextProvider>    
        {window.location.pathname !== '/' && window.location.pathname !== '/auth' && (
              <User />
            )}
          <Router>
            <Routes>
              <Route path='/' element={<AuthenticationPage/>}/>
              <Route path="/auth" element={<AuthenticationPage/>}/>
              <Route path="/home" element={<AuthGuard Component={Home}/>}/>
              <Route path="/draw" element={<AuthGuard Component={Draw} />}/>
            </Routes>
          </Router>
        </DrawingContextProvider>
      </CanvasContextProvider>
    </UserContextProvider>
    </>
  )
}

export default App
