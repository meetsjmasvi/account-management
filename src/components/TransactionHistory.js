import React, { Component } from 'react';
import Table from "react-bootstrap/Table";
import Moment from 'react-moment';

class TransactionHistory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "Fund Transfer",
      data: []
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.accountId !== prevProps.accountId) {
      this.props.accountService.fetchTransactionDetails(this.props.accountId)
        .then(res => {
          this.setState({
            data: res.data
          });
        });

    }
  }

  getHistoryRow() {
    if (!this.state.data || !this.state.data.length) return null;

    return this.state.data.map((item, index) => {
      return <tr key={index}>
        <td><Moment parse="YYYY-MM-DD HH:mm:ss" format="DD/MM/YYYY">>{item.timestamp}</Moment></td>
        <td>{item.action}</td>
        <td>{item.description}</td>
        <td>{item.amount}</td>
        <td>{item.currency}</td>
      </tr>;
    });
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Action</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          {this.getHistoryRow()}
        </tbody>
      </Table>
    );
  }

}

export default TransactionHistory;