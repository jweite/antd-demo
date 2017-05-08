import React, { Component } from 'react';
import { Button, DatePicker, Icon, Row } from 'antd';
import '../App.css';

export class MaturityDurationFilter extends Component {
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
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type={this.state.isCollapsed ? "down" : "up"} />&nbsp;<strong>Time</strong></Row>
		{!this.state.isCollapsed && <div>
			<Row>
				<Button.Group className="App-filterbar-button-group">
					<Button className="App-filterbar-button" type={this.props.filterState.mode === "maturity" ? "primary" : ""} onClick={(e) => {this.props.onFilterModeChange(e, "maturity")}}>Maturity</Button>	
					<Button className="App-filterbar-button" type={this.props.filterState.mode === "duration" ? "primary" : ""} onClick={(e) => {this.props.onFilterModeChange(e, "duration")}}>Duration</Button>
				</Button.Group>
			</Row>
			{ this.props.filterState.mode === "maturity" && <DatePicker value={this.props.filterState.maturity} onChange={(date, dateString) => {this.props.onFilterChanged(date)}}/> }
		</div> }
	</div>
  }
}
