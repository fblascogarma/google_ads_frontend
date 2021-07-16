import React, { Fragment } from 'react';
import { Route, Switch, BrowserRouter, } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import LearnMore from './components/LearnMore';
import GoogleAds from './components/GoogleAds';
import NavBar from './components/NavBar';
import About from './components/About';
import Login from './components/Login';
import ScrollToTop from './components/ScrollToTop';
import AccessibleCustomers from './components/AccessibleCustomers';
import Campaigns from './components/Campaigns';

const App = () => (
<BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
  <NavBar />
  <div className="container mt-4">
      
    <Fragment>
      <ScrollToTop />
      <Switch>
        <Route exact path= "/" component={Home} />
        <Route exact path= "/learnmore" component={LearnMore} />
        <Route exact path= "/googleads" component={GoogleAds} />
        <Route exact path= "/login" component={Login} />
        <Route exact path= "/googleads/accounts" component={AccessibleCustomers} />
        <Route exact path= "/googleads/accounts/campaigns" component={Campaigns} />
        <Route exact path= "/about" component={About} />
      </Switch>
    </Fragment>
  <Footer />
  
  </div>
</BrowserRouter>
);

export default App;
