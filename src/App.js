import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { RecsFilter } from './components/RecsFilter';
import { RatingsFilter } from './components/RatingsFilter';
import { MaturityDurationFilter } from './components/MaturityDurationFilter';
import { PriceFilter } from './components/PriceFilter';
import { OASYieldFilter } from './components/OASYieldFilter';
import { MinFaceFilter } from './components/MinFaceFilter';
import { BondTable } from './components/BondTable';

import './App.css';

class App extends Component {

  constructor(props) {
	super(props);	
	this.state = {
		recsFilter : {
			outPerform: false,
			marketPerform: false,
			underPerform: false
		},
		ratingFilter : {
			mode: "acr",
			acr : {
				aaa: false,
				aa: false,
				a: false,
				bbb: false,
				bb: false,
				b: false,
				ccc: false,
				cc: false,
				c: false,
				d: false
			},
			csr : {
				
			}
		}
	};
  }	

  onRecsFilterChanged = (e) => {
	this.setState( prevState => {
		prevState.recsFilter[e.target.stateAttrName] = e.target.checked;
		return prevState;
    });
  }

  onRatingsFilterAcrMode = (e) => {
	this.setState( prevState => {
		prevState.ratingFilter.mode = "acr";
		return prevState;
    });
  }

  onRatingsFilterCsrMode = (e) => {
	this.setState( prevState => {
		prevState.ratingFilter.mode = "csr";
		return prevState;
    });
  }
  
  onRatingsFilterChanged = (e) => {
	this.setState( prevState => {
		prevState.ratingFilter.acr[e.target.stateAttrName] = e.target.checked;
		return prevState;
    });
  }

  
  render() {
    return (
      <div className="App">
		<Row>
			<Col span={6} className="App-panels">
				<RecsFilter filterState={this.state.recsFilter} onFilterChanged={this.onRecsFilterChanged} />
				<hr className="App-filterbar-hr"/>
				<RatingsFilter filterState={this.state.ratingFilter} onFilterChanged={this.onRatingsFilterChanged} onAcrMode={this.onRatingsFilterAcrMode} onCsrMode={this.onRatingsFilterCsrMode}/>
				<hr className="App-filterbar-hr"/>
				<MaturityDurationFilter />
				<hr className="App-filterbar-hr"/>
				<PriceFilter />
				<hr className="App-filterbar-hr"/>
				<OASYieldFilter />
				<hr className="App-filterbar-hr"/>
				<MinFaceFilter />
			</Col>
			<Col span={18}>
				<BondTable />
			</Col>
		</Row>
      </div>
    );
  }
}

export default App;
