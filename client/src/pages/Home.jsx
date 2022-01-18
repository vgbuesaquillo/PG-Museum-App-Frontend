import TopBar from '../components/TopBar'
import Landing from '../components/Landing'
import './styles/Home.css'
import Cards from '../components/Cards';

const Home = () => {
    return (<div className='home'>
        <TopBar />
        <Landing />
        <Cards />
    </div>);
}

export default Home;