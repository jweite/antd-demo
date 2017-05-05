import React, { Component } from 'react';
import { Button, Checkbox, Col, DatePicker, Icon, InputNumber, Row, Slider, Table } from 'antd';
import './App.css';

class App extends Component {
  handleTableChange = (pagination, filters, sorter) => {
	  console.log(sorter);
  }
  
  iconClick = (parameter) => {
	  console.log("Icon clicked: ");
	  console.log(parameter);
  }
	
  render() {
	const columns = [{
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
	}];	  
	  
const dataSource = [{
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

	const rowSelection = {
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
  
    return (
      <div className="App">
		<Row>
			<Col span={6} className="App-panels">
				<Row type="flex" justify="start"><Icon type="up" onClick={this.iconClick} />&nbsp;<strong>Recommendations</strong></Row>
				<Row type="flex" justify="start" className="App-filterbar-checkbox-panel"><Checkbox>Outperform</Checkbox></Row>
				<Row type="flex" justify="start" className="App-filterbar-checkbox-panel"><Checkbox>Market Perform</Checkbox></Row>
				<Row type="flex" justify="start" className="App-filterbar-checkbox-panel"><Checkbox>Underperform</Checkbox></Row>

				<hr className="App-filterbar-hr"/>

				<Row type="flex" justify="start"><Icon type="up" />&nbsp;<strong>Rating</strong></Row>
				<Row><Button.Group className="App-filterbar-button-group"><Button type="primary" className="App-filterbar-button">ACR</Button><Button className="App-filterbar-button">CSR</Button></Button.Group></Row>
				<Row>
					<Col span={3}/>
					<Col span={9}>
						<Row type="flex" justify="start"><Checkbox>AAA</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox>AA</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox>A</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox>BBB</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox>BB</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox>B</Checkbox></Row>
					</Col>
					<Col span={9}>
						<Row type="flex" justify="start"><Checkbox>CCC</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox>CC</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox>C</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox>D</Checkbox></Row>
					</Col>
				</Row>

				<hr className="App-filterbar-hr"/>

				<Row type="flex" justify="start"><Icon type="up" />&nbsp;<strong>Time</strong></Row>
				<Row><Button.Group className="App-filterbar-button-group"><Button type="primary" className="App-filterbar-button">Maturity</Button><Button className="App-filterbar-button">Duration</Button></Button.Group></Row>
				<DatePicker/>

				<hr className="App-filterbar-hr"/>

				<Row type="flex" justify="start"><Icon type="up" />&nbsp;<strong>Px</strong></Row>
				<Slider min={0} max={100} range={true} value={[18,66]}/>

				<hr className="App-filterbar-hr"/>

				<Row type="flex" justify="start"><Icon type="up" />&nbsp;<strong>OAS/Yield</strong></Row>
				<Row><Button.Group className="App-filterbar-button-group"><Button type="primary" className="App-filterbar-button">OAS</Button><Button className="App-filterbar-button">Yield</Button></Button.Group></Row>
				<Row type="flex" justify="start" align="middle" className="App-filterbar-checkbox-panel">
					<Col span={1}>
						<label>from:</label>
					</Col>
					<Col span={3} />
					<Col span={20}>
						<InputNumber className="App-filterbar-textInput"
						  formatter={value => `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
						  parser={value => value.replace(/\$\s?|(,*)/g, '')}						/>
					</Col>
				</Row>
				<Row type="flex" justify="start" align="middle" className="App-filterbar-checkbox-panel">
					<Col span={1}>
						<label>to:</label>
					</Col>
					<Col span={3} />
					<Col span={20}>
						<InputNumber className="App-filterbar-textInput"
						  formatter={value => `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
						  parser={value => value.replace(/\$\s?|(,*)/g, '')}						/>
					</Col>
				</Row>

				<hr className="App-filterbar-hr"/>

				<Row type="flex" justify="start"><Icon type="up" />&nbsp;<strong>Minimum Face</strong></Row>
				<Row type="flex" justify="start" align="middle" className="App-filterbar-checkbox-panel">
					<Col span={1}>
						<label>&lt;</label>
					</Col>
					<Col span={3} />
					<Col span={20}>
						<InputNumber className="App-filterbar-textInput"
						  formatter={value => `$ ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
						  parser={value => value.replace(/\$\s?|(,*)/g, '')}						/>
					</Col>
				</Row>

			</Col>
			<Col span={18}>
				<Table
					columns={columns}
					dataSource={dataSource}
					rowSelection={rowSelection}
					onChange={this.handleTableChange}
				/>
			</Col>
		</Row>
      </div>
    );
  }
}

export default App;