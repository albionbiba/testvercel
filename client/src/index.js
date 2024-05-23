import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Correct import path to App component
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cWWJCe0x0Rnxbf1x0ZFBMZV5bRX5PIiBoS35RckVnW3xfd3FcRWBcV0R1');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
