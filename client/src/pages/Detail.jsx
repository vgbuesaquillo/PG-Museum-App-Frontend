import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import { BsFillXCircleFill } from "react-icons/bs";
import { MdShoppingBasket } from 'react-icons/md';
import RatingFive from "../components/RatingFive";
import './styles/Detail.css'
import { Rate, Button, Modal, Alert } from 'antd';
import 'antd/dist/antd.min.css'
import {BiEdit} from 'react-icons/bi'
import logo from '../images/logoapp.svg'
import { localstorage } from '../redux/actions/storageActions'
import { postProducts, totalProduct } from '../redux/actions/allProductsActions'
import { postReview } from '../redux/actions/detailAction'
import axios from 'axios';
import { getAllGallery} from '../redux/actions/galleryActions'
import SizeComparison from "../components/SizeComparison";

const requestApi = () => {
    
}


const Detail = () => {

    const url = process.env.REACT_APP_URL;
    const { storage } = useSelector(state => state.storageReducer);
    const user = localStorage?.session ? JSON.parse(localStorage.session) : null
    const dispatch = useDispatch();
    let { id } = useParams()
    
    const artworkDetail = useSelector(state => state.galleryReducer.allGallery);
    let artwork = artworkDetail.find(element => element.id === Number(id))
    
    useEffect(() => {
        // storing input name
        localStorage.setItem(`${storage?.id}`, JSON.stringify(storage));
        const allStorage = () => {
            
            var values = []
            var keys = Object.keys(localStorage)
            var i = keys.length;
            
            while (i--) {
                values.push(JSON.parse(localStorage.getItem(keys[i])));
            }
            
            dispatch(postProducts(values));
        }
        
        allStorage()
        dispatch(totalProduct())
        
    }, [storage]);
    
    const handleAddShop = () => {
        let findGallery = artworkDetail.find(element => element.id === Number(id))
        dispatch(localstorage(findGallery))
    }
    ////////////////////////////////////////////////////////////
    
    
    const [ok, setOk] = useState();
    const [reviews, setReviews] = useState()
    const [users, setUsers] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editInput, setEditInput] = useState({
        description: "",
        rating: 0,
    });
    const [input, setInput] = useState({
        description: "",
        artworkId: "",
        rating: 0,
        userId: 0,
    });
    
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    const handleEditComment = (id) => {
        fetch(`${url}/review/put/${id}`,{
            method: 'PUT',
            body: editInput.description ? JSON.stringify({
                description: editInput.description,
                rating: editInput.rating,
            }): JSON.stringify({rating: editInput.rating}),
            headers:{
              'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then(result => {
            setEditInput({description: "", rating: 0})
            setIsModalVisible(false);
            setOk(Math.random())
        })
    };

    const handleChangeReview = (e) => {
        setInput({
            ...input,
            description: e.target.value,
        });
    };

    const handleRating = (value) => {
        setInput({...input, rating: value})
    }

    
    const handleEditReview = (e) => {
        setEditInput({
            ...editInput,
            description: e.target.value,
        });
    };

    const handleEditRating = (value) => {
        setEditInput({...editInput, rating: value})
    }

    
    useEffect(async() => {
        let abortController = new AbortController();  
        // your async action is here  
        let fetchData = await fetch(`${url}/user/all`)
        let result = await fetchData.json()
        setUsers(result.data)

        let axiosData = await axios.get(`${url}/artwork/${id}`)  
        setReviews(axiosData.data.reviews)
        return () => {  
        abortController.abort();  
        }  
    },[ok])

    const handleAddReview = () => {
        fetch(`${url}/review/post`,{
            method: 'POST',
            body: JSON.stringify({
                description: input.description, 
                artworkId: artwork?.id,
                userId: user[0]?.id,
                rating: input.rating,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(data => data.json())
        .then(result => {
            setOk(Math.random())
            setInput({description: '', rating: 0})
        })
        .catch(error => console.log(error))
    }

    console.log(reviews);
    console.log(users);

        //////////////////////////////////////////////////////////////
    return (<div className="detail">
        <div className='detail__content'>
            <div className='detail__content--data'>
                <div className='detail__content--data--image'>
                    <img src={artwork?.images} alt="#" className='detail__content--data--image--style'></img>
                </div>
                <div className='detail__content--data--text'>
                    <div className='detail__content--data--text--header'>
                        <h3>{artwork?.title}</h3>
                        <h4>Pricing: $ {artwork?.price}</h4>
                        <p>
                            Creation date: {artwork?.creation_date}<br />
                            Department: <br />
                            Technique: <span>{artwork?.technique}</span>
                        </p>
                        <button className="detail__content--data--text--header--button" onClick={handleAddShop}><MdShoppingBasket /> Add to cart</button>
                    </div>
                    <div className='detail__content--data--text--description'>
                        <p>{artwork?.description}</p>
                    </div>
                </div>
            </div>

            <SizeComparison height={artwork.dimensions_height} width={artwork.dimensions_width} images={artwork.images}/>

            <div className='detail__content--comment'>
                <div className='detail__content--comment--stars--title'>
                    <label>Comments {reviews?.length}</label>
                </div>
                <div className='detail__content--comment--stars'>
                    {
                        reviews !== undefined ? reviews?.map((review) => (
                            <div className="detail__content--comment--stars--data" key={review.id}>
                                {
                                    users?.map(user => (
                                        user?.id === review?.userId ? 
                                        <div className="detail__content--comment--stars--data--img">
                                            <img src={user?.image} alt="#"
                                                className='detail__content--comment--stars--data--img--style'></img>
                                        </div> : null
                                    ))
                                }
                                <div className="detail__content--comment--stars--data--text">
                                    {
                                        users?.map(user => (
                                            user?.id === review.userId ? 
                                            <h4>{user?.name}</h4>: null
                                        ))
                                    }
                                    <p>
                                        {review.description}<br />
                                    </p>
        
                                    <span>post {review.createdAt.slice(0, 10)}</span>
                                    
                                    <Rate value={review?.rating} name='rating' disabled/>
                                    {
                                        localStorage.getItem('session') ? review?.userId === user[0]?.id ? 
                                        <Button icon={<BiEdit/>} type='text' onClick={showModal}/> : null : null
                                    }
        
                                    <Modal title="Edit comment" visible={isModalVisible} onOk={() => handleEditComment(review.id)} onCancel={handleCancel}>
                                        <Rate allowClear={false} onChange={handleEditRating} defaultValue={1} value={editInput.rating}/>
                                        <textarea type="text" placeholder="Write a comment" 
                                            onChange={handleEditReview} value={editInput.description}
                                        />
                                    </Modal>
                                </div>
                            </div> 
                        )) : null
                    }
                </div>

                {
                    localStorage?.getItem('session') ? 
                    <div className='detail__content--comment--write'>
                        {
                            user ? 
                            <div className="detail__content--comment--write--img">
                                <img src={user[0]?.image} alt="#"
                                    className='detail__content--comment--write--img--style'>
                                </img>
                            </div> : null
                        }
                        <Rate allowClear={false} onChange={handleRating} defaultValue={1} value={input.rating}/>
                        <input type="text" placeholder="Write a comment" 
                            onChange={handleChangeReview} value={input.description}
                        />
                        <Button                                                      className="detail__content--comment--write--button"                
                        onClick={handleAddReview}
                        >Send</Button>
                        
                    </div> : 
                    <Alert message="Se requiere ser usuario logueado para poder hacer un comentario sobre esta obra" type="info" showIcon />      
                    
                }
      

            </div>
        </div>
    </div >);
}

export default Detail;