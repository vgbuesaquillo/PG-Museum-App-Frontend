import './styles/AdminProfile.css';
import image from '../images/signup.svg'

function AdminProfile(){
    const user ={
        email: "blueowl2794@gmail.com",
        familyName: "Olarte Molina",
        givenName: "Erik Santiago",
        googleId: "108572354537016537304",
        imageUrl: image,
        name: "Erik Santiago Olarte Molina",
        
    };

    return(
        <div className="admin-profile">
            <div className="admin-profile-top">
                <div>
                    <h1>Overview</h1>
                </div> 
                <div className="admin-profile-top-info">
                    <div >
                        <h5>{user.email}</h5>
                        <button className="admin-profile-top-info-butt"> eleminar cuenta</button>
                    </div>
                    <img src={user.imageUrl} alt="img" />
                </div>
            </div>
            <div className="admin-profile-bot">
                <div className="admin-boxOne">
                    <div className="admin-info">
                        <section className="admin-info-at">
                            <h4>informacion</h4>
                            <b>Username {' ' +user.givenName}</b>
                            <b>correo {' ' + user.email}</b>
                            <b>Tipo: Vendedor</b>
                            <b>Fecha de registro: 18/01/2022</b>
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