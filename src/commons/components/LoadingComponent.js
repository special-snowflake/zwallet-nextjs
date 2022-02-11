import load from 'src/commons/styles/Loading.module.css';
function LoadingComponent() {
  return (
    <>
      <div className={load.wrapper}>
        <div className={load['lds-roller']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default LoadingComponent;
