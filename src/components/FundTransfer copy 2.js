import React, { Component } from 'react';
import Config from '../config/client';

import axios from 'axios';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

class FundTransfer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      data: {
        sourceAccount: 'select',
        targetAccount: 'select',
        sourceAccountBalance: 0,
        targetAccountBalance: 0
      },
      form: {
        sourceAccount: false,
        targetAccount: false,
        avlBalance: false
      },
      allAccount: [],
      accDetails: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.handleFundTransfer = this.handleFundTransfer.bind(this);
    this.onSourceAccountChange = this.onSourceAccountChange.bind(this);
    this.onTargetAccountChange = this.onTargetAccountChange.bind(this);

  };

  componentDidMount() {
    fetch(`${Config.apiEndPoint}/accounts`)
      .then(res => res.json())
      .then(res => {
        let accDetails = res.reduce((objAcc, item) => {
          objAcc[item.accno] = item;
          return objAcc;
        }, {});

        this.setState({
          allAccount: Object.keys(accDetails),
          accDetails
        });
      });
  }


  getAccountNumber(accToSkip) {
    let optionObj = [
      <option key='0' value='select'>Select Account</option>
    ];

    return this.state.allAccount.reduce((options, item) => {
      if (item !== accToSkip) {
        options.push(<option key={options.length} value={item}>{item}</option>);
      }

      return options;
    }, optionObj);
  }

  onSourceAccountChange(evt) {
    let acc = this.state.accDetails[evt.currentTarget.value];
    let newState = this.state.data;

    newState.srcID = acc.id;
    newState.tgtID = null;
    newState.targetAccount = 'select';
    newState.sourceAccount = acc.accno;
    newState.sourceAccountBalance = acc.balance;

    this.setState({ data: newState });
  }

  onTargetAccountChange(evt) {
    let acc = this.state.accDetails[evt.currentTarget.value];

    let newState = this.state.data;
    newState.tgtID = acc.id
    newState.targetAccount = evt.target.value;
    newState.targetAccountBalance = acc.balance; // SHOULD BE IN BACKEND

    this.setState({ data: newState });
  }

  onAmountChange(evt) {
    const re = /^[0-9\b]+$/;
    if (evt.target.value === '' || re.test(evt.target.value)) {
      this.setState({
        transferAmount: Number(evt.target.value)
      })
    }
  }

  handleFundTransfer() {
    let data = this.state.data;
    // THIS LOGIC SHOULD BE THERE IN THE BACKEND IF WE HAVE PROPER BACKEND SERVICE
    // FOR ASSIGNMENT PURPOSE IT HAS BEEN WRITTEN HERE
    let senderNewBal = this.state.data.sourceAccountBalance - this.state.transferAmount;
    let receiverNewBal = this.state.data.targetAccountBalance + this.state.transferAmount;

    let sourceAccount = JSON.parse(JSON.stringify(this.state.accDetails[data.sourceAccount]));
    let targetAccount = JSON.parse(JSON.stringify(this.state.accDetails[data.targetAccount]));

    sourceAccount.balance = senderNewBal;
    targetAccount.balance = receiverNewBal;

    delete sourceAccount.id;

    axios.put(`${Config.apiEndPoint}/accounts/${data.srcID}`, sourceAccount)
      .then(resp => {
        debugger;
      })
      .catch(error => {
        debugger;
      });
  }


  handleSubmit(evt) {
    const form = evt.currentTarget;
    debugger;
  }

  render() {
    let data = this.state.data;

    return (
      <div className="my-account mt-5 mb-5 pb-5">
        <h1 className="text-left pb-3">Fund Transfer</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form-group col" md="4">
              <label for="sourceAccount">From Account <span className="available-balance">{`Avl. Balance: ${data.sourceAccountBalance}`}</span></label>
              <select id="sourceAccount" className="form-control" required placeholder="From Account" value={data.sourceAccount} onChange={this.onSourceAccountChange}>
                {this.getAccountNumber()}
              </select>
            </div>
            <div className="form-group col" md="4">
              <label for="targetAccount">To Account</label>
              <select id="targetAccount" className="form-control" required placeholder="To Account" value={data.targetAccount} onChange={this.onTargetAccountChange}>
                {this.getAccountNumber(data.sourceAccount)}
              </select>
            </div>
            <div className="form-group col" md="4">
              <label for="avlBalance">Transfer Amount</label>
              <input
                type="text"
                id="avlBalance"
                className="form-control"
                placeholder="Transfer Amount"
                required
                value={this.state.transferAmount}
                onChange={this.onAmountChange}
              />
            </div>
          </div>
          <div className="form-group row" xs="12">
            <div className="col">
              <input type="checkbox"
                required
                label="Please confirm to trasfer the amount."
                feedback="You must confirm before transfer."
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button type="submit">Transfer</Button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default FundTransfer;