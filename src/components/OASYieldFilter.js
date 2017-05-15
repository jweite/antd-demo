import React, { Component } from 'react';
import {Button, Icon, Row, Slider } from 'antd';
import '../App.css';

export class OASYieldFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isCollapsed: false,
		};
		this.vals = [this.props.filterState.oas.lower, this.props.filterState.oas.upper];
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
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type={this.state.isCollapsed ? "down" : "up"}  />&nbsp;<strong>OAS/Yield</strong></Row>
		{!this.state.isCollapsed && <div>
			<Row>
				<Button.Group className="App-filterbar-button-group">
					<Button className="App-filterbar-button" type={this.props.filterState.mode === "oas" ? "primary" : ""} onClick={(e) => {this.props.onFilterModeChange(e, "oas")}}>OAS</Button>	
					<Button className="App-filterbar-button" type={this.props.filterState.mode === "yield" ? "primary" : ""} onClick={(e) => {this.props.onFilterModeChange(e, "yield")}}>Yield</Button>
				</Button.Group>
			</Row>
			{ this.props.filterState.mode === "oas" && <div>
				<Slider min={0} max={1001} range={true} defaultValue={this.vals} onChange={this.onChange} onAfterChange={this.props.onFilterChanged}/>
			</div> }
		</div> }
	</div>
  }
}
