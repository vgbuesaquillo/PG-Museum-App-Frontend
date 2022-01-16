import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import NavBar from './components/NavBar.jsx'
import TopBar from './components/TopBar';

function App() {
  return (
    <div className="App">
      <header>
        <TopBar/>
        <NavBar/>
      </header>
      <main>
        <Routes>
          <Route path="/login" component={Login} element={<Login/>}/>

        </Routes>
      </main>
      
    </div>
  );
}

export default App;
