import Link from 'next/link';
import Footer from 'src/commons/components/Footer';

import Image from 'next/image';
import Title from 'src/commons/components/Title';

import style from 'src/commons/styles/Landing.module.css';

import microsoft from 'public/static/icons/microsoft.svg';
import dell from 'public/static/icons/dell.svg';
import hnm from 'public/static/icons/hnm.svg';
import canon from 'public/static/icons/canon.svg';
import dropbox from 'public/static/icons/dropbox.svg';
import airbnb from 'public/static/icons/airbnb.svg';
import phones from 'public/static/images/phones2.png';
import walter from 'public/static/images/walter-white.jpg';

function Landing() {
  return (
    <>
      <Title title='Welcome to Zwallet' />
      <header className={style.landingTop}>
        <div className='row m-0 p-0'>
          <div className='col-12 row m-0 p-0'>
            <div className='col-4 text-start p-5'>
              <p className='fw-bold color-white'>Zwallet</p>
            </div>
            <div className='col-8 text-end px-2 py-5 p-md-5'>
              <Link href='/auth/login' passHref={true}>
                <button className={`btn ${style.btnBlue} me-2`}>Login</button>
              </Link>
              <Link href='/auth/signup' passHref={true}>
                <button className={`btn ${style.btnWhite}`}>Sign Up</button>
              </Link>
            </div>
            <div className='col-12 text-center'>
              <h1 className='my-5'>
                Awesome App For <br /> Saving Time.
              </h1>
              <p className='my-3'>
                We bring you a mobile app for banking problems that <br />
                oftenly wasting much of your times.
              </p>
              <button className={`btn m-5 ${style.btnWhite}`}>
                <Link href={'/auth/signup'}>Try It Free</Link>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className={style.landingMiddle}>
        <div className='row m-0 mt-5 p-0 align-middle'>
          <div className='col-12 text-center'>
            <h1>
              <span className='color-blue my-5'>Why</span> Choose Zwallet?
            </h1>
            <p className='mt-3 mb-5'>
              We have some great features from the application and it’s totally
              free
              <br /> to use by all users around the world.
            </p>
          </div>
          <div className='col-12 my-5 mx-0 row p-0 justify-content-center'>
            <div className='col-12 col-md-3 mx-2 text-center'>
              <div className={`${style.logoSupport} mx-auto`}></div>
              <h3>{`24/7 Support`}</h3>
              <p className='my-3'>
                We have 24/7 contact support so you can <br /> contact us
                whenever you want <br /> and we will respond it.
              </p>
            </div>
            <div className='col-12 col-md-3 mx-2 text-center'>
              <div className={`${style.logoPrivacy} mx-auto`}></div>
              <h3>Data Privacy</h3>
              <p className='my-3'>
                We make sure your data is safe in our <br />
                database and we will encrypt any <br />
                data you submitted to us.
              </p>
            </div>
            <div className='col-12 col-md-3 mx-2 text-center'>
              <div className={`${style.logoDownload} mx-auto`}></div>
              <h3>Easy Download</h3>
              <p className='my-3'>
                {`Zwallet is 100% totally free to  use it’s`} <br /> now
                available on Google Play Store <br /> and App Store.
              </p>
            </div>
          </div>
        </div>
      </main>
      <div className={`${style.landingSecondMiddle} mx-0`}>
        <div className={style.companySupport}>
          <div className='row m-0 py-5 justify-content-center'>
            <div className={`col-2 ${style.brandLogo}`}>
              <Image
                src={microsoft}
                alt='dahsboard'
                objectFit='contain'
                layout='fill'
              />
            </div>
            <div className={`col-2 ${style.brandLogo}`}>
              <Image
                src={dell}
                alt='dahsboard'
                objectFit='contain'
                layout='fill'
              />
            </div>
            <div className={`col-2 ${style.brandLogo}`}>
              <Image
                src={airbnb}
                alt='dahsboard'
                objectFit='contain'
                layout='fill'
              />
            </div>
            <div className={`col-2 ${style.brandLogo}`}>
              <Image
                src={hnm}
                alt='dahsboard'
                objectFit='contain'
                layout='fill'
              />
            </div>
            <div className={`col-2 ${style.brandLogo}`}>
              <Image
                src={dropbox}
                alt='dahsboard'
                objectFit='contain'
                layout='fill'
              />
            </div>
            <div className={`col-2 ${style.brandLogo}`}>
              <Image
                src={canon}
                alt='dahsboard'
                objectFit='contain'
                layout='fill'
              />
            </div>
          </div>
        </div>
        <div className='col-12 my-5 text-center'>
          <div className='w-50 mx-auto'>
            <h1 className={style.infoMoney}>Rp. 390.736.500</h1>
          </div>
        </div>
        <div className='col-12 my-5 text-center fw-bolder'>
          <h1 className={style.infoMoneyHeader}>
            <span className='color-blue'> Money</span> Has Been Transfered
          </h1>
        </div>
        <div className='col-12 my-5 text-center'>
          <p>
            That amount of money has been transfered from all users. We still
            <br />
            counting and going strong!
          </p>
        </div>
      </div>
      <div className={style.landingFeature}>
        <div className={`row m-0 p-0 ${style.landingFeatureRow}`}>
          <div className='col-12 col-md-5 p-0 text-start'>
            <div className={`${style.phonesWrapper} align-middle`}>
              <Image
                src={phones}
                alt='dahsboard'
                priority={true}
                objectFit='contain'
                layout='fill'
              />
            </div>
          </div>
          <div className='col-7 text-left row m-0 p-0'>
            <div className='col-7'>
              <h1>
                All The <span className='color-blue'>Great</span> <br /> Zwallet
                Feature
              </h1>
            </div>
            <div className='col-12 my-3'>
              <div className={style.featureWrapper}>
                <p className='fw-bold'>
                  <span className='color-blue'>1.</span>Small Fee
                </p>
                <p>
                  We only charge 5% of every success transaction done in Zwallet
                  app.
                </p>
              </div>
            </div>
            <div className='col-12 my-3'>
              <div className={style.featureWrapper}>
                <p className='fw-bold'>
                  <span className='color-blue'>2.</span>Data Secured
                </p>
                <p>{`All your data is secured properly in our system and it’s encrypted.`}</p>
              </div>
            </div>
            <div className='col-12 my-3'>
              <div className={style.featureWrapper}>
                <p className='fw-bold'>
                  <span className='color-blue'>3.</span>User Friendly
                </p>
                <p>
                  Zwallet come up with modern and sleek design and not
                  complicated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.landingTestimony}>
        <div className='text-center my-5'>
          <h1>
            What Users are <span className='color-blue'>Saying.</span>
          </h1>
        </div>
        <div className='text-center my-3'>
          <p>
            We have some great features from the application and {`it’s`}
            totally free to use by all users around the world.
          </p>
        </div>
        <div className={`${style.testimony} my-5`}>
          <div className={style.userImgWrapper}>
            <Image
              src={walter}
              alt='user testimony'
              layout='fill'
              objectFit='cover'></Image>
          </div>
          <div className='name my-3 fw-bold'>Walter White</div>
          <div className='color-grey mt-2 mb-4'>
            Teacher and Father of disabled.
          </div>
          <p>
            “This is the most outstanding app that I’ve ever try in my live,
            this app is such an amazing masterpiece and it’s suitable for you
            who is bussy with their bussiness and must transfer money to another
            person aut there. Just try this app and see the power!”
          </p>
        </div>
      </div>
      <div className={`${style.landingFooter} p-md-5 p-1`}>
        <div className='pb-md-0 p-md-5'>
          <div className='logo-zwallet color-white'>Zwallet</div>
          <p className={`color-white ${style.footerText}`}>
            Simplify financial needs and saving much time in banking needs with
            one single app.
          </p>
          <hr />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Landing;
