import { Link } from 'react-router-dom'
import './styles/NavBar.css'
import image from '../images/Group 1.svg'
import {MdShoppingBasket, MdOutlineFavorite} from 'react-icons/md'
import {IoNotifications} from 'react-icons/io5'
import {RiSettingsFill} from 'react-icons/ri'
import {FaGithub} from 'react-icons/fa'

const NavBar = () => {

    return (
        <div className='navbar'>
            <div className='navbar__content'>
                <img src={image} alt="logo" className='navbar__logo'/>
                <div className='navigations'>
                    <Link  to='/'><MdShoppingBasket className='navigations__icon'/></Link>
                    <Link to='/notification'><IoNotifications className='navigations__icon'/></Link>
                    <Link to='/favorite'><MdOutlineFavorite className='navigations__icon'/></Link>
                    <Link to='/setting'><RiSettingsFill className='navigations__icon'/></Link>
                    <Link to='/github'><FaGithub className='navigations__icon'/></Link>
                    {/* AQUI DEBERIA TENER VALIDACION PARA MOSTRAR SI USUARIO O ADMIN Y RENDERIZAR ICONOS */}
                </div>
                {/* AQUI DEBERIA IR LA VALIDACION PARA EL LOGOUT */}
            </div>
        </div>
    );
}

export default NavBar;

