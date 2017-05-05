import React, { Component } from 'react';
import { Button, DatePicker, Icon, Row } from 'antd';
import '../App.css';

export class MaturityDurationFilter extends Component {

  collapserClick = (parameter) => {
	  console.log("Collapser clicked: ");
	  console.log(parameter);
  }
	
  maturityButtonClick = (parameter) => {
	  console.log("maturity clicked: ");
	  console.log(parameter);
  }

  durationButtonClick = (parameter) => {
	  console.log("duration clicked: ");
	  console.log(parameter);
  }
  
  render() {
	return <div>
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type="up" />&nbsp;<strong>Time</strong></Row>
		<Row>
			<Button.Group className="App-filterbar-button-group">
				<Button type="primary" className="App-filterbar-button" onClick={this.maturityButtonClick}>Maturity</Button>
				<Button className="App-filterbar-button" onClick={this.durationButtonClick}>Duration</Button>
			</Button.Group>
		</Row>
		<DatePicker/>
	</div>
  }
}
