import 'src/commons/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {ToastContainer} from 'react-toastify';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from 'src/redux/store';
import {store} from 'src/redux/store';
import {Provider} from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({Component, pageProps}) {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
