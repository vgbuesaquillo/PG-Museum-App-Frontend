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
                    <MdShoppingBasket className='navigations__icon'/>
                    <IoNotifications className='navigations__icon'/>
                    <MdOutlineFavorite className='navigations__icon'/>
                    <RiSettingsFill className='navigations__icon'/>
                    <FaGithub className='navigations__icon'/>
                    {/* AQUI DEBERIA TENER VALIDACION PARA MOSTRAR SI USUARIO O ADMIN Y RENDERIZAR ICONOS */}
                </div>
                {/* AQUI DEBERIA IR LA VALIDACION PARA EL LOGOUT */}
            </div>
        </div>
    );
}

export default NavBar;