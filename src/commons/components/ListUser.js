import Image from 'next/image';
import React from 'react';
import styles from 'src/commons/styles/Home.module.css';
import userProfile from 'public/static/images/default.jpg';
import Link from 'next/link';

const loopData = (data) => {
  const elements = [];
  if (data.length === 0) {
    return <>{`We can't find any user to show`}</>;
  }
  for (let i = 0; i < data.length; i++) {
    const element = (
      <React.Fragment key={`user-${i}`}>
        <Link href={`/transfer/${data[i].id}`} passHref={true}>
          <div
            className={`col-12 ${styles['contact-item']} mb-3 px-3 cursor-pointer`}>
            <div className={`${styles['wrapper-user-image']} float-start`}>
              <Image
                src={userProfile}
                alt='dahsboard'
                objectFit='cover'
                layout='fill'
              />
            </div>
            <div className='float-start ms-3'>
              <div className='fw-bold'>{`${data[i].firstName} ${data[i].lastName}`}</div>
              <div className='color-grey'>
                {data[i].noTelp !== null ? data[i].noTelp : '-'}
              </div>
            </div>
          </div>
        </Link>
      </React.Fragment>
    );
    elements.push(element);
  }
  return elements;
};

function ListUser(props) {
  return <>{loopData(props.data)}</>;
}

export default ListUser;
