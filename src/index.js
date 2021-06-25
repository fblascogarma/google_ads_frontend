import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';
// import './index.css';
import App from './App';
import {CookiesProvider} from 'react-cookie';
// import reportWebVitals from './reportWebVitals';

function Router() {

  return(

    <CookiesProvider>
      <BrowserRouter>
          <Route exact path = '/' component = {App}/>
      </BrowserRouter>
    </CookiesProvider>
  )
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
