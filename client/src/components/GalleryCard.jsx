import './styles/GalleryCard.css'
import {useSelector} from 'react-redux'
import { MdOutlineFavorite, MdShoppingBag } from 'react-icons/md'
import { NavLink } from 'react-router-dom';


const GalleryCard = (props) => {

    const artworkShop = useSelector(state => state.allGallery);  

    const handleAddShop = () => {
        let id = props.id
        let art = []
        let findGallery = artworkShop.find(element => element.id === Number(id))
        // art.concat(findGallery)
        // console.log(findGallery);
        if (!localStorage.hasOwnProperty('store')) {
            window.localStorage.setItem('store', JSON.stringify([findGallery]))
        }
    }

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
                <MdShoppingBag onClick={handleAddShop}/>
                <MdOutlineFavorite />
            </div>
        </div>
    );
}

export default GalleryCard;

