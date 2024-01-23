import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { useState } from 'react';

function App() {
  const [user, setLoginUser] = useState({})
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={user && user._id ? <Home setLoginUser={setLoginUser} />: <Login setLoginUser={setLoginUser} />} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
