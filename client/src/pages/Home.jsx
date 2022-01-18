import TopBar from '../components/TopBar'
import Landing from '../components/Landing'
import './styles/Home.css'
import GalleryCard from '../components/GalleryCard';
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllGallery} from '../redux/actions'
import Pagination from '../components/Pagination'

const Home = () => {

    const dispatch = useDispatch()
    const allGallery = useSelector(state => state.allGallery)

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
  
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentGalleries = allGallery.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(()=> {
        dispatch(getAllGallery())
    },[dispatch])

    return (<div className='home'>
        <TopBar />
        <Landing />
        <div className='galleryGrid'>
            {
                currentGalleries.map(art => {
                    return <GalleryCard img={art.images} title={art.title} price={art.price}/>
                })
            }
        </div>
        <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={allGallery.length}
        paginate={paginate}/>
    </div>);
}

export default Home;