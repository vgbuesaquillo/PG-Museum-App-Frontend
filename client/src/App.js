import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import NavBar from './components/NavBar.jsx'
import SignUp from './pages/SignUp';
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<>
          <NavBar />
          <Home />
        </>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login"  element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
