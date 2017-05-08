import React, { Component } from 'react';
import { Button, Checkbox, Col, Icon, Row } from 'antd';
import '../App.css';

export class RatingsFilter extends Component {
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
		<Row type="flex" justify="start"><Icon onClick={this.collapserClick} type={this.state.isCollapsed ? "down" : "up"} />&nbsp;<strong>Rating</strong></Row>
			{!this.state.isCollapsed && <div>
			<Row>
				<Button.Group className="App-filterbar-button-group">
					<Button className="App-filterbar-button" type={this.props.filterState.mode === "acr" ? "primary" : ""} onClick={(e) => {this.props.onFilterModeChange(e, "acr")}}>ACR</Button>	
					<Button className="App-filterbar-button" type={this.props.filterState.mode === "csr" ? "primary" : ""} onClick={(e) => {this.props.onFilterModeChange(e, "csr")}}>CSR</Button>
				</Button.Group>
			</Row>
			
			{ this.props.filterState.mode === "acr" && <div>
				<Row>
					<Col span={3}/>
					<Col span={9}>
						<Row type="flex" justify="start"><Checkbox stateAttrName="aaa" onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.aaa}>AAA</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox stateAttrName="aa"  onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.aa} >AA</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox stateAttrName="a"   onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.a}  >A</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox stateAttrName="bbb" onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.bbb}>BBB</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox stateAttrName="bb"  onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.bb} >BB</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox stateAttrName="b"   onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.b}  >B</Checkbox></Row>
					</Col>
					<Col span={9}>
						<Row type="flex" justify="start"><Checkbox stateAttrName="ccc" onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.ccc}>CCC</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox stateAttrName="cc"  onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.cc} >CC</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox stateAttrName="c"   onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.c}  >C</Checkbox></Row>
						<Row type="flex" justify="start"><Checkbox stateAttrName="d"   onChange={this.props.onFilterChanged} checked={this.props.filterState.acr.d}  >D</Checkbox></Row>
					</Col>
				</Row> 
			</div> }

			{ this.props.filterState.mode === "csr" && <div>
			</div> }
			
			
		</div> }
	</div>
  }
}
