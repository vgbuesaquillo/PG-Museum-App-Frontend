import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { categories, getAllGallery, categoriesTypes } from "../redux/actions/galleryActions"
import './styles/Categories.css'

const Categories = () => {
    const artworkTypes = useSelector(state => state.galleryReducer.types);
    //console.log(artworkTypes)
    const [select, setSelect] = useState('')
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoriesTypes());
        if (select === "all") {
            dispatch(getAllGallery())
        } else {
            dispatch(categories(select));
        }
    }, [dispatch, select])

    function onSelectChange(e) {
        setSelect(e.target.value)
    }
    function onSelectMultipleChange(e) {
        setSelect(e.target.value)
    }
    function onHandeClick(e) {
        setSelect("all")
    }


    return (<>
        <div className="categories">
            <label htmlFor="#">All: </label>
            <select name="select" onChange={onSelectMultipleChange}
                defaultValue={'DEFAULT'} className='categories__multiple'>
                <option value="DEFAULT" disabled>Types of artwork: </option>
                {artworkTypes?.map((option) => (
                    <option value={option.type} key={option.id}>{option.type}</option>
                ))}
            </select>
            <select size="4" defaultValue="all" className='categories__select' onChange={onSelectChange}>
                <option value="all" className='categories__select__option' onClick={onHandeClick}>All</option>
                <option value="painting" className='categories__select__option'>Painting</option>
                <option value="sculpture" className='categories__select__option'>Sculpture</option>
                <option value="ceramic" className='categories__select__option'>Ceramic</option>
                <option value="textile" className='categories__select__option'>Textile</option>
            </select>
        </div>
    </>
    );
}

export default Categories;