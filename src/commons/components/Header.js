import Link from 'next/link';
import Image from 'next/image';

import style from 'src/commons/styles/Starter.module.css';

import {useEffect, useState} from 'react';
import {getDataByID} from 'src/modules/api/users';
import {updateDataUser} from 'src/redux/actions/users';
import {connect} from 'react-redux';

import defaultProfile from 'public/static/images/default.jpg';
import bell from 'public/static/icons/bell.svg';

function Header(props) {
  // console.log('props header', props);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(defaultProfile);
  // console.log('state userData', userData);
  useEffect(() => {
    if (props.userData && userData === null) {
      console.log('use effect', props.userData);
      setUserData({userData: props.userData.userData});
    }
    if (!props.userData) {
      const token = props.token;
      const id = props.id;
      console.log('null');
      getDataByID(id, token)
        .then((res) => {
          props.dispatch(updateDataUser(res.data.data));
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [userData, props]);
  useEffect(() => {
    if (props.userData) {
      if (props.userData.userData.image && props.userData.userData.image !== null) {
        const newImage =
          process.env.NEXT_PUBLIC_HOST + '/uploads/' + props.userData.userData.image;
        setImage(newImage);
      }
    }
  }, [props]);
  return (
    <>
      <header
        className={`w-100 mx-0 my-0 ${style['header']} container-fluid bg-white`}>
        <div className='row w-100'>
          <div className='col-12 col-lg-10 mx-auto px-0'>
            <div className='row mx-0 my-0'>
              <div className='mt-4 pt-2 col-6'>
                <Link href='/dashboard' passHref>
                  <span className='logo-zwallet logo-zwallet-blue cursor-pointer'>
                    Zwallet
                  </span>
                </Link>
              </div>
              <div className='col-6 mt-4 text-center d-flex justify-content-end'>
                <div className='col-1 w-auto mt-2'>
                  <Link href={'/profile'} passHref={true}>
                    <div
                      className={`position-relative cursor-pointer ${style['profile-wrapper']} me-3 ms-auto`}>
                      <Image
                        src={image}
                        alt='user'
                        layout='fill'
                        objectFit='cover'
                        onError={() => {
                          setImage(defaultProfile);
                        }}
                      />
                    </div>
                  </Link>
                </div>
                <div className='col-1 w-auto mt-1'>
                  <div className={`${style['header-name']}`}>
                    {userData
                      ? `${userData.userData.firstName} ${userData.userData.lastName}`
                      : ''}
                  </div>
                  <div className={`${style['phone-number']}`}>
                    {userData && userData.userData.noTelp
                      ? `${userData.userData.noTelp}`
                      : '-'}
                  </div>
                </div>
                <div className='col-1 w-auto mt-1'>
                  <div className='position-relative'>
                    <div
                      className={`position-relative mt-2 ms-3 ${style['header-bell']}`}>
                      <Image
                        src={bell}
                        alt='user'
                        layout='fill'
                        objectFit='cover'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

// export default Header;

const mapStateToProps = (state) => {
  return {
    token: state.auth.userData.token,
    id: state.auth.userData.id,
    userData: state.users.data,
  };
};

export default connect(mapStateToProps)(Header);
