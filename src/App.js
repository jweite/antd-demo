import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Set, Map } from 'immutable';
import { Col, Row } from 'antd';

import { RecsFilter } from './components/RecsFilter';
import { RatingsFilter } from './components/RatingsFilter';
import { MaturityDurationFilter } from './components/MaturityDurationFilter';
import { PriceFilter } from './components/PriceFilter';
import { OASYieldFilter } from './components/OASYieldFilter';
import { LiquidityFilter } from './components/LiquidityFilter';
import { MinFaceFilter } from './components/MinFaceFilter';
import { SectorsFilter } from './components/SectorsFilter';
import { BondTable } from './components/BondTable';

import './App.css';

class App extends Component {

  constructor(props) {
	super(props);	

	const protocol = "http";
	const server = window.location.hostname;
	const port = 3333;
	const timeout = 2000;
	const endpointURI = "";
	const bondDataServiceURL = protocol + "://" + server + ":" + port + '/' + endpointURI;	
	this.bondDataService = axios.create({
		baseURL: bondDataServiceURL,
		timeout: timeout,
		headers: {
			'Content-Type': 'application/json'
		}
	});	
	
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
		liquidityFilter : {
			upper: 90,
			lower: 10
		},
		minFaceFilter : {
			value : ""
		},
		regionsFilter : {
			americas : false,
			emea : false,
			asiaPacific : false
		},
		sectors: Set()
	};
	
	this.sectorMap = [
		{ 
			name: "Basic Industries",
			children: [
				{ name: "Chemicals", children: ["Chemicals"] },
				{ name: "Constr Aggregates", children: [""] },
				{ name: "Metals & Mining", children: [""] },
				{ name: "Paper & Packaging", children: ["Forestry/Paper", "Packaging"] }
			]
		}, {
			name: "Consumer",
			children: [
				{ name: "Cons Proc / Svc", children: [""] },
				{ name: "Food & Bev", children: [""] },
				{ name: "Gaming & Leisure", children: [""] },
				{ name: "Healthcare / Pharma", children: [""] },
				{ name: "Retail / Grocers", children: [""] }
			]
		}, {
			name: "Energy", 
			children: [
				{ name: "Oil & Gas", children: [""] },
				{ name: "Pipelines / MLPs", children: [""] },
				{ name: "Utilities", children: [""] }
			]
		}, {
			name: "Financial Services",
			children: [
				{ name: "Banks / Brokers", children: [""] },
				{ name: "Insurance", children: [""] },
				{ name: "Regional Banks", children: [""] },
				{ name: "REITs / CRE", children: [""] },
				{ name: "Specialty Finance", children: [""] }
			]
		}, {
			name: "Manufaturing",
			children: [
				{ name: "Aerospace / Defense", children: [""] },
				{ name: "Automotive", children: [""] },
				{ name: "Captial Goods", children: [""] },
				{ name: "Conglomerates", children: [""] },
				{ name: "Equip Fin & Lease", children: [""] },
				{ name: "Homebuilding", children: [""] }
			]
		}, {
			name: "TMT",
			children: [
				{ name: "Media", children: [""] },
				{ name: "Technology", children: [""] },
				{ name: "Telecom & Cable", children: [""] }
			]
		}, {
			name: "Transportation",
			children: [
				{ name: "Airlines", children: [""] },
				{ name: "Freight / Rail / Logis.", children: [""] }
			]
		}
	]
	
	// This simplifies lookup by second level sector.
	this.secondLevelSectorMap = Map();
	this.sectorMap.map(parentSector =>
		parentSector.children.map(childSector => {
			this.secondLevelSectorMap = this.secondLevelSectorMap.set(childSector.name, childSector.children)
		})
	)
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

  onLiquidityFilterChanged = (vals) => {
	this.setState( prevState => {
		prevState.liquidityFilter = vals;
		return prevState;
    });
  }

  onMinFaceFilterChanged = (val) => {
	this.setState( prevState => {
		prevState.minFaceFilter.value = val;
		return prevState;
    });
  }
  
  onSectorsFilterChanged = (e) => {
	this.setState( prevState => {
		if (e.target.checked) {
			prevState.sectors = prevState.sectors.add(e.target.stateAttrName);
		}
		else {
			prevState.sectors = prevState.sectors.delete(e.target.stateAttrName);
		}
		console.log("sectors set:");
		console.log(prevState.sectors);
		return prevState;
    });
  }
  
  getFilters()
  {
	var filter = {};
	if (this.state.sectors.size > 0) {
		let dbSectors = Set();
		this.state.sectors.map(selectedSector => {
			let childSectorList = this.secondLevelSectorMap.get(selectedSector);
			console.log("getFilters: " + selectedSector);
			console.log(childSectorList);
			dbSectors = dbSectors.union(childSectorList);
		})
		console.log("getFilters");
		console.log(dbSectors);
		filter.Sector = {};
		filter.Sector["$in"] = dbSectors.toArray();
	}
	console.log("filter: " + JSON.stringify(filter));
	return filter;
  }

  render() {
	console.log(this.sectorMap);
    return (
      <div className="App">
		<Row>
			<Col span={4} className="App-panels">
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
				<LiquidityFilter filterState={this.state.liquidityFilter} onFilterChanged={this.onLiquidityFilterChanged} />
				<hr className="App-filterbar-hr"/>
				<MinFaceFilter filterState={this.state.minFaceFilter} onFilterChanged={this.onMinFaceFilterChanged} />
				<hr className="App-filterbar-hr"/>
				<SectorsFilter sectorMap={this.sectorMap} filterState={this.state.sectors} onFilterChanged={this.onSectorsFilterChanged}/>
			</Col>
			<Col span={20}>
				<BondTable bondDataService={this.bondDataService} filters={this.getFilters()}/>
			</Col>
		</Row>
      </div>
    );
  }
}

export default App;
