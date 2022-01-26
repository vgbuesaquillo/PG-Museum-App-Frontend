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
import Detail from './pages/Detail.jsx';
import Store from './pages/Store';
import AdminProfile from './pages/AdminProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<> <NavBar /> <Home /></>} />
        <Route path="/notification" element={<> <NavBar /><Notification /></>} />
        <Route path="/favorite" element={<> <NavBar /><Favorite /></>} />
        <Route path="/setting" element={<> <NavBar /><Setting /></>} />
        <Route path="/github" element={<> <NavBar /><GitHub /></>} />
        <Route path="/Admin" element={<> <NavBar /><AdminProfile /></>} />
        <Route path="/store" element={<> <NavBar /><Store /></>} />
        <Route path="/:id" element={<> <NavBar /><Detail /></>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
