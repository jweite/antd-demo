import React, { Component } from 'react';
import moment from 'moment';
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
		},
		maturityDurationFilter : {
			mode : "maturity",
			maturity : moment(),
			duration : "0"
		},
		priceFilter : {
			upper: 90,
			lower: 10
		},
		oasYieldFilter : {
			mode : "oas",
			oas : {
				lower : "",
				upper : ""
			},
			yield : {
				lower : "",
				upper : ""
			}
		},
		minFaceFilter : {
			value : ""
		}
	};
  }	

  onRecsFilterChanged = (e) => {
	this.setState( prevState => {
		prevState.recsFilter[e.target.stateAttrName] = e.target.checked;
		return prevState;
    });
  }

  onRatingsFilterModeChange = (e, mode) => {
    e.persist();
	this.setState( prevState => {
		prevState.ratingFilter.mode = mode;
		return prevState;
    });
  }

  onRatingsFilterChanged = (e) => {
	this.setState( prevState => {
		prevState.ratingFilter.acr[e.target.stateAttrName] = e.target.checked;
		return prevState;
    });
  }

  onMaturityDurationFilterModeChange = (e, mode) => {
    e.persist();
	this.setState( prevState => {
		prevState.maturityDurationFilter.mode = mode;
		return prevState;
    });
  }

  onMaturityDurationFilterChanged = (val) => {
	this.setState( prevState => {
		if (prevState.maturityDurationFilter.mode === "maturity") {
			prevState.maturityDurationFilter.maturity = val;
		}
		else {
			prevState.maturityDurationFilter.duration = val;
		}
		return prevState;
    });
  }
  
  onPriceFilterChanged = (vals) => {
	this.setState( prevState => {
		prevState.priceFilter = vals;
		return prevState;
    });
  }

  onOasYieldFilterModeChange = (e, mode) => {
    e.persist();
	this.setState( prevState => {
		prevState.oasYieldFilter.mode = mode;
		return prevState;
    });
  }

  onOasYieldLowerFilterChanged = (val) => {
	this.setState( prevState => {
		if (prevState.oasYieldFilter.mode === "oas") {
			prevState.oasYieldFilter.oas.lower = val;
		}
		else {
			prevState.oasYieldFilter.yield.lower = val;
		}
		return prevState;
    });
  }
  
  onOasYieldUpperFilterChanged = (val) => {
	this.setState( prevState => {
		if (prevState.oasYieldFilter.mode === "oas") {
			prevState.oasYieldFilter.oas.upper = val;
		}
		else {
			prevState.oasYieldFilter.yield.upper = val;
		}
		return prevState;
    });
  }

  onMinFaceFilterChanged = (val) => {
	this.setState( prevState => {
		prevState.minFaceFilter.value = val;
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
				<RatingsFilter filterState={this.state.ratingFilter} onFilterChanged={this.onRatingsFilterChanged} onFilterModeChange={this.onRatingsFilterModeChange} />
				<hr className="App-filterbar-hr"/>
				<MaturityDurationFilter filterState={this.state.maturityDurationFilter} onFilterChanged={this.onMaturityDurationFilterChanged} onFilterModeChange={this.onMaturityDurationFilterModeChange} />
				<hr className="App-filterbar-hr"/>
				<PriceFilter filterState={this.state.priceFilter} onFilterChanged={this.onPriceFilterChanged} />
				<hr className="App-filterbar-hr"/>
				<OASYieldFilter filterState={this.state.oasYieldFilter} onLowerFilterChanged={this.onOasYieldLowerFilterChanged} onUpperFilterChanged={this.onOasYieldUpperFilterChanged} onFilterModeChange={this.onOasYieldFilterModeChange} />
				<hr className="App-filterbar-hr"/>
				<MinFaceFilter filterState={this.state.minFaceFilter} onFilterChanged={this.onMinFaceFilterChanged} />
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
