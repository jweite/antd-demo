import React, { Component } from 'react';
import { Table } from 'antd';
import '../App.css';

export class BondTable extends Component {
  constructor(props) {
	super(props);
	
	this.bondDataService = props.bondDataService;
		
	this.state = {
		waitingForContent: true,
		bonds: [],
	}
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
  
	componentWillMount() 
	{
		this.refreshFromServer('IssuerName', 'asc');
	}
	
	componentWillUpdate(nextProps, nextState) 
	{
		console.log("componentWillUpdate");
	}
	
	refreshFromServer(sortField, sortDirection)
	{
		var query='{"ParentSector":"Basic Industry", "Coupon": { "$gt": 4, "$lt":6 }}';
		var sort = 'sortField=' + sortField + '&' + 'sortDirection=' + sortDirection;
		console.log(sort);
		this.bondDataService.get('/bonds?query=' + query + '&' + sort)
			.then((response) => {
				this.contentReceived(response.data);
			})
			.catch(function (error) {
				console.log(error);
			})
		;
	}

	contentReceived(bonds) {
		this.setState({
			waitingForContent: false,
			bonds: bonds
		});
	}

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

	handleTableChange = (pagination, filters, sorter) => {
		this.refreshFromServer(sorter.field, sorter.order);
	}
  
  render() {
//	console.log(this.state);
	return ((this.state.waitingForContent === true) ?
			<div>Waiting for content...</div> :
			<Table
				columns={this.columns}
				rowKey="_id"
				dataSource={this.state.bonds}
				rowSelection={this.rowSelection}
				onChange={this.handleTableChange}
			/>
	);
  }
}
