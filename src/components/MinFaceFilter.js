import React, { Component } from 'react';
import { Col, Icon, Row } from 'antd';
import { NumericInput } from './NumericInput';
import '../App.css';

export class MinFaceFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isCollapsed: false,
		};
	}

  collapserClick = (e) => {
	this.setState(prevState => ({
		isCollapsed: !prevState.isCollapsed,
	}));
  }

  render() {
	return <div>
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type={this.state.isCollapsed ? "down" : "up"} />&nbsp;<strong>Minimum Face</strong></Row>
		<Row type="flex" justify="start" align="middle" className="App-filterbar-checkbox-panel">
			<Col span={1}>
				<label>&lt;</label>
			</Col>
			<Col span={3} />
			<Col span={20}>
				<NumericInput value={this.props.filterState.value} onBlur={this.props.onFilterChanged} className="App-filterbar-textInput" />
			</Col>
		</Row>
	</div>
  }
}
