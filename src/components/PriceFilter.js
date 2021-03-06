import React, { Component } from 'react';
import { Icon, Row, Slider } from 'antd';
import '../App.css';

export class PriceFilter extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isCollapsed: false,
		};
		this.vals = [this.props.filterState.lower, this.props.filterState.upper];
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
			<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type={this.state.isCollapsed ? "down" : "up"} />&nbsp;<strong>Px</strong></Row>
			{!this.state.isCollapsed && <Slider min={0} max={200} range={true} defaultValue={this.vals} onChange={this.onChange} onAfterChange={this.props.onFilterChanged}/> }
		</div>
	}
}
