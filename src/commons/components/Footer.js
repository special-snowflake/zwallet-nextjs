import styles from 'src/commons/styles/Starter.module.css';
function Footer() {
  return (
    <footer className={`p-0 m-0 bottom-0 w-100 ${styles['footer']} px-md-5 px-1`}>
      <div className='row w-100 m-0 py-0 px-md-5 align-middle'>
        <div className='col-6 col-md-5 mt-4'>2020 Zwallet. All right reserved.</div>
        <div className='col-6 col-md-6 mt-4 ms-auto my-auto'>
          <div className='row w-100 m-0 p-0 justify-content-end'>
            <div className='col-12 col-md-auto text-end'>+62-5637-8882-9901</div>
            <div className='col-12 col-md-auto ms-3 text-end'>contact@zwallet.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
