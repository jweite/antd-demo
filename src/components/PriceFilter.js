import React, { Component } from 'react';
import { Icon, Row, Slider } from 'antd';
import '../App.css';

export class PriceFilter extends Component {
	
  collapserClick = (parameter) => {
	  console.log("Collapser clicked: ");
	  console.log(parameter);
  }
	
  render() {
	return <div>
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type="up" />&nbsp;<strong>Px</strong></Row>
		<Slider min={0} max={100} range={true} value={[18,66]}/>
	</div>
  }
}
