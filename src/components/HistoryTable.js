import React, { Component } from 'react';
import Table from "react-bootstrap/Table";
import Moment from 'react-moment';

class HistoryTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "Fund Transfer",
      data: []
    };
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.accountId !== prevProps.accountId) {
      let apiEndPoint = `http://localhost:3001/transactions?accno=${this.props.accountId}&_sort=timestamp&_order=desc`;
      fetch(apiEndPoint)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res
          });
        });
    }
  }

  getHistoryRow() {
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

export default HistoryTable;