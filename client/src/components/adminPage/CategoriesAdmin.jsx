import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { categoriesTypes, getAllGallery } from "../../redux/actions/galleryActions"
import swal from 'sweetalert2'
import axios from 'axios'
import '../styles/adminStyles/CategoriesAdmin.css'

const CategoriesAdmin = () => {
    const url = process.env.REACT_APP_URL
    const artworkTypes = useSelector(state => state.galleryReducer.types);
    const artworkCategories = useSelector(state => state.galleryReducer.allGallery);
    const [input, setInput] = useState('')
    const [select, setSelect] = useState('')
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(categoriesTypes());
    }, [dispatch])

    function handleInputChange(e) {
        e.preventDefault()
        setInput(e.target.value)
    }

    function onSelectMultipleChange(e) {
        setSelect(e.type)
    }

    function handleClickAdd(e) {
        dispatch(getAllGallery())
        dispatch(categoriesTypes());
        const typeRepete = artworkTypes.filter(el => el.type.trim() === input.trim());
        if (!input) {
            swal.fire({
                title: "Problem!",
                text: "Input is empty",
                icon: 'error',
                timer: 2000,
            }).then(res => {
                console.log(res)
                setInput('')
            })
        } else if (typeRepete.length > 0) {
            swal.fire({
                title: "Problem!",
                text: "Type exists",
                icon: 'error',
                timer: 2000,
            }).then(res => {
                setInput('')
            })
        } else {
            try {
                axios.post(`${url}/types/post`, { type: input })
                    .then(res =>
                        swal.fire({
                            title: "Done!",
                            text: "Category is added to database",
                            icon: "success",
                            timer: 3000,
                        }).then(res => {
                            setInput('')
                        }).then(() => {
                            dispatch(categoriesTypes());
                        })
                    )
            } catch (error) {
                console.log(error)
            }
        }
    }
    function handleClickDelete(e) {
        dispatch(getAllGallery())
        dispatch(categoriesTypes());
        let artworkCategoriesDelete = artworkCategories.filter(art => {
            if (art && art.types) {
                let value = false;
                for (let i = 0; i < art.types.length; i++) {
                    if (art.types[i].type.toLowerCase().includes(select.toLowerCase())) {
                        value = true;
                    }
                }
                return value
            }
        })
        const typeDelete = artworkTypes.filter(el => el.type.trim() === select.trim());
        if (artworkCategoriesDelete.length > 0) {
            swal.fire({
                title: "Problem!",
                text: "Category is't empty, please delete associated products",
                icon: 'error',
                timer: 4000,
            })
        } else if (artworkCategoriesDelete.length === 0) {
            const id = typeDelete[0]?.id
            if (id) {
                axios.delete(`${url}/types/delete/${id}`)
                    .then(() => {
                        swal.fire({
                            title: "Done!",
                            text: "Category deleted",
                            icon: "success",
                            timer: 4000,
                        })
                    }).then(() => {
                        dispatch(categoriesTypes());
                    })
                    .catch(err => {
                        console.log(err)
                    });
            } else {
                swal.fire({
                    title: "Problem!",
                    text: "Select a type",
                    icon: 'error',
                    timer: 4000,
                })
            }
        }
    }


    return (<div className="categoriesadmin">
        <label htmlFor="#">Categories control: </label>
        <div className='categoriesadmin__add'>
            <input type="text" name='add' value={input} onChange={handleInputChange}
                placeholder='New category' />
            <button onClick={handleClickAdd}>Add</button>
        </div>
        <div className='categoriesadmin__delete'>
            <Select
                onChange={onSelectMultipleChange}
                name="select"
                options={artworkTypes}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.type}
                placeholder="Select type: "
            />
            <button onClick={handleClickDelete}>Delete</button>
        </div>
    </div>);
}

export default CategoriesAdmin;