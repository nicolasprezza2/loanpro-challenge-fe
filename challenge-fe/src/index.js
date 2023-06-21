import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configAxios } from './components/Auth/axios.config';
import 'bootstrap/dist/css/bootstrap.min.css'


/* const history = createBrowserHistory(); */
configAxios();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter> 
    {/* <Router history={history}> */}
      <App />
   {/*  </Router>  */} 
  </BrowserRouter>
  </React.StrictMode>
);


