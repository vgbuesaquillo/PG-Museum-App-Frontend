import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { categories, getAllGallery } from "../redux/actions"
import './styles/Categories.css'

const Categories = () => {
    const [select, setSelect] = useState('')
    let dispatch = useDispatch()

    useEffect(() => {
        if (select === "all") {
            dispatch(getAllGallery())
        } else {
            dispatch(categories(select));
        }
    }, [dispatch, select])

    function onSelectChange(e) {
        setSelect(e.target.value)
    }
    console.log(select)
    return (<>
        {/* <div className="categories">
            <button className='categories__button'>All</button>
            <button className='categories__button'>Painting</button>
            <button className='categories__button'>Medieval art</button>
            <button className='categories__button'>Sculture</button>
        </div> */}
        <div className="categories">
            <select size="4" defaultValue="all" className='categories__select' onChange={onSelectChange}>
                <option value="all" className='categories__select__option'>All</option>
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