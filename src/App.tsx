import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbars';
import { CreatePost } from './pages/createpost/createpost';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/react-learn' element={<Main />} />
          <Route path='/react-learn/login' element={<Login />}/>
          <Route path='/react-learn/createpost' element={<CreatePost />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
