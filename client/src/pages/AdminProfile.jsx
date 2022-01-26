import './styles/AdminProfile.css';
import { useEffect } from 'react';
import image from '../images/signup.svg'
import Cookies from 'universal-cookie';
import {CgProfile} from 'react-icons/cg';

const cookies = new Cookies();

function AdminProfile(){

    const user = cookies.get('session')
    // const user ={
    //     email: "blueowl2794@gmail.com",
    //     familyName: "Olarte Molina",
    //     givenName: "Erik Santiago",
    //     googleId: "108572354537016537304",
    //     imageUrl: image,
    //     name: "Erik Santiago Olarte Molina",
    // };

    useEffect( ()=> {
        if(!cookies.get("session")){
            window.location.href = "./login";
        } 
    }) 

    const handleDeleteUser = ()=>{
    }
    

    return(
        <div className="admin-profile">
            <div className="admin-profile-top">
                <div>
                    <h1>Overview</h1>
                </div> 
                <div className="admin-profile-top-info">
                    <div >
                        <h5>{cookies.get('email')}</h5>
                        <button className="admin-profile-top-info-butt" onClick={handleDeleteUser}> Eliminar cuenta</button>
                    </div>
                    <CgProfile/>
                </div>
            </div>
            <div className="admin-profile-bot">
                <div className="admin-boxOne">
                    <div className="admin-info">
                        <section className="admin-info-at">
                            <h4>informacion</h4>
                            <b>Username {' ' + user.username}</b>
                            <b>correo {' ' + user.email}</b>
                            <b>Tipo: {' ' + user.roles}</b>
                            {/* <b>Fecha de registro: {' ' + cookies.get('registro')}</b> */}
                        </section>
                    </div>
                    <div className="admin-box">
                        <section className="admin-box-at">
                            <b>...</b>
                            
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </section>
                        <section className="admin-box-at">
                            <b>ordenes</b>
                            
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </section> 
                    </div>
                </div>
                <div className="admin-boxTwo">
                    <section>
                        <h4>historial</h4>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile;