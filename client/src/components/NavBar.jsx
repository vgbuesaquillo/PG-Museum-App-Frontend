import React, { useState, useEffect} from 'react'
import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import { Modal, Button, List, Avatar, Skeleton } from 'antd';
import Cookies from 'universal-cookie'
import { useDispatch } from 'react-redux';
import './styles/NavBar.css'
import 'antd/dist/antd.min.css'
import {MdOutlineFavorite, MdHomeFilled, MdStore, MdOutlineLogout, MdAddBox} from 'react-icons/md'
import image from '../images/Group 1.svg'
import {RiFlashlightFill} from 'react-icons/ri'
import Swal from 'sweetalert2'
import { getAllGallery} from '../redux/actions/galleryActions'


const url = process.env.REACT_APP_URL;
function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <div>
        <Link
          style={{ color: match ? "#94B3FD" : "rgb(175, 175, 175)", fontSize: 23, backgroundColor: match ? '#94b3fd2a': 'rgb(185, 185, 185, 0.15)', borderRadius: '100px' , padding: '5px', margin: '0px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          to={to}
          {...props}
        >
          {children}
        </Link>
      </div>
    );
}

const NavBar = () => {

  // const cookies = new Cookies();
  // const users = process.env.REACT_APP_USERS;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState()
  const [ok, setOk] = useState(null)
  const dispatch = useDispatch();
  const user = localStorage?.session ? JSON.parse(localStorage.session) : null

  useEffect(() => {
    fetch(`${url}/user/all`)
    .then(data => data.json())
    .then(result => setState(result))
    dispatch(getAllGallery())
  },[isModalVisible, ok])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('session')
    window.location.href = '/'
  }

  const handleAdmin = { roles: ["admin"]}
  const userToAdmin = (id) => {
    // console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Convert to Admin'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${url}/user/put/${id}`,{
          method: 'PUT',
          body: JSON.stringify(handleAdmin),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(data => data.json())
        .then(result => result ?
          Swal.fire(
            'User converted!',
            `${result.message}`,
            'success'
          ).then(result => setOk(id)) :
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        
        )
      }
    })
    
  }

  const deleteUser = (id) => {
    fetch(`${url}/user/delete/${id}`, {
      method: 'DELETE'
    })
    .then(data => data.json())
    .then(result => result ? 
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          ).then(result => setOk(id))
        }
      }) :
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    )
  }

    return (
      <div className='navbar'>
            <div className='navbar__content'>
                <img src={image} alt="logo" className='navbar__logo'/>
                <div className='navigations'>
                    <div className='navigations--routes'>
                      <CustomLink to='/'><MdHomeFilled/></CustomLink>
                      {
                        user !== null ? !user[0]?.roles?.includes('ROLE_ADMIN') ?
                        <CustomLink to='/store'><MdStore/></CustomLink> : null : <CustomLink to='/store'><MdStore/></CustomLink>
                      }
                      {/* <CustomLink to='/favorite'><MdOutlineFavorite/></CustomLink>  */}

                    </div>

                    <div className='navigations--functions-admin'>
                      {
                        user !== null ? user[0]?.roles?.includes('ROLE_ADMIN') ?
                        <Button type="link" icon={<MdAddBox style={{ fontSize: '28px'}} />} danger/> : null : null
                      }
                      {
                        user !== null ? user[0]?.roles?.includes('ROLE_ADMIN') ?
                        <div>
                        <Button onClick={showModal} type="link" icon={<RiFlashlightFill style={{ fontSize: '28px'}} />} danger/>
                        <Modal title="Users List" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                          <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            // FALTA VALIDAR PARA SACAR A TODOS LOS ADMINS DE ESTA LISTA Y QUE EL BOTON CONVERT ADMIN YA NO SE VUELVA A CLICKEAR
                            // dataSource={state?.data?.filter(admin => admin?.roles?.includes('ROLE_ADMIN'))}

                            dataSource={state?.data?.filter(admin => admin?.username !== 'admin')}
                            renderItem={item => (
                              <List.Item
                                actions={[
                                  <Button key="list-loadmore-edit" type="link" danger onClick={() => deleteUser(item.id)}>delete</Button>, 
                                  <Button key="list-loadmore-more" type="link" onClick={() => userToAdmin(item.id)}>convert admin</Button>
                                ]}
                              >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                  <List.Item.Meta
                                    avatar={<Avatar src={item.image} />}
                                    title={<label>{item.name}</label>}
                                  />
                                </Skeleton>
                              </List.Item>
                            )}
                          />
                        </Modal>
                      </div> : null : null
                      }
                    </div>


                </div>

                <div>
                  {
                    localStorage?.session ?
                    <Button onClick={handleLogout} icon={<MdOutlineLogout style={{ fontSize: '28px', color: '#1572A1'}}/> } type="link"/> : null
                  }
                </div>
            </div>
        </div>
    );
}

export default NavBar;

