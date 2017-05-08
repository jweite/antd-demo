import React, { Component } from 'react';
import { Button, Col, Icon, Row } from 'antd';
import { NumericInput } from './NumericInput';
import '../App.css';

export class OASYieldFilter extends Component {
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
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type={this.state.isCollapsed ? "down" : "up"}  />&nbsp;<strong>OAS/Yield</strong></Row>
		{!this.state.isCollapsed && <div>
			<Row>
				<Button.Group className="App-filterbar-button-group">
					<Button className="App-filterbar-button" type={this.props.filterState.mode === "oas" ? "primary" : ""} onClick={(e) => {this.props.onFilterModeChange(e, "oas")}}>OAS</Button>	
					<Button className="App-filterbar-button" type={this.props.filterState.mode === "yield" ? "primary" : ""} onClick={(e) => {this.props.onFilterModeChange(e, "yield")}}>Yield</Button>
				</Button.Group>
			</Row>
			{ this.props.filterState.mode === "oas" && <div>
				<Row type="flex" justify="start" align="middle" className="App-filterbar-checkbox-panel">
					<Col span={1}>
						<label>from:</label>
					</Col>
					<Col span={3} />
					<Col span={20}>
						<NumericInput value={this.props.filterState.oas.lower} onBlur={this.props.onLowerFilterChanged} className="App-filterbar-textInput" />
					</Col>
				</Row>
				<Row type="flex" justify="start" align="middle" className="App-filterbar-checkbox-panel">
					<Col span={1}>
						<label>to:</label>
					</Col>
					<Col span={3} />
					<Col span={20}>
						<NumericInput value={this.props.filterState.oas.upper} onBlur={this.props.onUpperFilterChanged} className="App-filterbar-textInput" />
					</Col>
				</Row>
			</div> }
		</div> }
	</div>
  }
}
