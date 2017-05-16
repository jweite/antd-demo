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
import { FaceValueFilter } from './components/FaceValueFilter';
import { SectorsFilter } from './components/SectorsFilter';
import { RegionsFilter } from './components/RegionsFilter';
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
		recsFilter : Set(),
		
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
			maturity : {
				lower : moment().year()-1,
				upper : moment().year()+31
			},
			duration : "0"
		},
		priceFilter : {
			upper: 200,
			lower: 0
		},
		oasYieldFilter : {
			mode : "oas",
			oas : {
				lower : 0,
				upper : 1001
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
		faceValueFilter : {
			upper: 5001,
			lower: 200
		},
		sectorsFilter: Set(),
		regionsFilter: Set()
	};
	
	this.sectorMap = [
		{ 
			name: "Basic Industries",
			children: [
				{ name: "Chemicals", children: ["Chemicals"] },
				{ name: "Constr Aggregates", children: ["XXXXXXX"] },
				{ name: "Metals & Mining", children: ["Metals/Mining Excluding Steel","Steel Producers/Products"] },
				{ name: "Paper & Packaging", children: ["Forestry/Paper", "Packaging"] }
			]
		}, {
			name: "Consumer",
			children: [
				{ name: "Cons Prod / Svc", children: ["Consumer-Products","Personal & Household Products","Household & Leisure Products"] },
				{ name: "Food & Bev", children: ["Beverage", "Food - Wholesale"] },
				{ name: "Gaming & Leisure", children: ["Gaming","Hotels","Leisure","Recreation & Travel","Restaurants","Tobacco"] },
				{ name: "Healthcare / Pharma", children: ["Health Facilities", "Health Services", "Pharmaceuticals","Managed Care","Medical Products"] },
				{ name: "Retail / Grocers", children: ["Department Stores","Discount Stores","Food & Drug Retailers","Specialty Retail"] }
			]
		}, {
			name: "Energy", 
			children: [
				{ name: "Oil & Gas", children: ["Energy - Exploration & Production","Gas Distribution","Integrated Energy","Oil Field Equipment & Services","Oil Refining & Marketing"] },
				{ name: "Pipelines / MLPs", children: ["XXXXXXX"] },
				{ name: "Utilities", children: ["Electric-Dist/Trans","Electric-Generation","Electric-Integrated","Non-Electric Utilities"] }
			]
		}, {
			name: "Financial Services",
			children: [
				{ name: "Banks / Brokers", children: ["Banking","Brokerage"] },
				{ name: "Insurance", children: ["Insurance Brokerage","Life Insurance","Monoline Insurance","Multi-Line Insurance","Reinsurance"] },
				{ name: "Regional Banks", children: ["XXXXXX"] },
				{ name: "REITs / CRE", children: ["REITs","Real Estate Dev & Mgt"] },
				{ name: "Specialty Finance", children: ["Investment & Misc Financial Services"] }
			]
		}, {
			name: "Manufaturing",
			children: [
				{ name: "Aerospace / Defense", children: ["Aerospace/Defense"] },
				{ name: "Automotive", children: ["Auto Parts & Equipment", "Automakers"] },
				{ name: "Captial Goods", children: ["Diversified Capital Goods","Machinery","Office Equipment"] },
				{ name: "Conglomerates", children: ["XXXX"] },
				{ name: "Equip Fin & Lease", children: ["Cons/Comm/Lease Financing"] },
				{ name: "Homebuilding", children: ["Building & Construction","Building Materials"] }
			]
		}, {
			name: "TMT",
			children: [
				{ name: "Media", children: ["Media - Broadcast","Media - Diversified","Media - Services","Media Content","Printing & Publishing"] },
				{ name: "Technology", children: ["Computer Hardware","Electronics","Software/Services","Tech Hardware & Equipment"] },
				{ name: "Telecom & Cable", children: ["Cable & Satellite TV","Media-Cable","Telecom - Integrated/Services","Telecom - Satellite","Telecom - Wireless","Telecom - Wireline Integrated & Services","Telecommunications Equipment"] }
			]
		}, {
			name: "Transportation",
			children: [
				{ name: "Airlines", children: ["Airlines","Air Transportation"] },
				{ name: "Freight / Rail / Logis.", children: ["Rail","Railroads","Transport Infrastructure/Services","Trucking & Delivery"] }
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

  onRecsFilterChanged = (e, rec) => {
	this.setState( prevState => {
		if (prevState.recsFilter.has(rec)) {
			prevState.recsFilter = prevState.recsFilter.delete(rec);
		}
		else {
			prevState.recsFilter = prevState.recsFilter.add(rec);
		}
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
			prevState.maturityDurationFilter.maturity.lower = val[0];
			prevState.maturityDurationFilter.maturity.upper = val[1];
		}
		else {
			prevState.maturityDurationFilter.duration = val;
		}
		return prevState;
    });
  }

  onOasYieldFilterChanged = (val) => {
	this.setState( prevState => {
		if (prevState.oasYieldFilter.mode === "oas") {
			prevState.oasYieldFilter.oas.lower = val[0];
			prevState.oasYieldFilter.oas.upper = val[1];
		}
		else {
			prevState.oasYieldFilter.yield.lower = val[0];
			prevState.oasYieldFilter.yield.upper = val[1];
		}
		return prevState;
    });
  }
  
  
  onPriceFilterChanged = (vals) => {
	this.setState( prevState => {
		prevState.priceFilter.lower = vals[0];
		prevState.priceFilter.upper = vals[1];
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


  onLiquidityFilterChanged = (vals) => {
	this.setState( prevState => {
		prevState.liquidityFilter = vals;
		return prevState;
    });
  }

  onFaceValueFilterChanged = (vals) => {
	this.setState( prevState => {
		prevState.faceValueFilter.lower = vals[0];
		prevState.faceValueFilter.upper = vals[1];
		return prevState;
    });
  }
  
  onSectorsFilterChanged = (e) => {
	this.setState( prevState => {
		if (e.target.checked) {
			prevState.sectorsFilter = prevState.sectorsFilter.add(e.target.stateAttrName);
		}
		else {
			prevState.sectorsFilter = prevState.sectorsFilter.delete(e.target.stateAttrName);
		}
		return prevState;
    });
  }

  onRegionsFilterChanged = (e, region) => {
	this.setState( prevState => {
		if (prevState.regionsFilter.has(region)) {
			prevState.regionsFilter = prevState.regionsFilter.delete(region);
		}
		else {
			prevState.regionsFilter = prevState.regionsFilter.add(region);
		}
		return prevState;
	});
  }	
  
  getFilters()
  {
	var filter = {};
	
	console.log("getFilters");
	console.log(this.state);
	console.log(this.state.priceFilter);
	
	filter.LatestPrice = {"$gte" : this.state.priceFilter.lower, "$lt" : this.state.priceFilter.upper};

	if (this.state.maturityDurationFilter.mode === "maturity") {
		filter.Maturity = {"$gte" : moment({year: this.state.maturityDurationFilter.maturity.lower, month: 0, day: 1}), "$lte" : moment({year: this.state.maturityDurationFilter.maturity.upper, month: 11, day: 31})};
	}

	if (this.state.faceValueFilter.upper !== 5001) {
		filter.FaceValue = {"$gte":this.state.faceValueFilter.lower, "$lte":this.state.faceValueFilter.upper};
	}
	else {
		// 5001 = unbounded. 
		filter.FaceValue = {"$gte":this.state.faceValueFilter.lower};
	}
	
	if (this.state.oasYieldFilter.mode === "oas") {
		if (this.state.oasYieldFilter.oas.upper !== 1001) {
			filter.LatestOAS = {"$gte":this.state.oasYieldFilter.oas.lower, "$lte":this.state.oasYieldFilter.oas.upper};
		}
		else {
			// 1001 = unbounded. 
			filter.LatestOAS = {"$gte":this.state.oasYieldFilter.oas.lower};
		}
	}
	else {
		filter.LatestYield = {"$gte":this.state.oasYieldFilter.yield.lower, "$lte":this.state.oasYieldFilter.yield.upper};
	}
	
	if (this.state.sectorsFilter.size > 0) {
		let dbSectors = Set();
		this.state.sectorsFilter.map(selectedSector => {
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
	if (this.state.regionsFilter.size > 0) {
		filter.Region = {};
		filter.Region["$in"] = this.state.regionsFilter.toArray();
	}
	console.log("filter: " + JSON.stringify(filter));
	return filter;
  }

  render() {
	console.log(this.sectorMap);
    return (
      <div className="App">
		<Row>
			<Col span={5} className="App-panels">
				<div className="App-filterbar-header"><h3>Filters</h3></div>
				<div>&nbsp;</div>
				<RecsFilter filterState={this.state.recsFilter} onFilterChanged={this.onRecsFilterChanged} />
				<hr className="App-filterbar-hr"/>
				<RatingsFilter filterState={this.state.ratingFilter} onFilterChanged={this.onRatingsFilterChanged} onFilterModeChange={this.onRatingsFilterModeChange} />
				<hr className="App-filterbar-hr"/>
				<MaturityDurationFilter filterState={this.state.maturityDurationFilter} onFilterChanged={this.onMaturityDurationFilterChanged} onFilterModeChange={this.onMaturityDurationFilterModeChange} />
				<hr className="App-filterbar-hr"/>
				<PriceFilter filterState={this.state.priceFilter} onFilterChanged={this.onPriceFilterChanged} />
				<hr className="App-filterbar-hr"/>
				<OASYieldFilter filterState={this.state.oasYieldFilter} onFilterChanged={this.onOasYieldFilterChanged} onFilterModeChange={this.onOasYieldFilterModeChange} />
				<hr className="App-filterbar-hr"/>
				<LiquidityFilter filterState={this.state.liquidityFilter} onFilterChanged={this.onLiquidityFilterChanged} />
				<hr className="App-filterbar-hr"/>
				<FaceValueFilter filterState={this.state.faceValueFilter} onFilterChanged={this.onFaceValueFilterChanged} />
				<hr className="App-filterbar-hr"/>
				<SectorsFilter sectorMap={this.sectorMap} filterState={this.state.sectorsFilter} onFilterChanged={this.onSectorsFilterChanged}/>
				<hr className="App-filterbar-hr"/>
				<RegionsFilter filterState={this.state.regionsFilter} onFilterChanged={this.onRegionsFilterChanged}/>
			</Col>
			<Col span={19}>
				<div>&nbsp;</div>
				<BondTable bondDataService={this.bondDataService} filters={this.getFilters()}/>
			</Col>
		</Row>
      </div>
    );
  }
}

export default App;
