import Image from 'next/image';
import Link from 'next/link';

import style from 'src/commons/styles/Starter.module.css';
import phones from 'public/static/images/Phones.png';

function LeftContentStarter() {
  return (
    <>
      <div className='row h-100 align-middle'>
        <div className='col-12 col-lg-10 col-xl-9 col-xxl-8 mx-auto px-0'>
          <div className='mt-5'>
            <Link href='/auth/login' passHref>
              <span className='logo-zwallet'>Zwallet</span>
            </Link>
          </div>
        </div>
        <div className='col-12 col-lg-10 mx-auto px-5 mb-0'>
          <div className={`${style['image-phone']}`}>
            <Image
              src={phones}
              alt='phones'
              layout='fill'
              objectFit='contain'
            />
          </div>
        </div>
        <div className='col-12 col-lg-10 mx-auto px-5 mb-5'>
          <p className={`${style['left-header']} fw-bold`}>
            App that Covering Banking Needs.
          </p>
          <p className={`${style['left-sub-header']}`}>
            Zwallet is an application that focussing in banking needs for all
            users in the world. Always updated and always following world
            trends. 5000+ users registered in Zwallet everyday with worldwide
            users coverage.
          </p>
        </div>
      </div>
    </>
  );
}

export default LeftContentStarter;
