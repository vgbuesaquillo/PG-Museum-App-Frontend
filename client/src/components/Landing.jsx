import './styles/Landing.css'
import landing from '../images/landing.svg'

const Landing = () => {
    return (
        <div className="landing">
            <div className='landing__text'>
                <p className='landing__text--in'>Find interesting works of art</p>
                <p className='landing__text--midle'>in Museum </p>
                <p className='landing__text--end'>and take them with you</p>
            </div>
            <div className='landing__image'>
                <img src={landing} width="50%" alt="#" className="image__image"></img>
            </div>
        </div>
    );
}

export default Landing;