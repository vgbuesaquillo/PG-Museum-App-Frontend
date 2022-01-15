import "./styles/TopBar.css";
import {AiOutlineSearch} from 'react-icons/ai';
import {GrFilter} from 'react-icons/gr';
import {MdShoppingBasket} from 'react-icons/md';

function TopBar() {
    return (
        <div className="topbar">
            <div className="topbar__content">
                <div className="searchForm">
                    <AiOutlineSearch className="searchForm__icon" />
                    <input type="text" className="searchForm__input" placeholder="Search here..."/>
                    <GrFilter className="searchForm__icon" />
                </div>
                <div className='cart'>
                    <div className='cart__content'>
                        <MdShoppingBasket className='cart__icon'/>
                        <span>$0.00</span>
                    </div>
                </div>
                <div className='loginButtons'>
                    <button className='loginButtons__button'>Login</button>
                    <button className='loginButtons__button'>Create Account</button>
                </div>

            </div>
            
        </div>
    )
}

export default TopBar
