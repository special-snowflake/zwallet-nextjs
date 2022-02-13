import Image from 'next/image';
import Link from 'next/link';
import styles from 'src/commons/styles/Home.module.css';
import defaultImage from 'public/static/images/default.jpg';
import {useEffect, useState} from 'react';

function CardUser(props) {
  const [image, setImage] = useState(defaultImage);
  useEffect(() => {
    if (props.image && props.image !== null) {
      const newImage = process.env.NEXT_PUBLIC_HOST + '/uploads/' + props.image;
      setImage(newImage);
    }
  }, [props]);
  return (
    <>
      <Link href={`/transfer/${props.id}`} passHref={true}>
        <div
          className={`col-12 ${styles['contact-item']} mb-3 px-3 cursor-pointer`}>
          <div className={`${styles['wrapper-user-image']} float-start`}>
            <Image
              src={image}
              alt='dahsboard'
              objectFit='cover'
              layout='fill'
              onError={() => {
                setImage(defaultImage);
              }}
            />
          </div>
          <div className='float-start ms-3'>
            <div className='fw-bold'>{`${props.firstName} ${props.lastName}`}</div>
            <div className='color-grey'>
              {props.noTelp !== null ? props.noTelp : '-'}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CardUser;
