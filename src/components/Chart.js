import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import moment from 'moment';

export class Chart extends Component {

  constructor(props) {
	super(props);
	
	this.bondDataService = props.bondDataService;
		
	this.state = {
//		waitingForContent: true,
		chartConfig: {}
	}		
  }
  
	componentWillMount() 
	{
		this.refreshFromServer(this.props, this.state);
	}
	
	
	componentWillUpdate(nextProps, nextState) 
	{
		if (nextProps.cusips !== this.props.cusips) {
			this.refreshFromServer(nextProps, nextState);
		}
	}
	
	refreshFromServer(props, state)
	{
		if (props.cusips.length > 0) {
			var startDate = moment().subtract(1, 'years');
			if (typeof(props.startDate) !== "undefined") {
				startDate = moment(props.startDate, "YYYY-MM-DD");
			}
			
			var endDate = moment();
			if (typeof(props.endDate) !== "undefined") {
				endDate = moment(props.endDate, "YYYY-MM-DD");
			}
			
			var query = '{"Cusip":"' + props.cusips[0] + '","Run_Date":{"$gte":"' + startDate.format("YYYY-MM-DD") + '","$lt":"' + endDate.format("YYYY-MM-DD") + '"}}';
			
			var sortClause = '&sortField=Run_Date';
			var limitClause = '&limit=2000';
			var fieldClause = (typeof(props.field) !== "undefined") ? "&fields=Run_Date," + props.field : "";
			
			this.bondDataService.get('/bondMetrics?query='+ query + sortClause + limitClause + fieldClause)
				.then((response) => {
					this.contentReceived(response.data);
				})
				.catch(function (error) {
					console.log(error);
				})
			;
		}
	}

	contentReceived(bondMetrics) {
		var seriesData = bondMetrics.map(bondMetric => [moment(bondMetric.Run_Date, "YYYY-MM-DDTHH:mm:ssZ").valueOf(), bondMetric[this.props.field]]);
		this.setState({
//			waitingForContent: false,
			chartConfig: {
				title: {
					text: this.props.field
				},
				xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
						year: '%Y',
						month: '%b %Y',
						week: '%Y-%m-%d',
						day: '%Y-%m-%d'
					}
				},
				series: [{
					name: this.props.cusips[0],
					data: seriesData
				}]
			}
		});
	}

	  render() {
	return <div>
		<ReactHighcharts config={this.state.chartConfig}/>
	</div>
  }  
}