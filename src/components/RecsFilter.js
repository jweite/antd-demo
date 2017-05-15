import React, { Component } from 'react';
import { Button, Icon, Row } from 'antd';
import '../App.css';

export class RecsFilter extends Component {

  constructor(props) {
	super(props);	
	
	this.state = {
		isCollapsed: false
	};
  }
	
  collapserClick = (e) => {
	this.setState(prevState => ({
		isCollapsed: !prevState.isCollapsed
	}));
  }
  
  render() {
	return <div className="App-filter-panels">
		<Row type="flex" justify="start"><Icon type={this.state.isCollapsed ? "down" : "up"} onClick={this.collapserClick} />&nbsp;<strong>Recommendations</strong></Row>
		{!this.state.isCollapsed && <div>
			<Row><Button className="App-filterbar-recs-button" type={this.props.filterState.has("Outperform") ? "primary" : ""} disabled={true} onClick={(e) => {this.props.onFilterChanged(e, "Outperform")}}>Outperform</Button></Row>
			<Row><Button className="App-filterbar-recs-button" type={this.props.filterState.has("Market Perform") ? "primary" : ""} disabled={true} onClick={(e) => {this.props.onFilterChanged(e, "Market Perform")}}>Market Perform</Button></Row>
			<Row><Button className="App-filterbar-recs-button" type={this.props.filterState.has("Underperform") ? "primary" : ""} disabled={true} onClick={(e) => {this.props.onFilterChanged(e, "Underperform")}}>Underperform</Button></Row>
		</div> }
	</div>
  }
}
