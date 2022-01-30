import React, { useState, useEffect} from 'react'
import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import { Modal, Button, List, Avatar, Skeleton } from 'antd';
import Cookies from 'universal-cookie'
import './styles/NavBar.css'
import 'antd/dist/antd.css';
import {MdOutlineFavorite, MdHomeFilled, MdStore, MdOutlineLogout, MdAddBox} from 'react-icons/md'
import image from '../images/Group 1.svg'
import {RiFlashlightFill} from 'react-icons/ri'


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

  const cookies = new Cookies();
  const user = cookies.get('session')
  const users = process.env.REACT_APP_USERS;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState()

  useEffect(() => {
    fetch(`${users}`,{
      headers: {
        'x-access-token': `${user?.accessToken}`
      }
    })
    .then(data => data.json())
    .then(result => setState(result))
  },[])
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const handleLogout = () => {
    cookies.remove('session')
    window.location.href = '/'
  }

    return (
      <div className='navbar'>
            <div className='navbar__content'>
                <img src={image} alt="logo" className='navbar__logo'/>
                <div className='navigations'>
                    <div className='navigations--routes'>
                      <CustomLink to='/'><MdHomeFilled/></CustomLink>
                      <CustomLink to='/store'><MdStore/></CustomLink>
                      <CustomLink to='/favorite'><MdOutlineFavorite/></CustomLink> 
                    </div>

                    <div className='navigations--functions-admin'>
                      {
                        user?.roles.includes('ROLE_ADMIN') ? 
                        <Button type="link" icon={<MdAddBox style={{ fontSize: '28px'}} />} danger/> : null
                      }
                      {
                        user?.roles.includes('ROLE_ADMIN') ? 
                        <div>
                        <Button onClick={showModal} type="link" icon={<RiFlashlightFill style={{ fontSize: '28px'}} />} danger/>
                        <Modal title="Users List" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                          <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={state?.data?.filter(admin => admin.username !== 'admin')}
                            renderItem={item => (
                              <List.Item
                                actions={[<Button key="list-loadmore-edit" type="link" danger>delete</Button>, <Button key="list-loadmore-more" type="link">convert admin</Button>]}
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
                      </div> : null 
                      }
                    </div>


                </div>

                <div>
                  {
                    cookies.get('session') ?
                    <Button onClick={handleLogout} icon={<MdOutlineLogout style={{ fontSize: '28px', color: '#1572A1'}}/> } type="link"/> : null
                  }
                </div>
            </div>
        </div>
    );
}

export default NavBar;

