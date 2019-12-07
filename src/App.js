import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MyAccount from "./components/MyAccount";
import FundTransfer from "./components/FundTransfer/FundTransfer";

import './App.css';

function App() {
  return (
    <div className="App w-100">
      <Header />
      <Container fluid className="App">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={MyAccount} />
              <Route exact path="/summary" component={MyAccount} />
              <Route path="/transfer" component={FundTransfer} />
            </Switch>
          </Suspense>
        </Router>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
