import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

export class Chart extends Component {

  constructor(props) {
	super(props);
	
	this.config = {
	  xAxis: {
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	  },
	  series: [{
		data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
	  }]
	};	
  }

  render() {
	return <div>
		<ReactHighcharts config={this.config} />
	</div>
  }  
}