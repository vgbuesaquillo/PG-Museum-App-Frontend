import './styles/GalleryCard.css'
import { MdOutlineFavorite, MdShoppingBag } from 'react-icons/md'
import { NavLink } from 'react-router-dom';


const GalleryCard = (props) => {
    return (
        <div className='gallery_card'>
            <div className='card__img'>
                <img src={props.img} alt={props.title} className='card__img-avatar' />
            </div>
            <div>
                <span>
                    <NavLink to={`/${props.id}`}>
                        {props.title}
                    </NavLink>
                </span>
                <span>{props.price}</span>
            </div>
            <div>
                <MdShoppingBag />
                <MdOutlineFavorite />
            </div>
        </div>
    );
}

export default GalleryCard;

