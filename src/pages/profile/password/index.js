import {connect} from 'react-redux';
import React, {useState} from 'react';

import Title from 'src/commons/components/Title';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';

import {validatePassword} from 'src/modules/validation/authValidation';
import {updatePassword} from 'src/modules/api/users';

import styles from 'src/commons/styles/Home.module.css';
import profileCss from 'src/commons/styles/Profile.module.css';

import {toast} from 'react-toastify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLock, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from 'next/router';

function Password(props) {
  const currentPassword = React.createRef();
  const newPassword = React.createRef();
  const repeatNewPassword = React.createRef();

  const [icon, setIcon] = useState([faEye, faEye, faEye]);
  const [conf, setConf] = useState(['password', 'password', 'password']);
  const [isDisabled, setIsDisabled] = useState(true);
  const [errValidate, setErrValidate] = useState([null, null, null]);

  const router = useRouter();

  const toggleInput = (idx) => {
    if (icon[idx] === faEye) {
      let newIcons = [...icon];
      newIcons[idx] = faEyeSlash;
      setIcon(newIcons);
      let newConf = [...conf];
      newConf[idx] = 'text';
      setConf(newConf);
    } else {
      let newIcons = [...icon];
      newIcons[idx] = faEye;
      setIcon(newIcons);
      let newConf = [...conf];
      newConf[idx] = 'password';
      setConf(newConf);
    }
  };

  const debounce = (func, timeout = 2000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const onChangePassword = (e, idx) => {
    console.log('check input');
    const body = {
      password: e.target.value,
    };
    const validation = validatePassword(body);
    if (!validation.error) {
      console.log('password is ok');
      let newError = [...errValidate];
      newError[idx] = null;
      setErrValidate(newError);
      console.log(errValidate);
    }
    if (validation.error) {
      let newError = [...errValidate];
      newError[idx] = validation.error.details[0].message;
      setErrValidate(newError);
      console.log(errValidate);
    }
  };

  const onChangeRepeatPassword = (e) => {
    if (e.target.value !== newPassword.current.value) {
      let newError = [...errValidate];
      newError[2] = 'Please make sure your new password match';
      setErrValidate(newError);
      setIsDisabled(true);
    } else {
      let newError = [...errValidate];
      newError[2] = null;
      setErrValidate(newError);
      if (errValidate[0] === null && errValidate[1] === null) {
        setIsDisabled(false);
      }
    }
  };

  const handleUpdatePassword = () => {
    const token = props.token;
    const id = props.id;
    const body = {
      oldPassword: currentPassword.current.value,
      newPassword: newPassword.current.value,
      confirmPassword: repeatNewPassword.current.value,
    };
    console.log('body password', body);
    updatePassword(body, id, token)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.data.msg);
        router.push('/profile');
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.msg);
      });
  };

  const title = 'Change Password - Zwallet';

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
              {conf && (
                <div className={`${styles['transfer-wrapper']}`}>
                  <div className='row m-0 p-0'>
                    <div className='col-12'>
                      <div className='row m-0 m-0 '>
                        <div className='col-12 my-2'>
                          <div className='font-normal fw-bold'>
                            Change Password
                          </div>
                        </div>
                        <div className='col-12 my-2'>
                          <div className='w-50 font-normal color-grey'>
                            You must enter your current password and then type
                            your new password twice.
                          </div>
                        </div>

                        <div className='col-12 text-center mb-0 mt-5'>
                          <div className={profileCss.inputPasswordWrapper}>
                            <span className={profileCss.inputIcon}>
                              <FontAwesomeIcon icon={faLock} />
                            </span>
                            <input
                              type={conf[0]}
                              name='currentPassword'
                              placeholder='Current Password'
                              ref={currentPassword}
                              onChange={(e) => {
                                debounce(onChangePassword(e, 0));
                              }}
                            />
                            <span
                              className={profileCss.iconTail}
                              onClick={() => {
                                toggleInput(0);
                              }}>
                              <FontAwesomeIcon icon={icon[0]} />
                            </span>
                          </div>
                        </div>
                        <div className='col-12 mb-2'>
                          <div className={profileCss.errorWrapper}>
                            <span className='color-red font-small'>
                              {errValidate[0]}
                            </span>
                          </div>
                        </div>

                        <div className='col-12 text-center mt-2 mb-0'>
                          <div className={profileCss.inputPasswordWrapper}>
                            <span className={profileCss.inputIcon}>
                              <FontAwesomeIcon icon={faLock} />
                            </span>
                            <input
                              type={conf[1]}
                              name='newPassword'
                              placeholder='New Password'
                              ref={newPassword}
                              onChange={(e) => {
                                debounce(onChangePassword(e, 1));
                              }}
                            />
                            <span
                              className={profileCss.iconTail}
                              onClick={() => {
                                toggleInput(1);
                              }}>
                              <FontAwesomeIcon icon={icon[1]} />
                            </span>
                          </div>
                        </div>
                        <div className='col-12 mb-2'>
                          <div className={profileCss.errorWrapper}>
                            <span className='color-red font-small'>
                              {errValidate[1]}
                            </span>
                          </div>
                        </div>

                        <div className='col-12 text-center mt-2 mb-0'>
                          <div className={profileCss.inputPasswordWrapper}>
                            <span className={profileCss.inputIcon}>
                              <FontAwesomeIcon icon={faLock} />
                            </span>
                            <input
                              type={conf[2]}
                              name='repeatNewPassword'
                              placeholder='Repeat New Password'
                              ref={repeatNewPassword}
                              onChange={onChangeRepeatPassword}
                            />
                            <span
                              className={profileCss.iconTail}
                              onClick={() => {
                                toggleInput(2);
                              }}>
                              <FontAwesomeIcon icon={icon[2]} />
                            </span>
                          </div>
                        </div>
                        <div className='col-12 mb-5'>
                          <div className={profileCss.errorWrapper}>
                            <span className='color-red font-small'>
                              {errValidate[2]}
                            </span>
                          </div>
                        </div>

                        <div className='col-12 my-2 text-center'>
                          <div className={profileCss.buttonWrapper}>
                            <button
                              onClick={handleUpdatePassword}
                              disabled={isDisabled}
                              className={`btn ${styles['btn-blue']} w-100`}>
                              Change Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
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

export default connect(mapStateToProps)(Password);
