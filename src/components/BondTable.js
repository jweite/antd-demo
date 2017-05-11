import React, { Component } from 'react';
import { Table } from 'antd';
import '../App.css';

export class BondTable extends Component {
  constructor(props) {
	super(props);
		
	this.state = {
		waitingForContent: true,
		bonds: []
	}
  }
	
  handleTableChange = (pagination, filters, sorter) => {
	  console.log(sorter);
  }

  columns = [
	{
	  title: 'Issuer',
	  dataIndex: 'IssuerName',
	  key: 'issuer',
	  sorter: true,
	}, {
	  title: 'Coupon',
	  dataIndex: 'Coupon',
	  key: 'coupon',
	  sorter: true,
	}, {
	  title: 'Maturity',
	  dataIndex: 'Maturity',
	  key: 'maturity',
	  sorter: true,
	}, {
	  title: 'Px',
	  dataIndex: 'LatestPrice',
	  key: 'px',
	  sorter: true,
	}, {
	  title: 'OAS',
	  dataIndex: 'LatestOAS',
	  key: 'oas',
	  sorter: true,
	}, {
//	  title: 'Rec',
//	  dataIndex: 'rec',
//	  key: 'rec',
//	  sorter: true,
//	}, {
	  title: 'Face',
	  dataIndex: 'FaceValue',
	  key: 'face',
	  sorter: true,
	}
  ];	  
  
	rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		},
		onSelect: (record, selected, selectedRows) => {
			console.log(record, selected, selectedRows);
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
			console.log(selected, selectedRows, changeRows);
		},
		getCheckboxProps: record => ({
			disabled: record.name === 'Disabled User',    // Column configuration not to be checked
		}),
	};

	componentWillMount() 
	{
		this.refreshFromServer(this.props);
	}
	
	componentWillUpdate(nextProps, nextState) 
	{
		// this.refreshFromServer(nextProps);
	}
	
	refreshFromServer(props)
	{
		this.props.bondDataService.get('/bonds?query={"ParentSector":"Basic Industry", "Coupon": { "$gt": 4, "$lt":6 }}')
			.then((response) => {
				this.contentReceived(response.data);
			})
			.catch(function (error) {
				console.log(error);
			})
		;
	}

	contentReceived(bonds) {
		console.log("Response");
		console.log(bonds);
		this.setState({
			waitingForContent: false,
			bonds: bonds
		});
	}
	
  
  render() {
	console.log("Render");
	console.log(this.state)
	  
	return ((this.state.waitingForContent === true) ?
			<div>Waiting for content...</div> :
			<Table
				columns={this.columns}
				dataSource={this.state.bonds}
				rowSelection={this.rowSelection}
				onChange={this.handleTableChange}
			/>
	);
  }
}
