import { Link } from 'react-router-dom'
import { BsFillXCircleFill } from "react-icons/bs";
import NavBar from '../components/NavBar'
// import TopBar from './components/TopBar';
import './styles/Detail.css'

const Detail = () => {
    let url = "https://www.publicdomainpictures.net/pictures/370000/nahled/skeletons-in-museum-1602841442dSz.jpg"
    let description = "The various visual arts exist within a continuum that ranges from purely aesthetic purposes at one end to purely utilitarian purposes at the other. Such a polarity of purpose is reflected in the commonly used terms artist and artisan, the latter understood as one who gives considerable attention to the utilitarian."
    return (<div className="detail">
        <NavBar />
        <div className='detail__link'>
            <Link to='/'><BsFillXCircleFill /></Link>
        </div>
        <div className='detail__content'>
            <div className='content__data'>
                <div className='data__image'>
                    <img src={url} width="100%" alt="#" className='image__style'></img>
                </div>
                <div className='data__text'>
                    <div className='text__header'>
                        <h2>This is the title</h2>
                        <p>Creation date: </p>
                        <p>Pricing: </p>
                        <p>Department: </p>
                        <p>Technique:</p>
                        <button>Add in card</button>
                    </div>
                    <div className='text__description'>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <div className='content__comment'>
                <div className='comment__stars'>
                    <h3>Comments:</h3>
                    {/* <img src={url} width="20%" alt="#" ></img> */}

                </div>
                <div className='comment__write'>

                </div>
            </div>
        </div>
    </div>);
}

export default Detail;