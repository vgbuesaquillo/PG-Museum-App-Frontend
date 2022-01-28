import './styles/AdminProfile.css';
import { useEffect } from 'react';
import image from '../images/signup.svg'
import Cookies from 'universal-cookie';
import { CgProfile } from 'react-icons/cg';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const cookies = new Cookies();

function AdminProfile() {

  const user = cookies.get('session')
  // const user ={
  //     email: "blueowl2794@gmail.com",
  //     familyName: "Olarte Molina",
  //     givenName: "Erik Santiago",
  //     googleId: "108572354537016537304",
  //     imageUrl: image,
  //     name: "Erik Santiago Olarte Molina",
  // };

  useEffect(() => {
    if (!cookies.get("session")) {
      window.location.href = "./login";
    }
  })

  const handleDeleteUser = () => {
  }


  return (
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
          <CgProfile />
        </div>
      </div>
      <div className="admin-profile-bot">
        <div className="admin-boxOne">
          <div className="admin-info">
            <section className="admin-info-at">
              <h4>informacion</h4>
              <b>Username: {user.username}</b>
              <b>correo: {user.email}</b>
              <b>Tipo: {user.roles}</b>
              <div>
                <Link to={'new'}> <Button secondary>New Product</Button></Link>
                <Link to={'product-list'}> <Button secondary>Product List</Button></Link>
              </div>
            </section>
          </div>
          <div className="admin-box">
            <section className="admin-box-at">

            </section>
            <section className="admin-box-at">
              <b>ordenes</b>

            </section>
          </div>
        </div>
        <div className="admin-boxTwo">
          <section>
            <h4>historial</h4>

          </section>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile;