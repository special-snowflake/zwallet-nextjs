import {connect} from 'react-redux';
import Link from 'next/link';
import React, {useState} from 'react';
import {useRouter} from 'next/router';

import Title from 'src/commons/components/Title';
import LoadingComponent from 'src/commons/components/LoadingComponent';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';

import {updateDataUser} from 'src/redux/actions/users';
import {getDataByID, updatePhoneNumber} from 'src/modules/api/users';

import styles from 'src/commons/styles/Home.module.css';
import profileCss from 'src/commons/styles/Profile.module.css';
import {toast} from 'react-toastify';

function DetailProfile(props) {
  const inputNumberRef = React.createRef();
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  const handleUpdatePhone = () => {
    const noTelp = '+62' + inputNumberRef.current.value;
    const body = {
      noTelp,
    };
    updatePhoneNumber(body, props.id, props.token)
      .then((res) => {
        getDataByID(props.id, props.token)
          .then((res) => {
            props.dispatch(updateDataUser(res.data.data));
            router.push('/profile/phone');
          })
          .catch((err) => {
            console.log(err);
            router.push('/profile/phone');
          });
        console.log(res);
        toast.success('Phone Number Added');
      })
      .catch((err) => {
        toast.error('Failed to Add Phone Number');
      });
  };
  const title = 'Add Phone Number - Zwallet';
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
                    <div className='row m-0 m-0 '>
                      {props.userData ? (
                        <>
                          <div className='col-12 my-2'>
                            <div className='font-normal fw-bold'>
                              Add Phone Number
                            </div>
                          </div>
                          <div className='col-12 my-2'>
                            <div className='w-50 font-normal color-grey'>
                              Add at least one phone number for the transfer ID
                              so you can start transfering your money to another
                              user.
                            </div>
                          </div>
                          <div
                            className={`col-12 h-100 ${profileCss.wrapperPhone}`}>
                            <div className={profileCss.wrapperInput}>
                              <span className='color-black font-small'>
                                +62
                              </span>
                              <input
                                type='number'
                                placeholder='Enter your phone number'
                                ref={inputNumberRef}
                                onChange={(e) => {
                                  if (e.target.value.length > 0) {
                                    setButtonDisabled(false);
                                  } else {
                                    setButtonDisabled(true);
                                  }
                                }}
                              />
                            </div>
                            <p className='color-red my-2'></p>
                          </div>
                          <div className={`col-12 h-100 text-center`}>
                            <button
                              className={`btn ${styles['btn-blue']}`}
                              disabled={isButtonDisabled}
                              onClick={handleUpdatePhone}>
                              Add Phone Number
                            </button>
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

export default connect(mapStateToProps)(DetailProfile);
