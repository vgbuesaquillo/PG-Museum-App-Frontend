import { useSelector } from "react-redux"
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import { BsFillXCircleFill } from "react-icons/bs";
import NavBar from '../components/NavBar';
import { MdShoppingBasket } from 'react-icons/md';
import RatingFive from "../components/RatingFive";
import './styles/Detail.css'

const Detail = () => {
    let { id } = useParams()

    const artworkDetail = useSelector(state => state.allGallery);
    let artwork = artworkDetail.find(element => element.id === Number(id))

    return (<div className="detail">
        <NavBar />
        <div className='detail__link'>
            <Link to='/'><BsFillXCircleFill /></Link>
        </div>
        <div className='detail__content'>
            <div className='detail__content--data'>
                <div className='detail__content--data--image'>
                    <img src={artwork?.images} alt="#" className='detail__content--data--image--style'></img>
                </div>
                <div className='detail__content--data--text'>
                    <div className='detail__content--data--text--header'>
                        <h3>{artwork?.title}</h3>
                        <h4>Pricing: {artwork?.price}</h4>
                        <p>
                            Creation date: {artwork?.creation_date}<br />
                            Department: <br />
                            Technique: <span>{artwork?.technique}</span>
                        </p>
                        <button className="detail__content--data--text--header--button"><MdShoppingBasket /> Add in card</button>
                    </div>
                    <div className='detail__content--data--text--description'>
                        <p>{artwork?.description}</p>
                    </div>
                </div>
            </div>
            <div className='detail__content--comment'>
                <div className='detail__content--comment--stars'>
                    <div className='detail__content--comment--stars--title'>
                        <h5>Comments</h5>
                    </div>
                    <div className="detail__content--comment--stars--data">
                        <div className="detail__content--comment--stars--data--img">
                            <img src={artwork?.images} alt="#"
                                className='detail__content--comment--stars--data--img--style'></img>
                        </div>
                        <div className="detail__content--comment--stars--data--text">
                            <h6>Mark</h6>
                            <p>
                                Awesone art picture, I buy <br />
                            </p>
                            <RatingFive />
                        </div>


                    </div>
                </div>
                <div className='detail__content--comment--write'>
                    <div className="detail__content--comment--write--img">
                        <img src={artwork?.images} alt="#"
                            className='detail__content--comment--write--img--style'>
                        </img>
                    </div>
                    <p className="detail__content--comment--write--text">
                        <input type="text" placeholder="Write a comment" />
                    </p>
                </div>
            </div>
        </div>
    </div>);
}

export default Detail;