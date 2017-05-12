import React, { Component } from 'react';
import { Icon, Row } from 'antd';
import { SectorFilter } from './SectorFilter';

import '../App.css';

export class SectorsFilter extends Component {

  constructor(props) {
	super(props);	
	
	this.state = {
		isCollapsed: false,
	};
  }
	
  collapserClick = (e) => {
	this.setState(prevState => ({
		isCollapsed: !prevState.isCollapsed
	}));
  }

  render() {
	return <div>
		<Row type="flex" justify="start"><Icon type={this.state.isCollapsed ? "down" : "up"} onClick={this.collapserClick} />&nbsp;<strong>Sectors</strong></Row>
		{!this.state.isCollapsed && 
			<div>
				{this.props.sectorMap.map((parentSector) => 
					<SectorFilter key={parentSector.name} parentSector={parentSector} onFilterChanged={this.props.onFilterChanged} filterState={this.props.filterState}/>
				)}
			</div>
		}
	</div>
  }
}
