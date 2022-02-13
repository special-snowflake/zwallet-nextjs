import Link from 'next/link';
import {connect} from 'react-redux';
import {useState} from 'react';
import {Modal} from 'react-bootstrap';

import Title from 'src/commons/components/Title';
import LoadingComponent from 'src/commons/components/LoadingComponent';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';

import styles from 'src/commons/styles/Home.module.css';
import modalsCss from 'src/commons/styles/Modals.module.css';
import {getDataByID, updatePhoneNumber} from 'src/modules/api/users';
import {toast} from 'react-toastify';
import { updateDataUser } from 'src/redux/actions/users';

function DetailProfile(props) {
  const [modalDeleteNumber, setModalDeleteNumber] = useState({show: false});
  const title = 'Manage Phone Number - Zwallet';
  const handleDeleteNumber = () => {
    const body = {
      noTelp: '',
    };
    setModalDeleteNumber({show: false});
    updatePhoneNumber(body, props.id, props.token)
      .then((res) => {
        getDataByID(props.id, props.token)
          .then((res) => {
            props.dispatch(updateDataUser(res.data.data));
          })
          .catch((err) => {
            console.log(err);
          });
        toast.success('Phone Number Deleted');
      })
      .catch((err) => {
        console.log('failed to update', err);
        toast.error('Failed to Deleted Phone Number');
      });
  };
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
                              Manage Phone Number
                            </div>
                          </div>
                          <div className='col-12 my-2'>
                            <div className='w-50 font-normal color-grey'>
                              You can only delete the phone number and then you
                              must add another phone number.
                            </div>
                          </div>
                          <div
                            className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                            <div className='float-start ms-3'>
                              <div className='color-grey'>Primary</div>
                              <div className='fw-bold'>
                                {props.userData.userData.noTelp &&
                                props.userData.userData.noTelp !== null
                                  ? props.userData.userData.noTelp
                                  : '-'}
                              </div>
                            </div>
                            {props.userData.userData.noTelp &&
                            props.userData.userData.noTelp !== null ? (
                              <div className='float-end my-3'>
                                <span
                                  className='color-blue my-auto cursor-pointer'
                                  onClick={() => {
                                    setModalDeleteNumber({show: true});
                                  }}>
                                  Delete Phone Number
                                </span>
                              </div>
                            ) : (
                              <div className='float-end my-3'>
                                <span className='color-blue my-auto cursor-pointer'>
                                  <Link href={'/profile/phone/add'}>
                                    Add Phone Number
                                  </Link>
                                </span>
                              </div>
                            )}
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

      <Modal show={modalDeleteNumber.show}>
        <Modal.Header>
          <p className={modalsCss['header']}>Delete Phone Number</p>
          <button
            type='button'
            className={`${modalsCss['close-btn']}`}
            data-bs-dismiss='modal'
            aria-label='close'
            onClick={() => {
              setModalDeleteNumber({
                show: false,
              });
            }}></button>
        </Modal.Header>
        <Modal.Body>
          <p className='color-grey text-center font-normal'>
            Are you sure you want to Delete Phone Number?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`btn ${styles['btn-white']} float-start`}
            onClick={() => {
              setModalDeleteNumber({
                show: false,
              });
            }}>
            Cancel
          </button>
          <button
            className={`btn ${styles['btn-blue']}`}
            onClick={handleDeleteNumber}>
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

export default connect(mapStateToProps)(DetailProfile);
