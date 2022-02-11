import Image from 'next/image';
import defaultImage from 'public/static/images/default.jpg';

import {
  numberToRupiah,
  capitalizeFirstLetter,
} from 'src/modules/helpers/collection';

import styles from 'src/commons/styles/Home.module.css';
import Link from 'next/link';
function TransactionList(props) {
  const host = process.env.NEXT_PUBLIC_HOST;
  console.log('props list', props);
  const {fullName, image, amount, type} = props.data;
  const path = '/history/' + props.data.id;
  return (
    <>
      <Link href={path} passHref>
        <div className='row p-0 m-0 mt-3 w-100 justify-content-between cursor-pointer'>
          <div className='col-8'>
            <div
              className={`${styles['transaction-user']} ms-auto me-1 float-start`}>
              <Image
                src={defaultImage}
                alt='dahsboard'
                objectFit='cover'
                layout='fill'
              />
            </div>
            <div className='float-start ms-3'>
              <div>{fullName}</div>
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
