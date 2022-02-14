import Link from 'next/link';
import {useState} from 'react';
import Title from 'src/commons/components/Title';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import LeftContentStarter from 'src/commons/components/LeftContentStarter';

import style from 'src/commons/styles/Starter.module.css';
import email from 'public/static/icons/mail.svg';

import {validateEmail} from 'src/modules/validation/authValidation';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {forgotPassword} from 'src/modules/api/auth';

function ForgetPassword(props) {
  console.log(props);
  const initialError = {
    email: null,
  };
  const [errValidate, setErrValidate] = useState(initialError);
  const [isDisabled, setIsDesabled] = useState(true);

  const onChangeEmail = (e) => {
    const body = {
      email: e.target.value,
    };
    const validation = validateEmail(body);
    if (!validation.error) {
      setIsDesabled(false);
      setErrValidate({email: null});
    }
    if (validation.error) {
      setIsDesabled(true);
      setErrValidate({email: validation.error.details[0].message});
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

  const router = useRouter();
  const handleForgetPassword = (e) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_DOMAIN + '/auth/reset-password';
    const body = {
      email: e.target.email.value,
      linkDirect: url,
    };
    console.log(body);
    forgotPassword(body)
      .then((res) => {
        toast.success('Please check your email to reset password');
        console.log(res);
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
              <form onSubmit={handleForgetPassword}>
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
                          onChange={debounce(onChangeEmail)}
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
                    <div
                      className={`col-12 mb-2 mt-1 ${style['form-msg-error']}`}>
                      {`${
                        errValidate.password && errValidate.password !== null
                          ? errValidate.password
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
