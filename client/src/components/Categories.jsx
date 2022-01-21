import './styles/Categories.css'

const Categories = () => {
    return (<>
        {/* <div className="categories">
            <button className='categories__button'>All</button>
            <button className='categories__button'>Painting</button>
            <button className='categories__button'>Medieval art</button>
            <button className='categories__button'>Sculture</button>
        </div> */}
        <div className="categories">
            <select size="4" className='categories__select'>
                <option className='categories__select__option' selected>All</option>
                <option className='categories__select__option'>Painting</option>
                <option className='categories__select__option'>Medieval art</option>
                <option className='categories__select__option'>Sculture</option>
            </select>
        </div>
    </>
    );
}

export default Categories;