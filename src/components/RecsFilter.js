import React, { Component } from 'react';
import { Checkbox, Icon, Row } from 'antd';
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
	return <div>
		<Row type="flex" justify="start"><Icon type={this.state.isCollapsed ? "down" : "up"} onClick={this.collapserClick} />&nbsp;<strong>Recommendations</strong></Row>
		{!this.state.isCollapsed && <Row type="flex" justify="start" className="App-filterbar-checkbox-panel"><Checkbox stateAttrName="outPerform" onChange={this.props.onFilterChanged}    checked={this.props.filterState.outPerform}   >Outperform</Checkbox></Row> }
		{!this.state.isCollapsed && <Row type="flex" justify="start" className="App-filterbar-checkbox-panel"><Checkbox stateAttrName="marketPerform" onChange={this.props.onFilterChanged} checked={this.props.filterState.marketPerform}>Market Perform</Checkbox></Row> }
		{!this.state.isCollapsed && <Row type="flex" justify="start" className="App-filterbar-checkbox-panel"><Checkbox stateAttrName="underPerform" onChange={this.props.onFilterChanged}  checked={this.props.filterState.underPerform} >Underperform</Checkbox></Row> }
	</div>
  }
}
