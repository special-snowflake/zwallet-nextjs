import {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Title from 'src/commons/components/Title';
import Header from 'src/commons/components/Header';
import Footer from 'src/commons/components/Footer';
import ListUser from 'src/commons/components/ListUser';
import SideNavigation from 'src/commons/components/SideNavigation';
import LoadingComponent from 'src/commons/components/LoadingComponent';

import {getDataUser} from 'src/modules/api/users';

import styles from 'src/commons/styles/Home.module.css';

// export default
function Transfer(props) {
  const [search, setSearch] = useState(null);
  const [listUser, setListUser] = useState(null);
  console.log('props home', props);

  const getListUser = (search, limit, sort, page) => {
    const filter = `?page=${page}&limit=${limit}&search=${search}&sort=${sort}`;
    const token = props.token;

    getDataUser(filter, token)
      .then((res) => {
        console.log('res list user', res);
        setListUser({
          data: res.data.data,
        });
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
  };

  useEffect(() => {
    if (listUser === null) {
      getListUser('', 5, 'firstName ASC', 1);
    }
  });
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
                        {listUser !== null ? (
                          <>
                            <ListUser data={listUser.data} />
                            {listUser.data.length !== 0 && (
                              <div className='w-100'>
                                <button className={`btn ${styles['btn-blue']}`}>
                                  Prev
                                </button>
                                <button
                                  className={`btn ${styles['btn-blue']} ms-2`}>
                                  Next
                                </button>
                              </div>
                            )}
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
