import React, { Component } from 'react';
import { Button, Checkbox, Row } from 'antd';
import '../App.css';

export class SectorFilter extends Component {

  constructor(props) {
	super(props);	
	
	this.state = {
		isCollapsed: true,
	};
  }
  
  collapserClick = (e) => {
	this.setState(prevState => ({
		isCollapsed: !prevState.isCollapsed
	}));
  }
	
  render() {
	return <div>
		<Row type="flex" justify="center">
			{this.state.isCollapsed ? 
				<Button className="App-filterbar-sector-button" onClick={this.collapserClick}>{this.props.parentSector}</Button> 
			: 
				<div className="App-filterbar-sector-checkbox-div">
					<strong><p onClick={this.collapserClick} >{this.props.parentSector}</p></strong>
					{this.props.childSectors.map(childSector => 
						<Row key={childSector.id} type="flex" justify="start" className="App-filterbar-checkbox-panel">
							<Checkbox stateAttrName={childSector.id} onChange={this.props.onFilterChanged} checked={this.props.filterState[childSector.id]}>{childSector.name}</Checkbox>
						</Row>
					)}
				</div>
			}
		</Row> 
	</div>
  }	
}