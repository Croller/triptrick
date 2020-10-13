import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// import ru from 'antd/lib/locale-provider/ru_RU';
// import en from 'antd/lib/locale-provider/en_US';
// import { ConfigProvider } from 'antd';

import { I18nextProvider } from 'react-i18next';
import App from './App';
import configureStore from './store/configStore';
import i18n from './i18n';

const store = configureStore();

const root = (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App i18n={i18n} />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  store.subscribe(() => {
    console.log('subscribe', store.getState());
  });
}
