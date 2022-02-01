import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { categoriesTypes } from "../../redux/actions/galleryActions"
import '../styles/adminStyles/CategoriesAdmin.css'
import CategoryEdit from './CategoryEdit';

const CategoriesAdmin = () => {
    const artworkTypes = useSelector(state => state.galleryReducer.types);
    const [select, setSelect] = useState('')
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoriesTypes());
    }, [dispatch])

    function onSelectMultipleChange(e) {
        setSelect(e.target.value)
    }


    return (<div className="categoriesadmin">
        <label htmlFor="#">Edit category: </label>
        <select name="select" onChange={onSelectMultipleChange}
            defaultValue={'DEFAULT'} className='categories__multiple'>
            <option value="DEFAULT" disabled>Types of artwork: </option>
            {artworkTypes?.map((option) => (
                <option value={option.type} key={option.id}>{option.type}</option>
            ))}
        </select>
        <CategoryEdit />
    </div>);
}

export default CategoriesAdmin;