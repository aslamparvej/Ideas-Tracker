import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddIdea from './pages/AddIdea';
import Assistant from './pages/Assistant';

import Project from './pages/Project';

import { UserProvider, useUser } from './lib/context/user';
import { IdeasProvider } from './lib/context/ideas';

import './App.css';
import Footer from './components/footer/Footer';

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
              <Route path='assistant' element={<Assistant />}></Route>
              <Route path='projects' element={<Home />}></Route>
              <Route path='project/new' element={<AddIdea />}></Route>
              <Route path='project/:id' element={<Project />}></Route>
            </Route>
          </Routes>
          <Footer />
          </IdeasProvider>
        </UserProvider>
      </div>
    </BrowserRouter>
  )
}

export default App;
