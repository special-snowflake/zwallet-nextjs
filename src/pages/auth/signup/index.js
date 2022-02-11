import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Image from 'next/image';

import style from 'src/commons/styles/Starter.module.css';
import {signUp} from 'src/modules/api/auth';
import {validateSignUp} from 'src/modules/validation/authValidation';
import Title from 'src/commons/components/Title';
import LeftContentStarter from 'src/commons/components/LeftContentStarter';

import person from 'public/static/icons/person.svg';
import email from 'public/static/icons/mail.svg';
import lock from 'public/static/icons/lock.svg';
import eyeCrossed from 'public/static/icons/eye-crossed.svg';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const router = useRouter();

  const [conf, setConf] = useState({
    passwordType: 'password',
  });

  const initialError = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  };

  const [errValidate, setErrValidate] = useState(initialError);

  const submitRegister = (e) => {
    e.preventDefault();
    const body = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const validateBody = validateSignUp(body);
    console.log('call validation', validateBody);

    if (!validateBody.error) {
      setErrValidate({initialError});
      signUp(body)
        .then((res) => {
          console.log(res);
          const msg =
            res.data.msg +
            '. Please check your email to activate your account.';
          toast.success(msg);
          router.push('/auth/login');
        })
        .catch((err) => {
          console.log(err.response);
          console.log(err.response.data.msg);
          toast.error(err.response.data.msg, {position: 'top-right'});
        });
    }
    if (validateBody.error) {
      const valError = validateBody.error.details;
      console.log(typeof valError, valError);
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
    console.log('val error', errValidate);
  }, [conf, errValidate]);

  return (
    <>
      <Title title='Join Zwallet' />
      <div className='main container-fluid px-0'>
        <div className='row mx-0 my-0'>
          <section
            className={`d-none d-md-block col-12 col-md-6 ${style['starter-left']} ${style['starter-bg-siwrl']}`}>
            <LeftContentStarter />
          </section>
          <section
            className={`col-12 col-md-6 pt-2 pt-xl-3 pt-xxl-5 ${style['section-right']}`}>
            <div className='row h-100 align-middle'>
              <div className='col-12 col-lg-10 col-xl-9 col-xxl-8 mx-auto px-5'>
                <p className={`fw-bold ${style['starter-msg']}`}>
                  Start Accessing Banking Needs With All Devices and All
                  Platforms With 30.000+ Users
                </p>
                <p className={`${style['starter-sub-msg']} mt-xxl-5 mt-xl-2`}>
                  Transfering money is eassier than ever, you can access Zwallet
                  wherever you are. Desktop, laptop, mobile phone? We cover all
                  of that for you!
                </p>
              </div>
              <form onSubmit={submitRegister}>
                <div
                  className={`col-12 col-lg-10 col-xl-9 col-xxl-8 mx-auto px-5 ${style['starter-form']}`}>
                  <div className='row w-100 m-0 p-0'>
                    <div className={`col-12 ${style['input-wrapper']}`}>
                      <div className='position-relative'>
                        <input
                          className={`position-absolute ${
                            errValidate.firstName &&
                            errValidate.firstName !== null
                              ? `${style['error']}`
                              : ''
                          }`}
                          type='text'
                          name='firstName'
                          id='firstName'
                          placeholder='Enter your first name'
                        />
                        <div className={`${style['input-icon']}`}>
                          <Image src={person} alt='firstName' />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`col-12 mb-2 mt-1 ${style['form-msg-error']}`}>
                      {`${
                        errValidate.firstName && errValidate.firstName !== null
                          ? errValidate.firstName
                          : ''
                      }`}
                    </div>
                    <div className={`col-12 ${style['input-wrapper']}`}>
                      <div className='position-relative'>
                        <input
                          className={`position-absolute ${
                            errValidate.lastName &&
                            errValidate.lastName !== null
                              ? `${style['error']}`
                              : ''
                          }`}
                          type='text'
                          name='lastName'
                          id='lastName'
                          placeholder='Enter your last name'
                        />
                        <div className={`${style['input-icon']}`}>
                          <Image src={person} alt='lastName' />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`col-12 mb-2 mt-1 ${style['form-msg-error']}`}>
                      {`${
                        errValidate.lastName && errValidate.lastName !== null
                          ? errValidate.lastName
                          : ''
                      }`}
                    </div>
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
                    <div className='col-12 mt-5'>
                      <button
                        className={`btn btn-md ${style['starter-btn']} mb-2 mt-2`}
                        type='submit'
                        // disabled={!conf.submit}
                      >
                        Sign Up
                      </button>
                      <div className='w-100 text-center'>
                        {`Already have an account?`}
                        <Link href={'/auth/login'}> Login</Link>
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
