import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  exportTransaction,
  historyTransactionById,
} from 'src/modules/api/transactions';

import styles from 'src/commons/styles/Home.module.css';

import Title from 'src/commons/components/Title';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';

import userProfile from 'public/static/images/default.jpg';

import {
  capitalizeFirstLetter,
  numberToRupiah,
} from 'src/modules/helpers/collection';

import {transferDetail} from 'src/redux/actions/transfer';
import {updateBalance, updateDataUser} from 'src/redux/actions/users';

import LoadingComponent from 'src/commons/components/LoadingComponent';

import {getDataByID} from 'src/modules/api/users';
import {toast} from 'react-toastify';
import CardUser from 'src/commons/components/CardUser';

function HistoryByID(props) {
  const [detailHistory, setDetailHistory] = useState(null);
  const router = useRouter();
  //   let date = detailHistory !== null ? new Date(detailHistory.createdAt) : '';
  useEffect(() => {
    const token = props.token;
    const {id} = router.query;
    if (detailHistory === null) {
      historyTransactionById(id, token)
        .then((res) => {
          setDetailHistory(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (props.dataTranfer && detailHistory !== null) {
      console.log(props.dataTranfer, detailHistory);
      if (detailHistory.status === 'success') {
        const id = props.id;
        const token = props.token;
        getDataByID(id, token)
          .then((res) => {
            props.dispatch(updateDataUser(res.data.data));
            props.dispatch(transferDetail({data: null}));
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }
  }, [router, props]);

  const exportPDF = () => {
    const id = router.query.id;
    const token = props.token;
    exportTransaction(id, token)
      .then((res) => {
        console.log(res);
        toast.success('Transaction Downloaded');
        window.open(res.data.data.url, '_blank');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const title = 'Transaction Detail - Zwallet';
  console.log('history checker', detailHistory);
  return (
    <>
      <Title title={title} />
      <Header />
      <main className='container-fluid'>
        <div
          className={`row ${styles['dashboard-wrapper']} justify-content-center`}>
          <aside className={`col-12 col-md-4 col-xl-3 pe-3`}>
            <SideNavigation active='dashboard' />
          </aside>
          <section className='col-12 col-md-8 col-xl-7 ps-3'>
            <div className={`${styles['right-content']} h-100`}>
              {/* {detailHistory!==null ? () :(<LoadingComponent/>)} */}
              <div className={`${styles['transfer-wrapper']}`}>
                {detailHistory ? (
                  <div className='row m-0 p-0'>
                    <div className='col-12 my-3 text-center fw-bold'>
                      <div
                        className={
                          detailHistory !== null &&
                          detailHistory.status === 'success'
                            ? styles['transfer-success']
                            : styles['transfer-failed']
                        }></div>
                      {detailHistory !== null
                        ? `${capitalizeFirstLetter(detailHistory.status)}`
                        : ''}
                    </div>
                    <div
                      className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                      <div className='float-start ms-3'>
                        <div className='color-grey'>Amount</div>
                        <div className='fw-bold'>
                          {detailHistory !== null
                            ? `Rp ${numberToRupiah(detailHistory.amount)}`
                            : ''}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                      <div className='float-start ms-3'>
                        <div className='color-grey'>Total Balance </div>
                        <div className='fw-bold'>
                          {props.userData
                            ? `Rp ${numberToRupiah(
                                props.userData.userData.balance,
                              )}`
                            : ''}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                      <div className='float-start ms-3'>
                        <div className='color-grey'>{`Date & Time`}</div>
                        <div className='fw-bold'>
                          {detailHistory !== null
                            ? detailHistory.createdAt
                            : ''}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`col-12 ${styles['contact-item']} my-3 px-3`}>
                      <div className='float-start ms-3'>
                        <div className='color-grey'>Notes</div>
                        <div className='fw-bold'>
                          {detailHistory !== null ? detailHistory.notes : '-'}
                        </div>
                      </div>
                    </div>
                    <div className='col-12 fw-bold mt-3'>
                      {detailHistory.type === 'accept'
                        ? 'Transfer from'
                        : detailHistory.type === 'send'
                        ? 'Transfer to'
                        : 'Top Up'}
                    </div>
                    {detailHistory.type !== 'topup' && (
                      <CardUser
                        id={detailHistory.id}
                        firstName={detailHistory.firstName}
                        lastName={detailHistory.lastName}
                        image={detailHistory.image}
                      />
                    )}
                    <div className='col-12 my-3'>
                      <Link href={'/dashboard'} passHref={true}>
                        <button
                          className={`btn float-end ${styles['btn-blue']} ms-3`}>
                          Back To Home
                        </button>
                      </Link>
                      {detailHistory.type !== 'topup' && (
                        <button
                          className={`btn float-end ${styles['btn-light-blue']}`}
                          onClick={exportPDF}>
                          Download PDF
                        </button>
                      )}
                    </div>
                  </div>
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
    dataTranfer: state.transfer,
  };
};

export default connect(mapStateToProps)(HistoryByID);
