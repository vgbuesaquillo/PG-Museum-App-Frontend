import './styles/AdminProfile.css';
import { useEffect } from 'react';
import image from '../images/signup.svg'
import Cookies from 'universal-cookie';
import { CgProfile } from 'react-icons/cg';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import 'antd/dist/antd.min.css'
import { Avatar } from 'antd';

const cookies = new Cookies();

function AdminProfile() {

    const user = JSON.parse(localStorage.session)
    var aja = user[0].username 
    var bandera = false
    aja.slice(aja.length-10,aja.length)==='@gmail.com'? bandera = true: console.log(bandera)
    console.log(user)
    useEffect(() => {
        if (!localStorage.getItem("session")) {
            window.location.href = "./login";
        }
    })

    const handleDeleteUser = () => {

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

                    fetch(`http://localhost:5040/user/delete/${user.id}`, {
                        method: 'DELETE',
                        mode: 'cors',
                        // headers: {
                        //     'x-access-token': `${user.accessToken}`,
                        //     'Content-Type': 'application/json',
                        // },
                    }).then(response => {
                        // console.log(response);
                        cookies.remove('session')
                        Swal.fire("Poof! Your account has been deleted successfully!", {
                            icon: "success",
                        }).then(reload => { window.location.href = '/' })

                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    return null
                }
            });
    }

    const DeleteUserGoogle = ()=>{

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

                fetch(`http://localhost:5040/delete/google/${user.id}`,{
                    method: 'DELETE',
                    mode: 'cors',
                    body: JSON.stringify({
                        id: user.id,
                    }),
                    headers: {
                            // 'x-access-token': `${user.accessToken}`,
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


    return (
        <div className="admin-profile">
            <div className="admin-profile-top">
                <div>
                    <h1>Overview</h1>
                </div>
                <div className="admin-profile-top-info">
                    <div >
                        <h5>{user[0].email}</h5>
                        {
                            
                            user[0]?.roles?.includes('ROLE_ADMIN ') ? 
                            <button className="admin-profile-top-info-butt" onClick={bandera? DeleteUserGoogle: handleDeleteUser}> Eliminar cuenta</button> : null
                        }
                    </div>
                    { user[0]?.image ? <Avatar src={user[0]?.image} /> : <CgProfile/>}
                </div>
            </div>
            <div className="admin-profile-bot">
                <div className="admin-boxOne">
                    <div className="admin-info">
                        <section className="admin-info-at">
                            <h4>  informacion  </h4>
                            <b>Username {' ' + user[0].username}</b>
                            {/* <b>name: {' ' + user[0].name}</b> */}
                            <b>correo {' ' + user[0].email}</b>
                            <b>Tipo: {' ' + user[0].roles}</b>
                            {console.log(user[0])}
                            { 
                                user[0]?.roles[0] === "ROLE_ADMIN"? <div>
                                        <Link to={'new'}> <Button secondary>New Product</Button></Link>
                                        <Link to={'product-list'}> <Button secondary>Product List</Button></Link>
                                    </div>: null
                            }
                            
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
