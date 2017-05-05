import React, { Component } from 'react';
import { Table } from 'antd';
import '../App.css';

export class BondTable extends Component {

  handleTableChange = (pagination, filters, sorter) => {
	  console.log(sorter);
  }

  columns = [
	{
	  title: 'Issuer',
	  dataIndex: 'issuer',
	  key: 'issuer',
	  sorter: true,
	}, {
	  title: 'Coupon',
	  dataIndex: 'coupon',
	  key: 'coupon',
	  sorter: true,
	}, {
	  title: 'Maturity',
	  dataIndex: 'maturity',
	  key: 'maturity',
	  sorter: true,
	}, {
	  title: 'Px',
	  dataIndex: 'px',
	  key: 'px',
	  sorter: true,
	}, {
	  title: 'OAS',
	  dataIndex: 'oas',
	  key: 'oas',
	  sorter: true,
	}, {
	  title: 'Rec',
	  dataIndex: 'rec',
	  key: 'rec',
	  sorter: true,
	}, {
	  title: 'Face',
	  dataIndex: 'face',
	  key: 'face',
	  sorter: true,
	}
  ];	  
  
  dataSource = [
	{
	  key: '1',
	  issuer: 'Ford Motor Company',
	  coupon: 4.329,
	  maturity: '2026-01-08',
	  px: 100.664,
	  oas: 186,
	  rec: 'O/P',
	  face: 1200
	}, {
	  key: '2',
	  issuer: 'Ford Motor Company',
	  coupon: 1.724,
	  maturity: '2017-12-06',
	  px: 99.959999,
	  oas: 85,
	  rec: 'O/P',
	  face: 1250
	}, {
	  key: '3',
	  issuer: 'Ford Motor Company',
	  coupon: 2.145,
	  maturity: '2018-01-09',
	  px: 100.228986,
	  oas: 99,
	  rec: 'O/P',
	  face: 750
	}, {
	  key: '4',
	  issuer: 'Ford Motor Company',
	  coupon: 4.134,
	  maturity: '2025-08-04',
	  px: 99.225998,
	  oas: 183,
	  rec: 'O/P',
	  face: 1400
	}, {
	  key: '5',
	  issuer: 'Ford Motor Company',
	  coupon: 2.375,
	  maturity: '2018-01-16',
	  px: 100.455002,
	  oas: 101,
	  rec: 'O/P',
	  face: 1250
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


  
  
  render() {
	  
	  
	return (
		<Table
			columns={this.columns}
			dataSource={this.dataSource}
			rowSelection={this.rowSelection}
			onChange={this.handleTableChange}
		/>
	);
  }
}
