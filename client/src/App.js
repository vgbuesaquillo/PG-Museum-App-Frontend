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
import NewProduct from './components/adminPage/NewProduct';

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
        <Route path="/Admin/new" element={<> <NavBar /><NewProduct/> </>} />
        <Route path="/Admin/product-list" element={<> <NavBar /><Store reducer={"allProductsReducer"} property={"allproducts"} title={"Product List"} /> </>} />
        

        <Route path="/store" element={<> <NavBar /><Store reducer={"allProductsReducer"} property={"allproducts"} title={"My Cart"} /></>} />
        <Route path="/:id" element={<> <NavBar /><Detail /></>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
