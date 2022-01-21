import './styles/Categories.css'

const Categories = () => {
    return (<>
        <div className="categories">
            <select size="4" defaultValue="all" className='categories__select'>
                <option value="all" className='categories__select__option'>All</option>
                <option value="painting" className='categories__select__option'>Painting</option>
                <option value="medieval" className='categories__select__option'>Medieval art</option>
                <option value="sculpture" className='categories__select__option'>Sculpture</option>
            </select>
        </div>
    </>
    );
}

export default Categories;