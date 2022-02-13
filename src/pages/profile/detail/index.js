import {connect} from 'react-redux';
import {useState} from 'react';

import Title from 'src/commons/components/Title';
import LoadingComponent from 'src/commons/components/LoadingComponent';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';

import styles from 'src/commons/styles/Home.module.css';
import Link from 'next/link';

function DetailProfile(props) {

  const title = props.userData
    ? `${props.userData.userData.firstName} ${props.userData.userData.lastName} - Zwallet`
    : 'Profile - Zwallet';
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
                              Personal Information
                            </div>
                          </div>
                          <div className='col-12 my-2'>
                            <div className='w-50 font-normal color-grey'>
                              We got your personal information from the sign up
                              proccess. If you want to make changes on your
                              information, contact our support.
                            </div>
                          </div>
                          <div
                            className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                            <div className='float-start ms-3'>
                              <div className='color-grey'>First Name</div>
                              <div className='fw-bold'>
                                {props.userData.userData.firstName}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                            <div className='float-start ms-3'>
                              <div className='color-grey'>Last Name</div>
                              <div className='fw-bold'>
                                {props.userData.userData.lastName}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                            <div className='float-start ms-3'>
                              <div className='color-grey'>Verified E-mail</div>
                              <div className='fw-bold'>
                                {props.userData.userData.email}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                            <div className='float-start ms-3'>
                              <div className='color-grey'>Phone-Number</div>
                              <div className='fw-bold'>
                                {' '}
                                {props.userData.userData.noTelp &&
                                props.userData.userData.noTelp !== null
                                  ? props.userData.userData.noTelp
                                  : '-'}
                              </div>
                            </div>
                            <div className='float-end my-3'>
                              <span className='color-blue my-auto cursor-pointer'>
                                <Link href={'/profile/phone'}>Manage</Link>
                              </span>
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
