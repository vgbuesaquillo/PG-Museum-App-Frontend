import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import './styles/NavBar.css'
import image from '../images/Group 1.svg'
import {MdShoppingBasket, MdOutlineFavorite, MdHomeFilled} from 'react-icons/md'
import {FaGithub, FaStore} from 'react-icons/fa'


function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <div>
        <Link
          style={{ color: match ? "#94B3FD" : "rgb(223, 223, 223)", fontSize: 20, backgroundColor: match ? '#94b3fd2a': null, borderRadius: '100px' , padding: '5px', margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
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
                    <CustomLink to='/store'><FaStore/></CustomLink>
                    {/* <CustomLink to='/favorite'><MdOutlineFavorite/></CustomLink> 
                    <CustomLink to='/github'><FaGithub/></CustomLink> */}
                    {/* AQUI DEBERIA TENER VALIDACION PARA MOSTRAR SI USUARIO O ADMIN Y RENDERIZAR ICONOS */}
                    <div>

                    </div>
                </div>
                {/* AQUI DEBERIA IR LA VALIDACION PARA EL LOGOUT */}
                <div>

                </div>
            </div>
        </div>
    );
}

export default NavBar;

