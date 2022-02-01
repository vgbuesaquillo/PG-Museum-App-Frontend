import React, { useState, useEffect } from 'react'

const CategoryEdit = () => {

    function onInputChange(e) {
        e.preventDefault()
    }
    function onSubmit(e) {
        e.preventDefault()
    }
    return (<div className="categoryedit">
        <form onSubmit={onSubmit} >
            <input type="text" />
            <button >Add</button>
            <input type="text" />
            <button >Edit</button>
            <input type="text" />
            <button >Delete</button>
        </form>

    </div>);
}

export default CategoryEdit;