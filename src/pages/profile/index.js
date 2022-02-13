import Image from 'next/image';
import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';

import Title from 'src/commons/components/Title';
import LoadingComponent from 'src/commons/components/LoadingComponent';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';

import {logout} from 'src/modules/api/auth';
import {updateImageUser} from 'src/modules/api/users';
import {getDataByID} from 'src/modules/api/users';
import {logoutAction} from 'src/redux/actions/auth';
import {updateDataUser} from 'src/redux/actions/users';

import {toast} from 'react-toastify';
import styles from 'src/commons/styles/Home.module.css';
import profileCss from 'src/commons/styles/Profile.module.css';
import modalsCss from 'src/commons/styles/Modals.module.css';
import defaultProfile from 'public/static/images/default.jpg';


function Profile(props) {
  const inputFileRef = React.createRef();

  const inputImage = () => {
    inputFileRef.current.click();
    console.log('input file');
  };

  const handleFileChange = (e) => {
    const id = props.id;
    const token = props.token;
    console.log('handle change', e);
    const body = new FormData();
    body.append('image', e.target.files[0]);
    console.log;
    updateImageUser(body, id, token)
      .then((res) => {
        toast.success('Image Updated');
        getDataByID(id, token)
          .then((res) => {
            props.dispatch(updateDataUser(res.data.data));
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.msg);
      });
  };

  const [modaleLogout, setModaleLogout] = useState({show: false});
  const [image, setImage] = useState(defaultProfile);
  console.log('props profile', props);
  const host = process.env.NEXT_PUBLIC_HOST;
  const title = props.userData
    ? `${props.userData.userData.firstName} ${props.userData.userData.lastName} - Zwallet`
    : 'Profile - Zwallet';
  console.log('userdata profile', props.userData);

  const router = useRouter();

  const hanndleLogout = () => {
    if (props.token) {
      logout(props.token)
        .then((response) => {
          console.log('logout success', response);
        })
        .catch((err) => {
          console.log('logout failed', err);
        });
    }
    props.dispatch(logoutAction());
    localStorage.clear('persist:root');
    toast.success('Logout Success');
    router.push('/auth/login');
  };

  const showLogout = () => {
    setModaleLogout({
      show: true,
    });
  };
  useEffect(() => {
    if (props.userData) {
      if (
        props.userData.userData.image &&
        props.userData.userData.image !== null
      ) {
        const img = host + '/uploads/' + props.userData.userData.image;
        setImage(img);
      }
    }
  }, []);
  useEffect(() => {
    if (props.userData) {
      if (
        props.userData.userData.image &&
        props.userData.userData.image !== null &&
        image !== props.userData.image
      ) {
        const img = host + '/uploads/' + props.userData.userData.image;
        setImage(img);
      }
    }
  }, [props]);

  return (
    <>
      <Title title={title} />
      <Header />
      <main className='container-fluid'>
        <div
          className={`row ${styles['dashboard-wrapper']} justify-content-center`}>
          <aside className={`col-12 col-md-4 col-xl-3 pe-3`}>
            <SideNavigation active='profile' />
          </aside>
          <section className='col-12 col-md-8 col-xl-7 ps-3'>
            <div className={`${styles['right-content']} h-100`}>
              <div className={`${styles['transfer-wrapper']}`}>
                <div className='row m-0 p-0'>
                  <div className='col-12'>
                    <div className='row m-0 m-0 text-center'>
                      {props.userData ? (
                        <>
                          <div className='col-12 my-2'>
                            <div
                              className={`cursor-pointer ${profileCss.userImageWrapper}`}
                              onClick={inputImage}>
                              <Image
                                src={image}
                                alt='user profile'
                                layout='fill'
                                objectFit='cover'
                                placeholder='blur'
                                blurDataURL={defaultProfile}
                                priority={true}
                                onError={() => {
                                  setImage(defaultProfile);
                                }}
                              />
                            </div>
                          </div>
                          <input
                            type='file'
                            name='image'
                            hidden={true}
                            ref={inputFileRef}
                            onChange={(e) => {
                              handleFileChange(e);
                            }}
                          />
                          <div className={`my-1 color-grey font-normal`}>
                            <div
                              className={`cursor-pointer ${profileCss.profileEditBtn}`}
                              onClick={inputImage}>
                              Edit
                            </div>
                          </div>
                          <div className='fw-bold font-header'>
                            {props.userData.userData.firstName}{' '}
                            {props.userData.userData.lastName}
                          </div>
                          <div className='font-normal color-grey my-2'>
                            {props.userData.userData.noTelp
                              ? props.userData.userData.noTelp
                              : '-'}
                          </div>
                          <div className='col-12 cursor-pointer'>
                            <Link href={'/profile/detail'} passHref={true}>
                              <div className={`${profileCss.boxInfo} my-2`}>
                                <div className='float-start'>
                                  Personal Information
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className='col-12 cursor-pointer'>
                            <Link href={'/profile/password'} passHref={true}>
                              <div className={`${profileCss.boxInfo} my-2`}>
                                <div className='float-start'>
                                  Change Password
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className='col-12 cursor-pointer'>
                            <Link href={'/profile/pin'} passHref={true}>
                              <div className={`${profileCss.boxInfo} my-2`}>
                                <div className='float-start'>Change PIN</div>
                              </div>
                            </Link>
                          </div>
                          <div className='col-12 cursor-pointer'>
                            <div
                              className={`${profileCss.boxInfo} mt-2 mb-5`}
                              onClick={showLogout}>
                              <div className='float-start'>Logout</div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <LoadingComponent />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      {/* Modal logout */}
      <Modal show={modaleLogout.show}>
        <Modal.Header>
          <p className={modalsCss['header']}>Logout</p>
          <button
            type='button'
            className={`${modalsCss['close-btn']}`}
            data-bs-dismiss='modal'
            aria-label='close'
            onClick={() => {
              setModaleLogout({
                show: false,
              });
            }}></button>
        </Modal.Header>
        <Modal.Body>
          <p className='color-grey text-center font-normal'>
            Are you sure you want to Logout?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`btn ${styles['btn-white']} float-start`}
            onClick={() => {
              setModaleLogout({
                show: false,
              });
            }}>
            Cancel
          </button>
          <button
            className={`btn ${styles['btn-blue']}`}
            onClick={hanndleLogout}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token,
    id: state.auth.userData.id,
    userData: state.users.data,
  };
};

export default connect(mapStateToProps)(Profile);
