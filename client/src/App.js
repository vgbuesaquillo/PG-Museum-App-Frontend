import './App.css';
import { Routes, Route } from "react-router-dom";
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
      </Routes>


    </div>
  );
}

export default App;
