import React from 'react';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {numberToRupiah} from 'src/modules/helpers/collection';
import Router from 'next/router';

import styles from 'src/commons/styles/Home.module.css';

import Title from 'src/commons/components/Title';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import SideNavigation from 'src/commons/components/SideNavigation';
import LoadingComponent from 'src/commons/components/LoadingComponent';
import TransactionList from 'src/commons/components/TransactionList';

import {historyTransaction, topUp} from 'src/modules/api/transactions';

import {useRouter} from 'next/router';

function History(props) {
  const [history, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const token = props.token;

  console.log('router', router);

  const showHistory = (data) => {
    if (data.length === 0) {
      return (
        <div className='p-3 color-grey'>
          <p>{`You haven't made any transaction.`}</p>
        </div>
      );
    }
    const max = data.length < 7 ? data.length : 7;
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

  const showPagination = (data) => {
    console.log('pagination', data);
    const timeFilter = router.query.filter ? router.query.filter : 'WEEK';
    const {page, totalPage, limit, totalData} = data;
    if (data.length === 0) {
      return (
        <div className='col-5 mt-2'>
          <button className={`btn ${styles['btn-light-blue']}`}>Prev</button>
          <button className={`btn ${styles['btn-light-blue']} ms-5`}>
            Next
          </button>
        </div>
      );
    }
    return (
      <div className='col-5 mt-5'>
        {page === 1 ? (
          <button className={`btn ${styles['btn-light-blue']} me-2`}>
            Prev
          </button>
        ) : (
          <Link
            href={`/history?page=${page - 1}&filter=${timeFilter}`}
            passHref={true}>
            <button
              className={`btn ${styles['btn-blue']} me-2`}
              onClick={() => {
                setIsLoading(true);
              }}>
              Prev
            </button>
          </Link>
        )}
        {page < totalPage ? (
          <Link
            href={`/history?page=${page + 1}&filter=${timeFilter}`}
            passHref={true}>
            <button
              className={`btn ${styles['btn-blue']} ms-2`}
              onClick={() => {
                setIsLoading(true);
              }}>
              Next
            </button>
          </Link>
        ) : (
          <button className={`btn ${styles['btn-light-blue']} ms-2`}>
            Next
          </button>
        )}
        {/* <Link href={'/history?page=2&filter=WEEK'} passHref={true}>
          <button className={`btn ${styles['btn-blue']} ms-2`}>Next </button>
        </Link> */}
      </div>
    );
  };

  const handleFilter = (e) => {
    console.log('filter changed');
    console.log(e.target.value);
    updateQuery(e.target.value);
    setIsLoading(true);
    // router.query({filter: e.target.value});
  };

  const updateQuery = (query) => {
    Router.push({
      pathname: '/history',
      // query: {page: '1', filter: encodeURI(newQuery)},
      query: {page: '1', filter: query},
    });
  };

  // useEffect(() => {
  //   if (history === null && router) {
  //     console.log('get history');
  //     const initialPage = router.query.page ? router.query.page : '1';
  //     const filter = `?page=${initialPage}&limit=10&filter=WEEK`;
  //     console.log('use 1 filter', filter);
  //     historyTransaction(filter, token)
  //       .then((response) => {
  //         console.log('success', response);
  //         setHistory({
  //           dataHistory: response.data.data,
  //         });
  //       })
  //       .catch((error) => {
  //         console.log('error', error.response);
  //       });
  //   }
  //   console.log('use effect router,', router);
  //   if (router.query.page && page !== router.query.page) {
  //     setPage(router.query.page);
  //   }
  // }, [page, router]);

  useEffect(() => {
    console.log('router is updated', page, router);
    const page = router.query.page ? router.query.page : '1';
    const timeFilter = router.query.filter ? router.query.filter : 'WEEK';
    const filter = `?page=${page}&limit=10&filter=${timeFilter}`;
    historyTransaction(filter, token)
      .then((response) => {
        console.log('success', response);
        setHistory({
          dataHistory: response.data,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('error', error.response);
      });
  }, [router]);

  return (
    <>
      <Title title='History Transaction - Zwallet' />
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
                className={`row w-100 m-0 p-0 justify-content-between ${styles['dashboard-content-wrapper']}`}>
                <div className={`col ${styles['dashboard-content-right']}`}>
                  <div className='row p-0 m-0 w-100 justify-content-between'>
                    <div className='col-8 fw-bold'>Transaction History</div>
                    <div className='col-4 text-end color-grey'>
                      <select
                        name='filter'
                        className={styles['history-filter']}
                        defaultValue='WEEK'
                        onChange={handleFilter}>
                        <option value=''>-- Select Filter --</option>
                        <option value='WEEK'>Week</option>
                        <option value='MONTH'>Month</option>
                        <option value='YEAR'>Year</option>
                      </select>
                    </div>
                  </div>
                  {history !== null && !isLoading ? (
                    <div className='row p-0 m-0 mt-3 w-100 justify-content-between'>
                      {showHistory(history.dataHistory.data)}
                      {showPagination(history.dataHistory.pagination)}
                    </div>
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

export default connect(mapStateToProps)(History);
