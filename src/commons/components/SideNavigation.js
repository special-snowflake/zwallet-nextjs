import Link from 'next/link';
import React from 'react';
import {useState} from 'react';
import {useRouter} from 'next/router';

import {connect} from 'react-redux';
import {logoutAction} from 'src/redux/actions/auth';
import {logout} from 'src/modules/api/auth';
import {getDataByID} from 'src/modules/api/users';
import {topUp} from 'src/modules/api/transactions';
import {numberToRupiah} from 'src/modules/helpers/collection';
import {validationTopUp} from 'src/modules/validation/transactionValidation';

import {Modal} from 'react-bootstrap';
import modalsCss from 'src/commons/styles/Modals.module.css';
import styles from 'src/commons/styles/Home.module.css';

import {toast} from 'react-toastify';
import { updateDataUser } from 'src/redux/actions/users';

function SideNavigation(props) {
  const [modaleLogout, setModaleLogout] = useState({show: false});
  const [modaleTopUp, setModaleTopUp] = useState({
    show: false,
    realAmount: '',
    amountValue: '',
  });
  const [inputAmount, setInputAmount] = useState({
    amountValue: '',
    realAmount: '',
  });

  const [errValidate, setErrValidate] = useState({amount: null});

  const router = useRouter();

  const token = props.token;
  const id = props.id;

  const hanndleLogout = () => {
    if (props.token) {
      logout(props.token)
        .then((response) => {
          console.log('logout success', response);
        })
        .catch((err) => {
          console.log('logout failed', err);
        });
    }
    props.dispatch(logoutAction());
    localStorage.clear('persist:root');
    toast.success('Logout Success');
    router.push('/auth/login');
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

  const showLogout = () => {
    setModaleLogout({
      show: true,
    });
  };

  const closeAndUpdate = () => {
    console.log('update close');
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

  const active = props.active;
  return (
    <>
      <div className={`${styles['left-menu']}`}>
        <ul className={styles.topMenu}>
          <Link href={'/dashboard'} passHref={true}>
            <li
              className={`${styles.liMenu} ${
                active === 'dashboard'
                  ? styles.menuDashboardActive
                  : styles.menuDashboard
              }`}>
              Dashboard
            </li>
          </Link>
          <Link href={'/transfer'} passHref={true}>
            <li
              className={`${styles.liMenu} ${
                active === 'transfer'
                  ? styles.menuTransferActive
                  : styles.menuTransfer
              }`}>
              Transfer
            </li>
          </Link>
          <li
            className={`${styles.liMenu} ${styles.menuTopUp}`}
            onClick={() => {
              setModaleTopUp({
                show: true,
              });
            }}>
            Top Up
          </li>
          <Link href={'/profile'} passHref={true}>
            <li
              className={`${styles.liMenu} ${
                active === 'profile'
                  ? styles.menuProfileActive
                  : styles.menuProfile
              }`}>
              Profile
            </li>
          </Link>
        </ul>
        <ul className={styles.bottomMenu}>
          <li
            className={`${styles.liMenu} ${styles.menuLogout}`}
            onClick={showLogout}>
            Logout
          </li>
        </ul>
      </div>
      <Modal show={modaleLogout.show}>
        <Modal.Header>
          <p className={modalsCss['header']}>Logout</p>
          <button
            type='button'
            className={`${modalsCss['close-btn']}`}
            data-bs-dismiss='modal'
            aria-label='close'
            onClick={() => {
              setModaleLogout({
                show: false,
              });
            }}></button>
        </Modal.Header>
        <Modal.Body>
          <p className='color-grey text-center font-normal'>
            Are you sure you want to Logout?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`btn ${styles['btn-white']} float-start`}
            onClick={() => {
              setModaleLogout({
                show: false,
              });
            }}>
            Cancel
          </button>
          <button
            className={`btn ${styles['btn-blue']}`}
            onClick={hanndleLogout}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>

      {/* Modale Top Up */}

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

export default connect(mapStateToProps)(SideNavigation);
