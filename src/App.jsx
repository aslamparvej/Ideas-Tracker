import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddIdea from './pages/AddIdea';
import AskGpt from './pages/AskGpt';

import { UserProvider, useUser } from './lib/context/user';
import { IdeasProvider } from './lib/context/ideas';

import './App.css';

function App() {
  // const isLoginPage = window.location.pathname === "/login";

  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <div className='app-container'>
        <UserProvider>
          <IdeasProvider>
          <Header />
          <Routes>
            <Route path='/'>
              <Route index element={<Home />}></Route>
              <Route path='login' element={<Login />}></Route>
              <Route path='register' element={<Register />}></Route>
              <Route path='add-idea' element={<AddIdea />}></Route>
              <Route path='ask-gpt' element={<AskGpt />}></Route>
            </Route>
          </Routes>
          </IdeasProvider>
        </UserProvider>
      </div>
    </BrowserRouter>
  )
}

export default App;
