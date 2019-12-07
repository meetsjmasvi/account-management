import React, { Component } from 'react';
import AccountService from '../../services/accounts';
import { Messages, getMessage } from '../../messages';

import { deepCopy } from '../../services/utils';
import defaultState from './defaultState';

class FundTransfer extends Component {

  constructor(props) {
    super(props);

    this.state = deepCopy(defaultState);

    this._accountService = new AccountService();

    this._accountService.whenReady().then(() => {
      this.setState({
        readyState: true
      })
    })

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getAccountOptions = this.getAccountOptions.bind(this);
    this.onSourceAccountChange = this.onSourceAccountChange.bind(this);
    this.onTargetAccountChange = this.onTargetAccountChange.bind(this);

  };

  componentDidMount() {

  }


  getAccountOptions(accToSkip) {
    let optionObj = [
      <option key='0' value='select'>Select Account</option>
    ];

    return this._accountService.accountNo.reduce((options, item) => {
      if (item !== accToSkip) {
        options.push(<option key={options.length} value={item}>{item}</option>);
      }

      return options;
    }, optionObj);
  }

  onSourceAccountChange(target) {
    let acc = this._accountService.accountDetails[target.value];
    let newState = this.state.data;

    newState.srcID = acc.id;
    newState.tgtID = null;
    newState.targetAccount = 'select';
    newState.sourceAccount = acc.accno;
    newState.sourceAccountBalance = acc.balance;

    this.setState({ data: newState });
  }

  onTargetAccountChange(target) {
    let acc = this._accountService.accountDetails[target.value];

    let newState = this.state.data;
    newState.tgtID = acc.id
    newState.targetAccount = target.value;

    this.setState({ data: newState });
  }


  handleSubmit = event => {
    event.preventDefault();

    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;

    if (Object.values(formValidity).every(Boolean)) {
      if (!formValues.description) {
        formValues.description = `Transaction from ${formValues.sourceAccount} to ${formValues.targetAccount}`;
      }

      let savedStatus = this._accountService.handleFundTransfer(Object.assign({}, formValues));

      savedStatus.then(() => {
        let currentState = deepCopy(defaultState, { readyState: true });
        this.setState(currentState);
      });
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: true });
    }
  };

  handleChange({ target }) {
    const { formValues } = this.state;

    if (target.name === 'transferAmount') {
      formValues[target.name] = Number(target.value) || 0;
    } else {
      formValues[target.name] = target.value;
    }

    this.setState({ formValues });
    this.handleValidation(target);
  }

  handleValidation = target => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;

    validity[name] = value.length > 0;

    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${getMessage[name]} ${getMessage('requiedAndNotEmpty')}`;

    if (validity[name]) {
      if (name === 'sourceAccount') {
        validity[name] = value.toUpperCase() !== 'SELECT'
        validity[name] && this.onSourceAccountChange(target);

        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be valid.`;
      }

      if (name === 'targetAccount') {
        validity[name] = value.toUpperCase() !== 'SELECT';
        validity[name] && this.onTargetAccountChange(target);

        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${getMessage([name])} ${getMessage('validValue')}.`;
      }

      if (name === 'transferAmount') {
        validity[name] = value !== ''
          && !isNaN(Number(value))
          && value <= this.state.data.sourceAccountBalance;

        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${getMessage[name]} ${getMessage('shouldBeValidNumber')}`;
      }
    }
    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };

  render() {
    const { formValues, formValidity, formErrors, isSubmitting, data } = this.state;

    if (this.state.readyState) {
      return (
        <div className="my-account mt-5 mb-5 pb-5">
          <h1 className="text-left pb-3">Fund Transfer</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="form-group col" md="4">
                <label htmlFor="sourceAccount">From Account <span className="available-balance">{`Bal: ${data.sourceAccountBalance}`}</span></label>
                <select name="sourceAccount" className={`form-control ${formErrors.sourceAccount ? 'is-invalid' : ''}`} placeholder="From Account" value={formValues.sourceAccount} onChange={this.handleChange}>
                  {this.getAccountOptions()}
                </select>
                <div className={`invalid-feedback ${formValidity.sourceAccount ? 'd-sm-block' : ''}`}>{formErrors.sourceAccount}</div>
              </div>
              <div className="form-group col" md="4">
                <label for="targetAccount">To Account</label>
                <select name="targetAccount" className={`form-control ${formErrors.targetAccount ? 'is-invalid' : ''}`} placeholder="To Account" value={formValues.targetAccount} onChange={this.handleChange}>
                  {this.getAccountOptions(data.sourceAccount)}
                </select>
                <div className={`invalid-feedback ${formValidity.targetAccount ? 'd-sm-block' : ''}`}>{formErrors.targetAccount}</div>
              </div>
              <div className="form-group col" md="4">
                <label for="avlBalance">Transfer Amount</label>
                <input type="text" name="transferAmount" className={`form-control ${formErrors.transferAmount ? 'is-invalid' : ''}`} placeholder="Transfer Amount" value={formValues.transferAmount} onChange={this.handleChange} />
                <div className={`invalid-feedback ${formValidity.transferAmount ? 'd-sm-block' : ''}`}>{formErrors.trasferAmount}</div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-12 col-md-4">
                <label for="avlBalance">Description</label>
                <input type="text" name="description" maxLength="100" className="form-control" placeholder="Description" value={formValues.description} onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-4 offset-4">
                <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>Transfer</button>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return <div>Loading....</div>
    }
  }

}

export default FundTransfer;