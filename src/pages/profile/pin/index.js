import Image from 'next/image';
import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useRouter} from 'next/router';
import Link from 'next/link';

// import PinInput from 'react-pin-input';

import Title from 'src/commons/components/Title';
import LoadingComponent from 'src/commons/components/LoadingComponent';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';

import {toast} from 'react-toastify';
import styles from 'src/commons/styles/Home.module.css';
import profileCss from 'src/commons/styles/Profile.module.css';
import modalsCss from 'src/commons/styles/Modals.module.css';
import defaultProfile from 'public/static/images/default.jpg';

function Profile(props) {
  const pin = React.createRef();
  const title = 'Update PIN - Zwallet'
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
                    <div className='row m-0 m-0'>
                      <div className='col-12 my-2'>
                        <div className='font-normal fw-bold'>Change PIN</div>
                      </div>
                      <div className='col-12 my-2'>
                        <div className='w-50 font-normal color-grey'>
                          Enter your current 6 digits Zwallet PIN below to
                          continue to the next steps.
                        </div>
                      </div>
                      <div className='col-12 my-5 text-center'>
                        {/* <PinInput
                          length={6}
                          initialValue=''
                          secret
                        //   onChange={(value, index) => {}}
                          type='numeric'
                          inputMode='number'
                          style={{padding: '10px'}}
                          inputStyle={{borderColor: 'red'}}
                          inputFocusStyle={{borderColor: 'blue'}}
                        //   onComplete={(value, index) => {}}
                        //   autoSelect={true}
                          //   onChange={this.onChange}
                        /> */}
                      </div>
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

export default connect(mapStateToProps)(Profile);
