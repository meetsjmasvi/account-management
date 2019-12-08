import React, { Suspense, lazy, Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Container from "react-bootstrap/Container";

import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MyAccount from "./components/MyAccount";
import FundTransfer from "./components/FundTransfer/FundTransfer";
import AccountService from "./services/accounts";
import './App.css';

const instance = new AccountService();
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      readyState: false
    };
  };

  componentDidMount() {
    instance.whenReady().then(() => {
      this.setState({ readyState: true });
    });
  }

  render() {
    if (this.state.readyState) {
      return (
        <div className="App w-100">
          <Header />
          <Container fluid className="app-container">
            <Router>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/summary" render={(props) => <MyAccount accountService={instance} />} />
                  <Route path="/transfer" render={(props) => <FundTransfer accountService={instance} />} />
                  <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                </Switch>
              </Suspense>
            </Router>
          </Container>
          <Footer />
        </div>
      )
    } else {
      return (
        <div className="page-loading">Page Loading....</div>
      );
    }
  }
}

export default App;
