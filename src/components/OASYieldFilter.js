import React, { Component } from 'react';
import { Button, Col, Icon, InputNumber, Row } from 'antd';
import '../App.css';

export class OASYieldFilter extends Component {

  collapserClick = (parameter) => {
	  console.log("Collapser clicked: ");
	  console.log(parameter);
  }
	
  oasButtonClick = (parameter) => {
	  console.log("oas clicked: ");
	  console.log(parameter);
  }

  yieldButtonClick = (parameter) => {
	  console.log("yield clicked: ");
	  console.log(parameter);
  }
  
  render() {
	return <div>
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type="up" />&nbsp;<strong>OAS/Yield</strong></Row>
		<Row>
			<Button.Group className="App-filterbar-button-group">
				<Button type="primary" className="App-filterbar-button" onClick={this.oasButtonClick}>OAS</Button>
				<Button className="App-filterbar-button" onClick={this.yieldButtonClick}>Yield</Button>
			</Button.Group>
		</Row>
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
	</div>
  }
}
