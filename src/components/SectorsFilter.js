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
				<SectorFilter parentSector="Basic" childSectors={[{id: "chemicals", name: "Chemicals"}, {id: "coal", name: "Coal Producers"}, {id: "metalsMining", name: "Metals and Mining"}, {id: "oilGas", name: "Oil and Gas"}]} onFilterChanged={this.props.onFilterChanged} filterState={this.props.filterState}/>
				<SectorFilter parentSector="Consumer" childSectors={[]} />
				<SectorFilter parentSector="Energy" childSectors={[]} />
				<SectorFilter parentSector="Financial Services" childSectors={[]} />
				<SectorFilter parentSector="Manufacturing" childSectors={[]} />
				<SectorFilter parentSector="TMT" childSectors={[]} />
				<SectorFilter parentSector="Transportation" childSectors={[]} />
			</div>
		}
	</div>
  }
}
