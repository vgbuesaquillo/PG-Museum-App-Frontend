import './styles/AdminProfile.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { CgProfile } from 'react-icons/cg';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import 'antd/dist/antd.min.css'
import { Avatar } from 'antd';
import { getAllOrder, filterState } from '../redux/actions/orderAction'
import OrdenCard from './OrdenCard';
import PurchaseHistory from '../components/userPage/PurchaseHistory';
import CategoriesAdmin from '../components/adminPage/CategoriesAdmin';

const cookies = new Cookies();
const url = process.env.REACT_APP_URL;

function AdminProfile() {
    const dispatch = useDispatch();
    const order = useSelector(state => state.orderReducer.allOrder);
    const stateFilter = useSelector(state => state.orderReducer.filterState);
    const user = JSON.parse(localStorage.session)

    var esEmail = user[0].username 
    var bandera = false
    esEmail.slice(esEmail.length - 10, esEmail.length) === '@gmail.com' ? bandera = true : console.log(bandera)

    useEffect(() => {
        dispatch(getAllOrder())

        if (!localStorage.getItem("session")) {
            window.location.href = "./login";
        }
    },[])
    
    function handleSelect(e) {
        e.preventDefault();
		dispatch(filterState((e.target.value)));
	}

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

                fetch(`${url}/user/delete/${user.id}`, {
                    method: 'DELETE',
                    mode: 'cors',
                }).then(response => {
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
                fetch(`${url}/delete/google/${user.id}`, {
                    method: 'DELETE',
                    mode: 'cors',
                    body: JSON.stringify({
                        id: user.id,
                    }),
                    headers: {
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
    
    return (
        <div className="admin-profile">
            <div className="admin-profile-top">
                <div>
                    <h1>Overview</h1>
                </div>
                <div className="admin-profile-top-info">
                    <div >
                        <h5>{user[0].email}</h5>
                        {console.log(user[0]?.roles)}
                        {
                            user[0]?.roles[0]?.includes('ROLE_ADMIN ') ? 
                            <button className="admin-profile-top-info-butt" onClick={bandera? DeleteUserGoogle: handleDeleteUser}> Eliminar cuenta</button> : null
                        }
                    </div>
                    {user[0]?.image ? <Avatar src={user[0]?.image} /> : <CgProfile />}
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
                            {
                                user[0]?.roles[0] === "ROLE_ADMIN" ?
                                    <CategoriesAdmin /> : null
                            }
                            <b>...</b>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </section>
                        <section className="admin-box-at">
                            {/* <b>ordenes</b> */}
                            <select className="select_option" name="select" id="" onChange={(e) => handleSelect(e)}>
                                <option value="ordenes">ordenes</option>
                                <option value="creada">creada</option>
                                <option value="procesando">procesando</option>
                                <option value="completa">completa</option>
                                <option value="cancelada">cancelada</option>
                            </select>   
                            {

                                stateFilter.length > 0 && user[0].roles[0] === 'ROLE_ADMIN'?
                                stateFilter.map((o)=>{
                                    return <OrdenCard key={o.id} pedido={o.id}  inicio={o.date} estado={o.state}  productoId= {o.artworksId}/>
                                }):
                                order && user[0].roles[0] === 'ROLE_ADMIN'?
                                order.map((o)=>{
                                    return <OrdenCard key={o.id} pedido={o.id}  inicio={o.date} estado={o.state}  productoId= {o.artworksId}/>

                                })
                                : null
                            }

                        </section>
                    </div>
                </div>
                <div className="admin-boxTwo">
                    <section>
                        <PurchaseHistory />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile;
