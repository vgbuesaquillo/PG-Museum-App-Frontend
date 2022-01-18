import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar.jsx'
import SignUp from './pages/SignUp';
import Home from './pages/Home'
import Notification from './pages/Notification';
import Favorite from './pages/Favorite';
import Setting from './pages/Setting';
import GitHub from './pages/GitHub';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/github" element={<GitHub />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login"  element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
