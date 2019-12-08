import axios from 'axios';
import Config from '../config/client';
import moment from 'moment';
import { deepCopy } from './utils';

function AccountService() {
  this._deferred = {};
  this._deferred.promise = new Promise((resolve, reject) => {
    this._deferred.resolve = resolve;
    this._deferred.reject = reject;
  });

  this.accountDetails = {};
  this.accountNo = [];

  this.init = this.init.bind(this);
  this._initData = this._initData.bind(this);
  this.init();
};

AccountService.prototype.init = function () {
  axios.get(`${Config.apiEndPoint}/accounts`)
    .then(resp => resp.data)
    .then(this._initData);
};

AccountService.prototype._initData = function (resp) {
  this.accountDetails = resp.reduce((objAcc, item) => {
    objAcc[item.accno] = item;
    return objAcc;
  }, {});

  this.accountNo = Object.keys(this.accountDetails);

  this._deferred.resolve();
};


AccountService.prototype.whenReady = function () {
  return this._deferred.promise;
};


AccountService.prototype.getID = function (accNo) {
  return this.accountDetails[accNo].id;
};


AccountService.prototype.fetchAccountByID = function (accountId) {
  return axios.get(`${Config.apiEndPoint}/accounts?accno=${accountId}`);
};


AccountService.prototype.updateAccount = function (args) {
  let id = this.getID(args.accno);

  return axios.put(`${Config.apiEndPoint}/accounts/${id}`, args);
};

AccountService.prototype.fetchAccountDetails = function () {
  let { accountNo } = this.accountNo;
  return {
    accountNo
  };
}

AccountService.prototype.fetchTransactionDetails = function (accountId) {
  return axios.get(`${Config.apiEndPoint}/transactions?accno=${accountId}&_sort=timestamp&_order=desc`)
}

AccountService.prototype.updateTransaction = function (args) {
  let { sourceAccount, targetAccount, transferAmount, description } = args;

  let srcAcountTransTable = {
    'accno': sourceAccount,
    'accref': targetAccount,
    'action': 'debit',
    'amount': transferAmount,
    'description': description,
    'currency': 'SGD',
    'timestamp': moment().format('YYYY-MM-DD HH:mm:ss')
  };

  // Updating Sender Transaction Table
  return axios({
    'url': `${Config.apiEndPoint}/transactions`,
    'method': 'post',
    'headers': { 'Content-Type': 'application/json' },
    'data': srcAcountTransTable
  });
};



AccountService.prototype.handleFundTransfer = function (args) {
  let { sourceAccount, targetAccount, transferAmount } = args;

  let objSrcAccount = deepCopy(this.accountDetails[sourceAccount]);
  let objTgtAccount = deepCopy(this.accountDetails[targetAccount]);

  objSrcAccount.balance -= transferAmount;
  objTgtAccount.balance += transferAmount;

  let srcACUpdate = this.updateAccount(objSrcAccount);
  let tgtACUpdate = this.updateAccount(objTgtAccount);
  let srcTransUpdate = this.updateTransaction({ ...args, action: 'debit' });
  let tgtTransUpdate = this.updateTransaction({ ...args, action: 'credit', 'accno': targetAccount, 'accref': sourceAccount });

  return Promise.all([srcACUpdate, tgtACUpdate, srcTransUpdate, tgtTransUpdate]);
};

export default AccountService;
