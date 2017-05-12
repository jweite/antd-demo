import React, { Component } from 'react';
import { Button, Slider, Icon, Row } from 'antd';
import moment from 'moment';

import '../App.css';

export class MaturityDurationFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isCollapsed: false,
		};
		this.vals = [this.props.filterState.maturity.lower, this.props.filterState.maturity.upper];
	}

  collapserClick = (e) => {
	this.setState(prevState => ({
		isCollapsed: !prevState.isCollapsed,
	}));
  }

  onChange = (vals) => {
	this.vals = vals;
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
			{ this.props.filterState.mode === "maturity" && <Slider min={moment().year()} max={moment().year()+30} range={true} defaultValue={this.vals} onChange={this.onChange} onAfterChange={this.props.onFilterChanged}/> }
		</div> }
	</div>
  }
}
