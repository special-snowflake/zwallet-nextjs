import Link from 'next/link';
import {useEffect, useState} from 'react';
import Title from 'src/commons/components/Title';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import {loginAction} from 'src/redux/actions/auth';
import LeftContentStarter from 'src/commons/components/LeftContentStarter';

import style from 'src/commons/styles/Starter.module.css';
import phones from 'public/static/images/Phones.png';
import email from 'public/static/icons/mail.svg';
import lock from 'public/static/icons/lock.svg';
import eyeCrossed from 'public/static/icons/eye-crossed.svg';

import {validateLogin} from 'src/modules/validation/authValidation';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props) {
  console.log(props);
  const [conf, setConf] = useState({passwordType: 'password', submit: true});
  const initialError = {
    email: null,
    password: null,
  };
  const [errValidate, setErrValidate] = useState(initialError);

  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('email pass', e.target.email.value, e.target.password.value);
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const validation = validateLogin(body);

    if (!validation.error) {
      setErrValidate({initialError});
      props.dispatch(loginAction(body));
    }
    if (validation.error) {
      const valError = validation.error.details;
      valError.forEach((element) => {
        console.log('error element', element.message, typeof element.message);
        console.log(element.context.key);
        initialError = {
          ...initialError,
          [element.context.key]: element.message,
        };
      });
      setErrValidate(initialError);
    }
  };
  useEffect(() => {
    console.log('this is use effect', props.auth);
    if (props.auth.isPending && conf.submit === true) {
      setConf({
        ...conf,
        submit: false,
      });
    }
    if (props.auth.isFulfilled) {
      console.log('isi auth', props.auth);
      toast.success('Login Succes.', {position: 'top-right'});
      console.log(props.auth);
      if (props.auth.userData.pin === null) {
        router.push('/auth/pin');
      }
      router.push('/dashboard');
    }
    if (props.auth.isRejected && conf.submit === false) {
      console.log(props.auth.err);
      const error = props.auth.err;
      toast.error(error.msg, {position: 'top-right'});
      setConf({
        ...conf,
        submit: true,
      });
    }
  }, [props, conf, router]);
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
              <form onSubmit={handleLogin}>
                <div
                  className={`col-12 col-lg-10 col-xl-8 mx-auto px-5 ${style['starter-form']}`}>
                  <div className='row w-100 m-0 p-0'>
                    <div className={`col-12 ${style['input-wrapper']}`}>
                      <div className='position-relative'>
                        <input
                          className={`position-absolute ${
                            errValidate.email && errValidate.email !== null
                              ? `${style['error']}`
                              : ''
                          }`}
                          type='email'
                          name='email'
                          id='email'
                          placeholder='Enter your e-mail'
                        />
                        <div className={`${style['input-icon']}`}>
                          <Image src={email} alt='email' />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`col-12 mb-2 mt-1 ${style['form-msg-error']}`}>
                      {`${
                        errValidate.email && errValidate.email !== null
                          ? errValidate.email
                          : ''
                      }`}
                    </div>
                    <div className={`col-12 ${style['input-wrapper']}`}>
                      <div className='position-relative'>
                        <input
                          className={`position-absolute ${
                            errValidate.password &&
                            errValidate.password !== null
                              ? `${style['error']}`
                              : ''
                          }`}
                          type={conf.passwordType}
                          name='password'
                          id='password'
                          placeholder='Enter your password'
                        />
                        <div className={`${style['input-icon']}`}>
                          <Image src={lock} alt='password' />
                        </div>
                        <div
                          className={`position-absolute ${style['input-cross']}`}
                          onClick={() => {
                            if (conf.passwordType === 'password') {
                              setConf({
                                ...conf,
                                passwordType: 'text',
                              });
                            } else {
                              setConf({
                                ...conf,
                                passwordType: 'password',
                              });
                            }
                          }}>
                          <Image src={eyeCrossed} alt='see-password' />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`col-12 mb-2 mt-1 ${style['form-msg-error']}`}>
                      {`${
                        errValidate.password && errValidate.password !== null
                          ? errValidate.password
                          : ''
                      }`}
                    </div>
                    <div className='col-12'>
                      <div
                        className={`w-100 text-end ${style['forgot-password']}`}>
                        <Link href={'/auth/forgotpassword'}>Forget Password?</Link>
                      </div>
                      <button
                        className={`btn btn-md ${style['starter-btn']} mb-2`}
                        disabled={!conf.submit}>
                        Login
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

export default connect(mapStateToProps)(Login);
