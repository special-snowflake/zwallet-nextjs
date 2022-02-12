import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {numberToRupiah} from 'src/modules/helpers/collection';

import {Modal} from 'react-bootstrap';
import modalsCss from 'src/commons/styles/Modals.module.css';
import styles from 'src/commons/styles/Home.module.css';

import Title from 'src/commons/components/Title';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';
import LoadingComponent from 'src/commons/components/LoadingComponent';
import TransactionList from 'src/commons/components/TransactionList';

import {historyTransaction, topUp} from 'src/modules/api/transactions';
import {validationTopUp} from 'src/modules/validation/transactionValidation';
import {getDataByID} from 'src/modules/api/users';

import transferGrey from 'public/static/icons/transfer-grey.svg';
import topupGrey from 'public/static/icons/topup-grey.svg';
import {toast} from 'react-toastify';
import DashboardStats from 'src/commons/components/DashboardStats';

function Dashboard(props) {
  const [history, setHistory] = useState(null);
  const [userData, setUserData] = useState(null);
  const [modaleTopUp, setModaleTopUp] = useState({
    show: false,
    realAmount: '',
    amountValue: '',
  });
  const [errValidate, setErrValidate] = useState({amount: null});
  const [inputAmount, setInputAmount] = useState({
    amountValue: '',
    realAmount: '',
  });

  const showHistory = (data) => {
    if (data.length === 0) {
      return (
        <div className='p-3 color-grey'>
          <p>{`You haven't made any transaction.`}</p>
        </div>
      );
    }
    const max = data.length < 5 ? data.length : 5;
    const elements = [];
    console.log('data ', data);
    for (let i = 0; i < max; i++) {
      const path = '/transfer/' + data[i].id;
      console.log(data[i]);
      if (data[i].status === 'success') {
        const element = (
          <React.Fragment key={i}>
            <TransactionList data={data[i]} />
          </React.Fragment>
        );
        elements.push(element);
      }
    }
    return elements;
  };

  const handleTopUp = () => {
    const body = {
      amount: inputAmount.realAmount,
    };
    console.log(body);
    const validation = validationTopUp(body);
    if (!validation.error) {
      const token = props.token;
      setErrValidate({amount: null});
      topUp(body, token)
        .then((response) => {
          console.log('response topup', response);
          console.log(response.data);
          console.log(response.data.data.redirectUrl);
          toast.info('Please finish your payment.', {
            position: 'top-right',
            hideProgressBar: true,
          });
          setTimeout(() => {
            window.open(response.data.data.redirectUrl, '_blank');
          }, 3000);
        })
        .catch((error) => {
          console.log(error.response);
          toast.error('Top Up Failed.', {position: 'top-right'});
        });
    }
    if (validation.error) {
      const errMsg = validation.error.details[0].message;
      setErrValidate({amount: errMsg});
    }
  };

  const handleInputAmount = (e) => {
    const priceFormat = numberToRupiah(e.target.value);
    setInputAmount({
      amountValue: priceFormat,
      realAmount: e.target.value,
    });
    e.target.type = 'text';
    e.target.value = priceFormat;
    console.log('type priceformat:', typeof priceFormat);
  };

  const onFocusPrice = (e) => {
    e.target.type = 'number';
    e.target.value = inputAmount.realAmount;
  };

  const closeAndUpdate = () => {
    console.log('update close');
    const id = props.id;
    const token = props.token;
    getDataByID(id, token)
      .then((res) => {
        console.log(res.data);
        props.dispatch(updateDataUser(res.data.data));
        console.log('update success');
      })
      .catch((err) => {
        console.log(err.response);
      });
    setModaleTopUp({
      ...modaleTopUp,
      show: false,
    });
  };

  useEffect(() => {
    if (history === null) {
      console.log('get history');
      const token = props.token;
      const filter = '?page=1&limit=5&filter=WEEK';
      historyTransaction(filter, token)
        .then((response) => {
          console.log('success', response);
          setHistory({
            dataHistory: response.data.data,
          });
        })
        .catch((error) => {
          console.log('error', error.response);
        });
    }
    if (userData === null && props.userData) {
      setUserData({userData: props.userData.userData});
    }
  }, [history, userData, props]);

  return (
    <>
      <Title title='Dashboard - Zwallet' />
      <Header />
      <main className='container-fluid'>
        <div
          className={`row ${styles['dashboard-wrapper']} justify-content-center`}>
          <aside className={`col-12 col-md-4 col-xl-3 pe-3`}>
            <SideNavigation active='dashboard' />
          </aside>
          <section className='col-12 col-md-8 col-xl-7 ps-3'>
            <div className={`${styles['right-content']}`}>
              <div
                className={`row m-0 p-0 justify-content-between ${styles['balance']}`}>
                <div className='col-7 p-3'>
                  {/* <div className={`$`}> */}
                  <div className={`${styles['balance-header']}`}>Balance</div>
                  <div className={`${styles['balance-balance']}`}>
                    Rp{' '}
                    {userData
                      ? `${numberToRupiah(userData.userData.balance)}`
                      : ''}
                  </div>
                  <div className={`${styles['balance-phone']}`}>
                    {userData && userData.userData.noTelp
                      ? `${userData.userData.noTelp}`
                      : '-'}
                  </div>
                  {/* </div> */}
                </div>
                <div className='col-4 p-3'>
                  <Link href={'/transfer'} passHref={true}>
                    <div
                      className={`${styles['btn-balance']} ms-auto me-1 cursor-pointer`}>
                      <div className={`${styles['wrapper-icons']} float-start`}>
                        <Image
                          src={transferGrey}
                          alt='dahsboard'
                          objectFit='cover'
                          layout='fill'
                        />
                      </div>
                      <div className='ms-5 float-start'></div>Transfer
                    </div>
                  </Link>
                  {/* <Link href={'/topup'} passHref={true}> */}
                  <div
                    className={`${styles['btn-balance']} ms-auto me-1 cursor-pointer`}
                    onClick={() => {
                      setModaleTopUp({
                        show: true,
                      });
                    }}>
                    <div className={`${styles['wrapper-icons']} float-start`}>
                      <Image
                        src={topupGrey}
                        alt='dahsboard'
                        objectFit='cover'
                        layout='fill'
                      />
                    </div>
                    <div className='ms-5 float-start'></div>Top Up
                  </div>
                  {/* </Link> */}
                </div>
              </div>
              <div
                className={`row w-100 m-0 p-0 mt-4 justify-content-between ${styles['dashboard-content-wrapper']}`}>
                <DashboardStats />
                {/* <div className={`col ${styles['dashboard-content-left']}`}>
                  <div className='d-flex'>
                    <div className='col text-start'>
                      <div className={`${styles['wrapper-icons']} ms-1`}>
                        <Image
                          src={income}
                          alt='dahsboard'
                          objectFit='cover'
                          layout='fill'
                        />
                      </div>
                      <span className={`${styles['dashboard-income']}`}>
                        Income
                      </span>
                      <div className='balance-income fw-bold'>Rp2.120.000</div>
                    </div>
                    <div className='col text-end'>
                      <div
                        className={`${styles['wrapper-icons']} ms-auto me-1`}>
                        <Image
                          src={expense}
                          alt='dahsboard'
                          objectFit='cover'
                          layout='fill'
                        />
                      </div>
                      <span className={`${styles['dashboard-expense']}`}>
                        Expense
                      </span>
                      <div className='balance-outcome fw-bold'>Rp1.560.000</div>
                    </div>
                  </div>

                  <div className='position-relative w-100 h-50 mt-5'>
                  </div>
                </div> */}
                <div className={`col ${styles['dashboard-content-right']}`}>
                  <div className='row p-0 m-0 w-100 justify-content-between'>
                    <div className='col-8 fw-bold'>Transaction History</div>
                    <div className='col-4 text-end color-blue'>
                      <Link href={'/history'}>See all </Link>
                    </div>
                  </div>
                  {history !== null ? (
                    showHistory(history.dataHistory)
                  ) : (
                    <LoadingComponent />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      <Modal show={modaleTopUp.show}>
        <Modal.Header>
          <p className={modalsCss['header']}>Top Up</p>
          <button
            type='button'
            className={`${modalsCss['close-btn']}`}
            data-bs-dismiss='modal'
            aria-label='close'
            onClick={closeAndUpdate}></button>
        </Modal.Header>
        <Modal.Body>
          <p className='color-grey font-normal'>
            Enter the amount of money, and click submit.
          </p>
          <input
            type='number'
            name='amount'
            id='amount'
            onFocus={onFocusPrice}
            onBlur={handleInputAmount}
            className={modalsCss.inputAmount}
            autoFocus
            autoComplete='off'
          />
          <div className='col-12 mt-0 color-red'>
            {`${
              errValidate.amount && errValidate.amount !== null
                ? errValidate.amount
                : ''
            }`}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
          <button className={`btn ${styles['btn-blue']}`} onClick={handleTopUp}>
            Submit
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

export default connect(mapStateToProps)(Dashboard);
