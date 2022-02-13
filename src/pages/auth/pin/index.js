import Link from 'next/link';
import {useState} from 'react';
import Title from 'src/commons/components/Title';

import {updatePin} from 'src/modules/api/users';
import {updatePin as updatePinRedux} from 'src/redux/actions/auth';
import {validatePin} from 'src/modules/validation/userValidation';

import style from 'src/commons/styles/Starter.module.css';
import Image from 'next/image';
import phones from 'public/static/images/Phones.png';

import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';

function NewPin(props) {
  const initialError = {
    pin: null,
  };
  const [errValidate, setErrValidate] = useState(initialError);
  const [conf, setConf] = useState({
    submit: true,
  });
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const pin =
      e.target.pin1.value +
      e.target.pin2.value +
      e.target.pin3.value +
      e.target.pin4.value +
      e.target.pin5.value +
      e.target.pin6.value;
    const body = {pin};
    const validation = validatePin(body);
    console.log(validation);
    if (!validation.error) {
      setErrValidate({initialError});
      const {id, token} = props;
      updatePin(body, token, id)
        .then((response) => {
          console.log(response);
          props.dispatch(updatePinRedux(pin));
          router.push('/dashboard');
        })
        .catch((error) => {
          console.log(error.response);
          toast.error('Update Pin Failed.', {position: 'top-right'});0
        });
    }
    if (validation.error) {
      const errMsg = validation.error.details[0].message;
      setErrValidate({pin: errMsg});
    }
  };
  return (
    <>
      <Title title={'Create New Pin - Zwallet'} />
      <div className='main container-fluid px-0'>
        <div className='row mx-0 my-0'>
          <section
            className={`d-none d-md-block col-12 col-md-6 ${style['starter-left']} ${style['starter-bg-siwrl']}`}>
            <div className='row h-100 align-middle'>
              <div className='col-12 col-lg-10 col-xl-8 mx-auto px-0'>
                <div className='mt-5'>
                  <Link href={'/dashboard'} passHref>
                    <span className='logo-zwallet'>Zwallet</span>
                  </Link>
                </div>
              </div>
              <div className='col-12 col-lg-10 mx-auto px-5 mb-0'>
                <div className={`${style['image-phone']}`}>
                  <Image
                    src={phones}
                    alt='phones'
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              </div>
              <div className='col-12 col-lg-10 mx-auto px-5 mb-5'>
                <p className={`${style['left-header']} fw-bold`}>
                  App that Covering Banking Needs.
                </p>
                <p className={`${style['left-sub-header']}`}>
                  Zwallet is an application that focussing in banking needs for
                  all users in the world. Always updated and always following
                  world trends. 5000+ users registered in Zwallet everyday with
                  worldwide users coverage.
                </p>
              </div>
            </div>
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
              <form onSubmit={handleSubmit}>
                <div
                  className={`col-12 col-lg-10 col-xl-8 mx-auto px-5 ${style['starter-form']}`}>
                  <div className='row w-100 m-0 p-0'>
                    <div className={`col-12 ${style['input-wrapper']}`}></div>
                    <div
                      className={`col-12 mb-2 mt-1 ${style['form-msg-error']}`}>
                      {`${
                        errValidate.email && errValidate.email !== null
                          ? errValidate.email
                          : ''
                      }`}
                    </div>
                    <div className={`col-12 ${style['input-wrapper']}`}>
                      <div className='row m-0 p-0'>
                        <div className='col-2'>
                          <input
                            type='text'
                            className={`${style['starter-pin']} ${
                              errValidate.pin && errValidate.pin !== null
                                ? `${style['error']}`
                                : ''
                            }`}
                            name='pin1'
                            max={1}
                            autoFocus
                          />
                        </div>
                        <div className='col-2'>
                          <input
                            type='text'
                            className={`${style['starter-pin']} ${
                              errValidate.pin && errValidate.pin !== null
                                ? `${style['error']}`
                                : ''
                            }`}
                            name='pin2'
                            max={1}
                          />
                        </div>
                        <div className='col-2'>
                          <input
                            type='text'
                            className={`${style['starter-pin']} ${
                              errValidate.pin && errValidate.pin !== null
                                ? `${style['error']}`
                                : ''
                            }`}
                            name='pin3'
                            max={1}
                          />
                        </div>
                        <div className='col-2'>
                          <input
                            type='text'
                            className={`${style['starter-pin']} ${
                              errValidate.pin && errValidate.pin !== null
                                ? `${style['error']}`
                                : ''
                            }`}
                            name='pin4'
                            max={1}
                          />
                        </div>
                        <div className='col-2'>
                          <input
                            type='text'
                            className={`${style['starter-pin']} ${
                              errValidate.pin && errValidate.pin !== null
                                ? `${style['error']}`
                                : ''
                            }`}
                            name='pin5'
                            max={1}
                          />
                        </div>
                        <div className='col-2'>
                          <input
                            type='text'
                            className={`${style['starter-pin']} ${
                              errValidate.pin && errValidate.pin !== null
                                ? `${style['error']}`
                                : ''
                            }`}
                            name='pin6'
                            max={1}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`col-12 mb-2 ${style['form-msg-error']}`}>
                      {`${
                        errValidate.pin && errValidate.pin !== null
                          ? errValidate.pin
                          : ''
                      }`}
                    </div>
                    <div className='col-12'>
                      <button
                        className={`btn btn-md ${style['starter-btn']} mb-2 mt-2`}
                        disabled={!conf.submit}>
                        Confirm
                      </button>
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

// export default NewPin;

const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token,
    id: state.auth.userData.id,
  };
};

export default connect(mapStateToProps)(NewPin);
