import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import { BsFillXCircleFill } from "react-icons/bs";
import NavBar from '../components/NavBar';
import { MdShoppingBasket } from 'react-icons/md';
import './styles/Detail.css'

const Detail = () => {
    const [artwork, setArtwork] = useState(null)
    let { id } = useParams()
    console.log(id)
    useEffect(() => {
        axios.get("http://localhost:5040/home/" + id)
            .then((response) => {
                setArtwork(response.data)
            })
        return () => {
            setArtwork(null)
        }
    }, [id])
    
    console.log(artwork)
    console.log(artwork?.id)
    return (<div className="detail">
        <NavBar />
        <div className='detail__link'>
            <Link to='/'><BsFillXCircleFill /></Link>
        </div>
        <div className='detail__content'>
            <div className='content__data'>
                <div className='data__image'>
                    <img src={artwork?.images} alt="#" className='image__style'></img>
                </div>
                <div className='data__text'>
                    <div className='text__header'>
                        <h2>{artwork?.title}</h2>
                        <p>Creation date: {artwork?.creation_date}<br />
                            Pricing: {artwork?.price}<br />
                            Department: <br />
                            Technique: {artwork?.technique}</p>
                        <button><MdShoppingBasket /> Add in card</button>
                    </div>
                    <div className='text__description'>
                        <p>{artwork?.description}</p>
                    </div>
                </div>
            </div>
            <div className='content__comment'>
                <div className='comment__stars'>
                    <div className='stars__title'>
                        <span>Comments</span>
                    </div>
                    <div className="stars__data">
                        <img src={artwork?.images} alt="#" width="20px" height="30" className='image__data'></img>
                        <div className="stars__data--text">
                            <p>
                                <span>Mark</span><br />
                                Awesone art picture, I buy <br />
                                * * * * *
                            </p>
                        </div>


                    </div>
                </div>
                <div className='comment__write'>
                    <img src={artwork?.images} alt="#" width="20px" height="30" className='image__data'></img>
                    <p>Write a comment</p>
                </div>
            </div>
        </div>
    </div>);
}

export default Detail;