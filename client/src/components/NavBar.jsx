import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import './styles/NavBar.css'
import image from '../images/Group 1.svg'
import {MdShoppingBasket, MdOutlineFavorite, MdHomeFilled} from 'react-icons/md'
import {IoNotifications} from 'react-icons/io5'
import {RiSettingsFill} from 'react-icons/ri'
import {FaGithub} from 'react-icons/fa'


function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <div>
        <Link
          style={{ color: match ? "cornflowerblue" : "rgb(207, 207, 207)", fontSize: 21 }}
          to={to}
          {...props}
        >
          {children}
        </Link>
      </div>
    );
}

const NavBar = () => {

    return (
        <div className='navbar'>
            <div className='navbar__content'>
                <img src={image} alt="logo" className='navbar__logo'/>
                <div className='navigations'>
                    <CustomLink to='/'><MdHomeFilled/></CustomLink>
                    <CustomLink to='/store'><MdShoppingBasket/></CustomLink>
                    <CustomLink to='/notification'><IoNotifications/></CustomLink>
                    <CustomLink to='/favorite'><MdOutlineFavorite/></CustomLink>
                    <CustomLink to='/github'><FaGithub/></CustomLink>
                    {/* AQUI DEBERIA TENER VALIDACION PARA MOSTRAR SI USUARIO O ADMIN Y RENDERIZAR ICONOS */}
                </div>
                {/* AQUI DEBERIA IR LA VALIDACION PARA EL LOGOUT */}
            </div>
        </div>
    );
}

export default NavBar;

