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
		sortField: "IssuerName",
		sortDirection: "asc"
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
	render: (text, record, index)	=> <p>{text.substring(0,10)}</p>,
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
		this.refreshFromServer(this.props, this.state);
	}
	
	componentWillUpdate(nextProps, nextState) 
	{
		console.log("componentWillUpdate");
		if (nextProps.filters !== this.props.filters || nextState.sortField !== this.state.sortField || nextState.sortDirection !== this.state.sortDirection) {
			this.refreshFromServer(nextProps, nextState);
		}
	}
	
	refreshFromServer(props, state)
	{
		console.log("refreshFromServer:" + JSON.stringify(props.filters));
		var sort = 'sortField=' + state.sortField + '&sortDirection=' + state.sortDirection;
		this.bondDataService.get('/bonds?query=' + JSON.stringify(props.filters) + '&' + sort)
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
		this.setState({
			sortField : sorter.field,
			sortDirection : sorter.order
		});
	}
  
  render() {
	console.log("BondTable render");
	return ((this.state.waitingForContent === true) ?
			<div>Waiting for content...</div> :
			<Table
				columns={this.columns}
				rowKey="_id"
				dataSource={this.state.bonds}
				rowSelection={this.rowSelection}
				onChange={this.handleTableChange}
				pagination={{pageSize: 50}}
			/>
	);
  }
}
