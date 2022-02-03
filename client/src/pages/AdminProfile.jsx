import './styles/AdminProfile.css';
import { useEffect } from 'react';
// import image from '../images/signup.svg'
import Cookies from 'universal-cookie';
import { CgProfile } from 'react-icons/cg';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import 'antd/dist/antd.min.css'
import { Avatar } from 'antd';

import OrdenCard from './OrdenCard';
import PurchaseHistory from '../components/userPage/PurchaseHistory';
import CategoriesAdmin from '../components/adminPage/CategoriesAdmin';




function AdminProfile() {
    const cookies = new Cookies();
    const user = JSON.parse(localStorage.session)
    var aja = user[0].username 
    var bandera = false
    aja.slice(aja.length - 10, aja.length) === '@gmail.com' ? bandera = true : console.log(bandera)
    console.log(user[0])
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

    const DeleteUserGoogle = () => {

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

                    fetch(`http://localhost:5040/delete/google/${user.id}`, {
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
                        }).then(reload => { window.location.href = '/' })

                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    return null
                }
            });
    }
    var ordenes = [
        {
            fechaOrden: "31/01/2022",
            numeroOden:1000000,
            estado:"creada",
            productoId:6000000
        },
        {
            fechaOrden: "31/01/2022",
            numeroOden: 2000000,
            estado:"procesando",
            productoId:6000000
        },
        {
            fechaOrden: "31/01/2022",
            numeroOden: 3000000,
            estado:"cancelada",
            productoId:6000000
        },
        {
            fechaOrden: "31/01/2022",
            numeroOden: 4000000,
            estado:"completa",
            productoId:6000000
        },
        {
            fechaOrden: "31/01/2022",
            numeroOden: 5000000,
            estado:"creada",
            productoId:6000000
        }
    ]

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
                            <CategoriesAdmin />
                            <b>...</b>

                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </section>
                        <section className="admin-box-at">
                            <b>ordenes</b>
                            {
                                ordenes && user[0].roles[0] === 'ROLE_ADMIN'?
                                ordenes.map((o)=>{
                                    return <OrdenCard key={o.productoId} pedido={o.numeroOden}  inicio={o.fechaOrden} estado={o.estado}  productoId= {o.productoId}/>
                                })
                                : null

                            }
                            
                        </section>
                    </div>
                </div>
                <div className="admin-boxTwo">
                    <section>
                        <PurchaseHistory/>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile;
