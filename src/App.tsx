import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbars';
import { CreatePost } from './pages/createpost/createpost';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/createpost' element={<CreatePost />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
