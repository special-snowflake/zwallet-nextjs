import Image from 'next/image';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useRouter} from 'next/router';

import styles from 'src/commons/styles/Home.module.css';
import Title from 'src/commons/components/Title';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';
import LoadingComponent from 'src/commons/components/LoadingComponent';
import CardUser from 'src/commons/components/CardUser';

import {getDataByID} from 'src/modules/api/users';
import {numberToRupiah} from 'src/modules/helpers/collection';
import {transferDetail} from 'src/redux/actions/transfer';
import {toast} from 'react-toastify';

function TransferId(props) {
  const [userDetail, setUserDetail] = useState(null);
  const [inputAmount, setInputAmount] = useState({
    amountValue: '',
    realAmount: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [errValidation, setErrValidation] = useState(null);
  console.log('props home', props);
  const senderBalance = props.userData ? props.userData.userData.balance : 0;
  const router = useRouter();

  useEffect(() => {
    const token = props.token;
    const {id} = router.query;
    getDataByID(id, token)
      .then((res) => {
        setUserDetail({...res.data.data});
        console.log('detail user', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router, props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(inputAmount.realAmount > props.userData.userData.balance){
    //   toast.error('')
    // }
    const date = new Date();
    console.table(date);
    const amount = inputAmount.realAmount;
    const notes = e.target.notes.value;
    const receiverId = router.query.id;
    const data = {
      date,
      amount,
      notes,
      receiverId,
    };
    console.log('data transfer', data);
    props.dispatch(transferDetail(data));
    router.push('/transfer/confirmation');
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
  const inputCheck = (e) => {
    const amount = e.target.value;
    if (amount >= 10000 && amount < props.userData.userData.balance) {
      setErrValidation(null);
      setIsDisabled(false);
    }
    if (amount < 10000) {
      setErrValidation('Amount should be higher than 10.000');
      setIsDisabled(true);
    }
    if (amount > props.userData.userData.balance) {
      setErrValidation(`Amount musn't be bigger than balance`);
      setIsDisabled(true);
    }
  };

  const priceHandler = (e) => {
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
  const title =
    userDetail !== null
      ? `Transfer to ${userDetail.firstName} ${userDetail.lastName} - Zwallet`
      : 'Transfer - Zwallet';
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
          <section className='col-12 col-md-8 col-xl-7 ps-3'>
            <div className={`${styles['right-content']} h-100`}>
              <div className={`${styles['transfer-wrapper']}`}>
                {userDetail !== null ? (
                  <form onSubmit={handleSubmit}>
                    <div className='row m-0 p-0'>
                      <div className='col-12 fw-bold'>Transfer Money</div>
                      <div className='col-12'>
                        <div className='row m-0 p-0 h-100'>
                          <CardUser
                            id={userDetail.id}
                            firstName={userDetail.firstName}
                            lastName={userDetail.lastName}
                            image={userDetail.image}
                          />
                          <div className='col-12 col-md-6 color-grey p-0 my-3'>
                            Type the amount you want to transfer and then press
                            continue to the next steps.
                          </div>
                          <div className='col-12 mx-auto text-center'>
                            <input
                              type={inputAmount.type}
                              name='amount'
                              max={senderBalance}
                              placeholder='0.00'
                              className={`${styles['input-amount']}`}
                              autoFocus
                              onBlur={(e) => {
                                priceHandler(e);
                              }}
                              onFocus={(e) => {
                                onFocusPrice(e);
                              }}
                              onChange={debounce(inputCheck)}
                              autoComplete='off'
                            />
                          </div>
                          <div className='col-12 color-red mb-3 text-center'>
                            {errValidation !== null ? errValidation : ''}
                          </div>
                          <div className='col-12 fw-bold text-center my-3'>
                            {`Rp${numberToRupiah(senderBalance)} Available`}
                          </div>
                          <div className='col-12 my-3 text-center'>
                            <input
                              type='text'
                              name='notes'
                              className={`${styles['transfer-notes']}`}
                              placeholder='Add some notes'
                            />
                          </div>
                          <div className='col-12 my-3'>
                            <button
                              type='submit'
                              disabled={isDisabled}
                              className={`btn ${styles['btn-blue']} float-end`}>
                              Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <LoadingComponent />
                )}
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
    // dataTranfer: state.transfer.data,
  };
};

export default connect(mapStateToProps)(TransferId);
