import React, { Component } from 'react';
import { Col, Icon, InputNumber, Row } from 'antd';
import '../App.css';

export class MinFaceFilter extends Component {
	
  collapserClick = (parameter) => {
	  console.log("Collapser clicked: ");
	  console.log(parameter);
  }
	
  render() {
	return <div>
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type="up" />&nbsp;<strong>Minimum Face</strong></Row>
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
	</div>
  }
}
