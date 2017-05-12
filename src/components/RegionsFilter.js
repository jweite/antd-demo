import React, { Component } from 'react';
import { Button, Icon, Row } from 'antd';
import '../App.css';

export class RegionsFilter extends Component {
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
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type={this.state.isCollapsed ? "down" : "up"} />&nbsp;<strong>Region</strong></Row>
		{!this.state.isCollapsed && <div>
			<Row><Button className="App-filterbar-region-button" type={this.props.filterState.has("Americas") ? "primary" : ""} onClick={(e) => {this.props.onFilterChanged(e, "Americas")}}>America</Button></Row>
			<Row><Button className="App-filterbar-region-button" type={this.props.filterState.has("EMEA") ? "primary" : ""} onClick={(e) => {this.props.onFilterChanged(e, "EMEA")}}>Europe</Button></Row>
			<Row><Button className="App-filterbar-region-button" type={this.props.filterState.has("Asia Pacific") ? "primary" : ""} onClick={(e) => {this.props.onFilterChanged(e, "Asia Pacific")}}>Asia</Button></Row>
		</div> }
	</div>
  }
}
