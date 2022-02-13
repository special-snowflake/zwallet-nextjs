import Image from 'next/image';
import defaultImage from 'public/static/images/default.jpg';

import {
  numberToRupiah,
  capitalizeFirstLetter,
} from 'src/modules/helpers/collection';

import styles from 'src/commons/styles/Home.module.css';
import Link from 'next/link';
import {useEffect, useState} from 'react';
function TransactionList(props) {
  const [userImage, setUserImage] = useState(defaultImage);
  
  const {fullName, image, amount, type} = props.data;
  const path = '/history/' + props.data.id;
  
  useEffect(() => {
    if (image && image !== null) {
      const host = process.env.NEXT_PUBLIC_HOST;
      const newImage = host + '/uploads/' + image;
      setUserImage(newImage);
    }
  }, []);
  return (
    <>
      <Link href={path} passHref>
        <div className='row p-0 m-0 mt-3 w-100 justify-content-between cursor-pointer'>
          <div className={`col-8 ${styles['display-history']}`}>
            <div
              className={`${styles['transaction-user']} ms-auto me-1 float-start`}>
              <Image
                src={userImage}
                alt='dahsboard'
                objectFit='cover'
                placeholder='blur'
                blurDataURL={defaultImage}
                layout='fill'
                onError={(e) => {
                  console.log('target e', e);
                  setUserImage(defaultImage);
                }}
              />
            </div>
            <div className='float-start ms-1'>
              <div className={styles['transaction-name']}>{fullName}</div>
              <div className='color-grey'>{capitalizeFirstLetter(type)}</div>
            </div>
          </div>
          <div
            className={`col-4 text-end ${
              type === 'topup' || type === 'accept'
                ? 'color-green'
                : 'color-red'
            }`}>
            {`${
              type === 'topup' || type === 'accept'
                ? `+${numberToRupiah(amount)}`
                : `-${numberToRupiah(amount)}`
            }`}
          </div>
        </div>
      </Link>
    </>
  );
}
export default TransactionList;
