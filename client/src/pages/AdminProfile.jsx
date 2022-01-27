import './styles/AdminProfile.css';
import { useEffect } from 'react';
import image from '../images/signup.svg'
import Cookies from 'universal-cookie';
import {CgProfile} from 'react-icons/cg';
import Swal from 'sweetalert2'

const cookies = new Cookies();

function AdminProfile(){

    const user = cookies.get('session')

    useEffect( ()=> {
        if(!cookies.get("session")){
            window.location.href = "./login";
        }
    })

    const handleDeleteUser = ()=>{

        Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your account!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            showCancelButton: true,
          })
          .then((willDelete) => {
            if (willDelete.isConfirmed) {

                fetch(`http://localhost:5040/users/${user.id}`,{
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                            'x-access-token': `${user.accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }).then(response => {
                        console.log(response);
                        cookies.remove('session')
                        Swal.fire("Poof! Your account has been deleted successfully!", {
                            icon: "success",
                        }).then(reload => { window.location.href = '/'})

                    }).catch(error => {
                            console.log(error);
                    })
            } else {
              return null
            }
        });
    }


    return(
        <div className="admin-profile">
            <div className="admin-profile-top">
                <div>
                    <h1>Overview</h1>
                </div>
                <div className="admin-profile-top-info">
                    <div >
                        <h5>{user.email}</h5>
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