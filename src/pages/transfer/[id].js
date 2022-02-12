import Image from 'next/image';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useRouter} from 'next/router';

import styles from 'src/commons/styles/Home.module.css';
import Title from 'src/commons/components/Title';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';

import {getDataByID} from 'src/modules/api/users';
import {numberToRupiah} from 'src/modules/helpers/collection';
import userProfile from 'public/static/images/default.jpg';
import {transferDetail} from 'src/redux/actions/transfer';

function TransferId(props) {
  const [userDetail, setUserDetail] = useState(null);
  const [inputAmount, setInputAmount] = useState({
    amountValue: '',
    realAmount: '',
  });
  //   const [errValidation, err]
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
                <form onSubmit={handleSubmit}>
                  <div className='row m-0 p-0'>
                    <div className='col-12 fw-bold'>Transfer Money</div>
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
                            autoComplete='off'
                          />
                        </div>
                        <div className='col-12 color-red mb-3 text-center'></div>
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
                            className={`btn ${styles['btn-blue']} float-end`}>
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
