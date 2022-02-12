import Image from 'next/image';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap';
import {useRouter} from 'next/router';

import styles from 'src/commons/styles/Home.module.css';
import modalsCss from 'src/commons/styles/Modals.module.css';
import Title from 'src/commons/components/Title';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';

import {getDataByID} from 'src/modules/api/users';
import {checkPinUser} from 'src/modules/api/users';
import {transfer} from 'src/modules/api/transactions';
import userProfile from 'public/static/images/default.jpg';
import {numberToRupiah} from 'src/modules/helpers/collection';
import {transferDetail} from 'src/redux/actions/transfer';

import {validatePin} from 'src/modules/validation/userValidation';
import {toast} from 'react-toastify';
import LoadingComponent from 'src/commons/components/LoadingComponent';

function TransferConfirmation(props) {
  const router = useRouter();
  const path = router.pathname;
  console.log('this is router', router);
  if (path.match('transfer')) {
    console.log('inside transfer', path.match('transfer'));
  }
  // const router = useRouter();
  const [userDetail, setUserDetail] = useState(null);
  const [modal, setModal] = useState({show: false, pin: null});
  const token = props.token;
  const id = props.dataTranfer.data.receiverId;
  console.log('props', props);
  useEffect(() => {
    if (userDetail === null) {
      getDataByID(id, token)
        .then((res) => {
          setUserDetail({...res.data.data});
          console.log('detail user', res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  const openModal = () => {
    setModal({
      show: true,
      pin: null,
    });
  };
  
  const enterPin = () => {
    console.log('enterpin', modal.pin);
    const validation = validatePin({pin: modal.pin});
    if (!validation.error) {
      setModal({
        pin: modal.pin,
        show: modal.show,
      });
      checkPinUser(modal.pin, token)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            const body = {
              receiverId: props.dataTranfer.data.receiverId,
              amount: props.dataTranfer.data.amount,
              notes: props.dataTranfer.data.notes,
            };
            console.log('body transfer', body);
            transfer(body, token)
              .then((res) => {
                console.log(res);
                toast.success('Transfer success.');
                const history = '/history/' + res.data.data.id;
                // props.dispatch(transferDetail(null));
                router.push(history);
              })
              .catch((err) => {
                if (err) {
                  toast.error('Transfer Failed.');
                }
              });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error('Wrong Pin');
        });
    }
    if (validation.error) {
      setModal({
        ...modal,
        err: validation.error.details[0].message,
      });
    }
  };
  console.log('data transfer', props.dataTranfer);
  const title = 'Transfer Confirmation';
  return (
    <>
      <Title title={title} />
      <Header />
      <main className='container-fluid'>
        <div
          className={`row ${styles['dashboard-wrapper']} justify-content-center`}>
          <aside className={`col-12 col-md-4 col-xl-3 pe-3`}>
            <SideNavigation active='transfer' />
          </aside>
          <section className='col-12 col-md-8 col-xl-7 ps-3 mb-5'>
            <div className={`${styles['right-content']} h-100`}>
              <div className={`${styles['transfer-wrapper']}`}>
                {props.dataTranfer.data !== null ? (
                  <div className='row m-0 p-0'>
                    <div className='col-12 fw-bold'>Transfer To</div>
                    <div className='col-12'>
                      <div className='row m-0 p-0 h-100'>
                        {userDetail !== null && (
                          <div
                            className={`col-12 ${styles['contact-item']} my-3 px-3 cursor-pointer`}>
                            <div
                              className={`${styles['wrapper-user-image']} float-start`}>
                              <Image
                                src={userProfile}
                                alt='dahsboard'
                                objectFit='cover'
                                layout='fill'
                              />
                            </div>
                            <div className='float-start ms-3'>
                              <div className='fw-bold'>{`${userDetail.firstName} ${userDetail.lastName}`}</div>
                              <div className='color-grey'>
                                {userDetail.noTelp !== null
                                  ? userDetail.noTelp
                                  : '-'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='col-12 my-3 fw-bold'>Details</div>
                    <div className='col-12 row m-0 p-0'>
                      <div
                        className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                        <div className='float-start ms-3'>
                          <div className='color-grey'>Amount</div>
                          <div className='fw-bold'>
                            Rp
                            {props.dataTranfer
                              ? numberToRupiah(props.dataTranfer.data.amount)
                              : ''}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                        <div className='float-start ms-3'>
                          <div className='color-grey'>Balance Left</div>
                          <div className='fw-bold'>
                            Rp
                            {props.dataTranfer && props.userData
                              ? numberToRupiah(
                                  props.userData.userData.balance -
                                    props.dataTranfer.data.amount,
                                )
                              : ''}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                        <div className='float-start ms-3'>
                          <div className='color-grey'>{`Date & Time`}</div>
                          <div className='fw-bold'>
                            {props.dataTranfer
                              ? Date(props.dataTranfer.data.date)
                              : ''}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                        <div className='float-start ms-3'>
                          <div className='color-grey'>Notes</div>
                          <div className='fw-bold'>
                            {props.dataTranfer
                              ? props.dataTranfer.data.notes
                              : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 my-3'>
                      <button
                        className={`btn ${styles['btn-blue']} float-end`}
                        onClick={openModal}>
                        Continue
                      </button>
                    </div>
                  </div>
                ) : (
                  <LoadingComponent />
                )}
                {/* <form> */}

                {/* </form> */}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Modal show={modal.show}>
        <Modal.Header>
          <p className={modalsCss['header']}>Enter PIN to Transfer</p>
          <button
            type='button'
            className={`${modalsCss['close-btn']}`}
            data-bs-dismiss='modal'
            aria-label='close'
            onClick={() => {
              setModal({
                show: false,
                pin: null,
              });
            }}></button>
        </Modal.Header>
        <Modal.Body>
          <p className='color-grey'>
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
          </p>
          <input
            type='number'
            className={`mt-3 ${styles['input-pin']}`}
            name='pin'
            id=''
            autoFocus
            onChange={(e) => {
              setModal({
                show: true,
                pin: e.target.value,
              });
            }}
          />
          <div className='w-100 color-red mt-1 mb-3'>
            {modal.err ? modal.err : ''}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
          <button className={`btn ${styles['btn-blue']}`} onClick={enterPin}>
            Continue
          </button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token,
    id: state.auth.userData.id,
    userData: state.users.data,
    dataTranfer: state.transfer,
  };
};

export default connect(mapStateToProps)(TransferConfirmation);
