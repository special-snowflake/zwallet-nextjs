import Link from 'next/link';
import React, {useState} from 'react';
import Title from 'src/commons/components/Title';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import LeftContentStarter from 'src/commons/components/LeftContentStarter';

import {resetPassword} from 'src/modules/api/auth';
import {validatePassword} from 'src/modules/validation/authValidation';

import style from 'src/commons/styles/Starter.module.css';
import lock from 'public/static/icons/lock.svg';
import eyeCrossed from 'public/static/icons/eye-crossed.svg';

import {toast} from 'react-toastify';

function ForgetPassword(props) {
  const newPassRef = React.createRef();
  const confirmNewPassRef = React.createRef();
  const [conf, setConf] = useState(['password', 'password']);
  const [errValidate, setErrValidate] = useState([null, null]);
  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();

  const onChangeNewPassword = (e) => {
    const body = {
      password: e.target.value,
    };
    const validation = validatePassword(body);
    console.log(validation);
    if (!validation.error) {
      let newErr = [...errValidate];
      newErr[0] = null;
      setErrValidate(newErr);
    }
    if (validation.error) {
      console.log('error pass');
      let newErr = [...errValidate];
      newErr[0] = validation.error.details[0].message;
      setErrValidate(newErr);
    }
  };

  const onChangeResetPassword = (e) => {
    if (e.target.value !== newPassRef.current.value) {
      let newError = [...errValidate];
      newError[1] = 'Please make sure your new password match';
      setErrValidate(newError);
      setIsDisabled(true);
    } else {
      let newError = [...errValidate];
      newError[1] = null;
      setErrValidate(newError);
      if (errValidate[0] === null) {
        setIsDisabled(false);
      }
    }
  };

  const debounce = (func, timeout = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const {id} = router.query;
    const body = {
      keysChangePassword: id,
      newPassword: newPassRef.current.value,
      confirmPassword: confirmNewPassRef.current.value,
    };
    console.log(body);
    resetPassword(body)
      .then((res) => {
        toast.success('Password reset successfull');
        console.log(res);
        router.push('/auth/login');
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
        console.log(err);
      });
  };
  return (
    <>
      <Title title={'Login - Zwallet'} />
      <div className='main container-fluid px-0'>
        <div className='row mx-0 my-0'>
          <section
            className={`d-none d-md-block col-12 col-md-6 ${style['starter-left']} ${style['starter-bg-siwrl']}`}>
            <LeftContentStarter />
          </section>
          <section className={`col-12 col-md-6 pt-5 ${style['section-right']}`}>
            <div className='row h-100 align-middle'>
              <div className='col-12 col-lg-10 col-xl-8 mx-auto px-5 mb-5'>
                <p className={`fw-bold ${style['starter-msg']}`}>
                  Start Accessing Banking Needs With All Devices and All
                  Platforms With 30.000+ Users
                </p>
                <p className={`${style['starter-sub-msg']} mt-5`}>
                  Transfering money is eassier than ever, you can access Zwallet
                  wherever you are. Desktop, laptop, mobile phone? We cover all
                  of that for you!
                </p>
              </div>
              <form onSubmit={handleResetPassword}>
                <div
                  className={`col-12 col-lg-10 col-xl-8 mx-auto px-5 ${style['starter-form']}`}>
                  <div className='row w-100 m-0 p-0'>
                    <div className={`col-12 ${style['input-wrapper']}`}>
                      <div className='position-relative'>
                        <input
                          className={`position-absolute ${
                            errValidate[0] && errValidate[0] !== null
                              ? `${style['error']}`
                              : ''
                          }`}
                          type={conf[0]}
                          name='newPassword'
                          id='newPassword'
                          ref={newPassRef}
                          onChange={debounce(onChangeNewPassword)}
                          placeholder='Create new password'
                        />
                        <div className={`${style['input-icon']}`}>
                          <Image src={lock} alt='password' />
                        </div>
                        <div
                          className={`position-absolute ${style['input-cross']}`}
                          onClick={() => {
                            if (conf[0] === 'password') {
                              let newConf = [...conf];
                              newConf[0] = 'text';
                              setConf(newConf);
                            } else {
                              let newConf = [...conf];
                              newConf[0] = 'password';
                              setConf(newConf);
                            }
                          }}>
                          <Image src={eyeCrossed} alt='see-password' />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`col-12 mb-2 mt-1 ${style['form-msg-error']}`}>
                      {`${
                        errValidate[0] && errValidate[0] !== null
                          ? errValidate[0]
                          : ''
                      }`}
                    </div>
                    <div className={`col-12 ${style['input-wrapper']}`}>
                      <div className='position-relative'>
                        <input
                          className={`position-absolute ${
                            errValidate[1] && errValidate[1] !== null
                              ? `${style['error']}`
                              : ''
                          }`}
                          type={conf[1]}
                          name='confirmPassword'
                          ref={confirmNewPassRef}
                          id='confirmPassword'
                          placeholder='Confirm new password'
                          onChange={debounce(onChangeResetPassword)}
                        />
                        <div className={`${style['input-icon']}`}>
                          <Image src={lock} alt='password' />
                        </div>
                        <div
                          className={`position-absolute ${style['input-cross']}`}
                          onClick={() => {
                            if (conf[1] === 'password') {
                              let newConf = [...conf];
                              newConf[1] = 'text';
                              setConf(newConf);
                            } else {
                              let newConf = [...conf];
                              newConf[1] = 'password';
                              setConf(newConf);
                            }
                          }}>
                          <Image src={eyeCrossed} alt='see-password' />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`col-12 mb-2 mt-1 ${style['form-msg-error']}`}>
                      {`${
                        errValidate[1] && errValidate[1] !== null
                          ? errValidate[1]
                          : ''
                      }`}
                    </div>
                    <div className='col-12'>
                      <button
                        className={`btn btn-md ${style['starter-btn']} mb-2`}
                        disabled={isDisabled}>
                        Confirm
                      </button>
                      <div className='w-100 text-center'>
                        {`Don’t have an account? Let’s`}
                        <Link href={'/auth/signup'}> Sign Up</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ForgetPassword);
