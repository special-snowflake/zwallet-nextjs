import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Router, {useRouter} from 'next/router';

import Title from 'src/commons/components/Title';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import ListUser from 'src/commons/components/ListUser';
import SideNavigation from 'src/commons/components/SideNavigation';
import LoadingComponent from 'src/commons/components/LoadingComponent';

import {getDataUser} from 'src/modules/api/users';

import styles from 'src/commons/styles/Home.module.css';
import {Pagination} from 'react-bootstrap';
import Link from 'next/link';

function Transfer(props) {
  const [listUser, setListUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log('props home', props);
  const router = useRouter();

  const getListUser = (search, limit, sort, page) => {
    const filter = `?page=${page}&limit=${limit}&search=${search}&sort=${sort}`;
    const token = props.token;

    getDataUser(filter, token)
      .then((res) => {
        console.log('res list user', res);
        setListUser({
          data: res.data,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('err list', err.response);
      });
  };

  const debounce = (func, timeout = 1000) => {
    let timer;
    console.log('debounce');
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('debounce done');
        func.apply(this, args);
      }, timeout);
    };
  };

  const handleSearch = (e) => {
    console.log('search');
    const search = e.target.value;
    getListUser(search, 5, 'firstName ASC', 1);
    setIsLoading(true);
    Router.push({
      pathname: '/transfer',
      // query: {page: '1', filter: encodeURI(newQuery)},
      query: {page: '1', search: search},
    });
  };

  const showPagination = (data) => {
    console.log('pagination', data);
    const search = router.query.search ? router.query.search : '';
    const {page, totalPage, limit, totalData} = data;
    if (data.length === 0) {
      return (
        <div className='col-5 mt-5 float-start'>
          <button className={`btn ${styles['btn-light-blue']} me-2`}>
            Previous
          </button>
          <button className={`btn ${styles['btn-light-blue']} ms-2`}>
            Next
          </button>
        </div>
      );
    }
    return (
      <div className='col-5 mt-5 text-start'>
        {page === 1 ? (
          <button className={`btn ${styles['btn-light-blue']} me-2`}>
            Prev
          </button>
        ) : (
          <Link
            href={`/transfer?page=${page - 1}&search=${search}`}
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
            href={`/transfer?page=${page + 1}&search=${search}`}
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
      </div>
    );
  };

  useEffect(() => {
    const page = router.query.page ? router.query.page : '1';
    const search = router.query.search ? router.query.search : '';
    getListUser(search, 5, 'firstName ASC', page);
    // if (listUser === null) {
    // }
  }, [router]);
  return (
    <>
      <Title title='Transfer - Zwallet' />
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
                <div className='row m-0 p-0'>
                  <div className='col-12 fw-bold'>Search Receiver</div>
                  <div className='col-12'>
                    <div className='row m-0 m-0'>
                      <div className='col-12 my-3 mb-4 px-0'>
                        <input
                          onChange={debounce(handleSearch)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSearch}
                          className={`${styles['search']}`}
                          type='text'
                          name='search'
                          placeholder='Search receiver here'
                          // autoFocus
                          autoComplete='off'
                          // onBlur={handleSearch}
                        />
                      </div>
                      <div className='col-12 row m-0 p-0'>
                        {listUser !== null && !isLoading ? (
                          <>
                            <ListUser data={listUser.data.data} />
                            {showPagination(listUser.data.pagination)}
                          </>
                        ) : (
                          <LoadingComponent />
                        )}
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

export default connect(mapStateToProps)(Transfer);
