import React, { Component } from 'react';
import Config from '../config/client';

class AccountSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankName: "",
      accType: "",
      currency: "SGD",
      avlBalance: 0
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.accountId !== prevProps.accountId) {
      let apiEndPoint = `${Config.apiEndPoint}/accounts?accno=${this.props.accountId}`;
      fetch(apiEndPoint)
        .then(res => res.json())
        .then(res => {
          let accDetails = res[0];
          this.setState({
            bankName: accDetails.bank,
            accType: accDetails.actype,
            currency: accDetails.currency,
            avlBalance: accDetails.balance
          });
        });
    }
  }

  getAvlBalance() {
    return `Total Balance: ${this.state.currency} ${this.state.avlBalance}`;
  }

  getAccName() {
    return `${this.state.bankName} ${this.state.accType}`;
  }

  render() {
    return (
      <div className="mb-3">
        <div className="d-flex justify-content-between font-weight-bold">
          <div className="p-2 flex-fill bd-highlight text-left">{this.getAccName()}</div>
          <div className="p-2 flex-fill bd-highlight text-right">{this.getAvlBalance()}</div>
        </div>
      </div>
    );
  }

}

export default AccountSummary;