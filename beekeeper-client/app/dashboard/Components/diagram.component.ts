import {Component, OnInit, AfterViewInit, OnChanges, Input} from 'angular2/core';
import {DashBoardService}	from '../services/dashboard.service';

@Component({
	selector: 'diagram',
	template: `
		<div class="chart"></div>
	`,
	providers: [DashBoardService]
})
export class Diagram implements OnInit, AfterViewInit, OnChanges {
	public dashboardService: DashBoardService;
	@Input() public diagramdata: any;
	@Input() name: string;
	public chartName: string;
	logdata: string[];

	constructor(dS: DashBoardService) {
		this.dashboardService = dS;
		this.diagramdata = {};
		this.logdata = [];
	}
	
	public log(obj: any) {
		console.log(obj);
	}
	
	public ngOnInit() {
		//this.chartName = this.diagramdata.name + 'Chart';
		//console.log(this.chartName);
	}
	
	public ngAfterViewInit() {
		//this.loadChart();
		//this.chartName = this.name + "Chart";
		//this.loadChart();
	}
	
	public ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
		//if (changes['diagramdata']) {
			//console.log(changes);
		for (let propName in changes) {
			let prop = changes[propName];
			//this.loadChart();
			this.logdata.push(prop.currentValue);
			console.log("neuer tabname: " + prop.currentValue);
			this.chartName = this.name + "Chart";
			if (document.getElementById("#chart") != null)
				document.getElementById("#chart").innerHTML = "";
			this.loadChart();
			//this.logdata.push(JSON.stringify(prop.currentValue));
		}
		//}
	}
	
	public loadChart(): void {
		switch(this.name) {
			case "HoneyPie":
				this.loadHoneyPieChart();
				break;
			case "HoneyBar":
				this.loadHoneyBarChart();
				break;
			case "Acarian":
				this.loadAcarianChart();
				break;
		}
	}
	
	public loadHoneyPieChart(): void {
//var data = this.diagramdata.data;
		/*var data = ["1","2","3"];
		d3.select(".chart")
			.selectAll("div")
			.data(data)
			.enter()
				.append("div")
					.style("width", function (d) {return d * 10 + "px"; })
					.text(d => d);
		*/
		// var x = d3.scale.ordinal;
				// id={{diagramdata.name}}
		//{{show(diagramdata)}}
		/*var svg = d3.select('#testen')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) + 
            ',' + (height / 2) + ')');*/
		//var g = chart.select("g");
		//g.append("text").text(d => d.beePeople);
		//console.log(g);
		/*	.append("text")
			.attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
			.attr("dy", ".35em").text(d => d.data.beePeople);*/
		/*var g = chart.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");
		g.append("path").attr("d", arc).style("fill", d => color(d.beePeople));
		g.append("text")
			.attr("transform", d => "translate(" + labelArc.centroid(d) + ")" )
			.attr("dy", ".35em").text(d => d.beePeople);*/
		//console.log(data);
		//console.log(chart);
		var data = [
			{honeyHarvest: 10, beePeople: "1"},
			{honeyHarvest: 20, beePeople: "2"},
			{honeyHarvest: 30, beePeople: "3"},
			{honeyHarvest: 40, beePeople: "4"}
		];
		var width = 360, height = 360, radius = Math.min(width, height) / 2;
		var color = d3.scale.category20b();
		var arc = d3.svg.arc().outerRadius(radius - 10).innerRadius(0);
		var labelArc = d3.svg.arc().outerRadius(radius - 40).innerRadius(radius - 40);
		var pie = d3.layout.pie().value(function (d) {
			return d.honeyHarvest;
		}).sort(null);
		
		d3.select("svg").remove();
		var chart = d3.select(".chart")
						.append("svg")
						.attr("width", width)
						.attr("height", height)
						.append("g")
						.attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
		
		var path = chart.selectAll("path")
			.data(pie(data))
			.enter()
			.append("path")
			.attr("d", arc)
			.attr("fill", (d,i) => color(d.data.beePeople));
		
		var text = chart.selectAll("text")
			.data(pie(data))
			.enter()
			.append("text")
			.attr("transform", d => "translate(" + labelArc.centroid(d) + ")")
			.attr("dy", ".35em").text(d => d.data.beePeople);
	}
	
	public loadHoneyBarChart(): void {
		var data = this.diagramdata.data;
		var width = 600, height = 500;
		var margin = {top: 40, right: 40, bottom: 40, left:40};
		d3.select("svg").remove();
		var chart = d3.select(".chart")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
		
		var y = d3.scale.linear()
		.domain([0, d3.max(data, d => d.val)])
		.range([height - margin.top - margin.bottom, 0]);
		
		var x = d3.time.scale()
		.domain([data[0].date, d3.time.day.offset(data[data.length-1].date,1)])
		.rangeRound([0, width - margin.left - margin.right]);
		
		var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickPadding(8);
		
		var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
		
		chart.append("g")
			.attr("class", "y axis")
			.call(yAxis);
		
		chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
			.call(xAxis);
		
		chart.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.date); })
			.attr("y", function(d) { return y(d.val); })
			.attr("height", function(d) { return height - y(d.val) - margin.top - margin.bottom; })
			.attr("width", 20);
	}
	
	public loadAcarianChart(): void {
		var data = this.diagramdata.data;
		
		var width = 600, height = 500;
		var margin = {top: 40, right: 40, bottom: 40, left:40};
		
		d3.select("svg").remove();
		var chart = d3.select(".chart")
						.append("svg")
						.attr("width", width)
						.attr("height", height)
						.append("g")
						.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
		
		// Somehow sort array to have low to high values
		// Somehow sort array to have low to high dates
						
		console.log(data);		
	
		var y = d3.scale.linear()
		.domain([0, d3.max(data, d => d.val)])
		.range([height - margin.top - margin.bottom, 0]);
		
		var x = d3.time.scale()
		.domain([data[0].date, d3.time.day.offset(data[data.length-1].date,1)])
		.rangeRound([0, width - margin.left - margin.right]);
		
		var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.tickPadding(8);
		
		var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		
		chart.append("g")
			.attr("class", "y axis")
			.call(yAxis);
		
		chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
			.call(xAxis);
		
		var lineGen = d3.svg.line()
						.x(d => x(d.date))
						.y(d => y(d.val));
		
		chart.selectAll(".bar")
		.data(data)
		.enter()
		.append('path')
		.attr("d", lineGen(data))
		.attr("stroke", "black")
		.attr("stroke-width", 2)
		.attr("fill", "none");
		
				//.ticks(d3.time.years, 1);
		/*.ticks(d3.time.days, 1)
		.tickFormat(d3.time.format('%a %d'))
    	.tickSize(0)
    	.tickPadding(8);*/
		
				//.range([padding,width]);
		//.range([padding, width - padding * 2]);
		//.attr("transform", "translate(" + padding + ",0)")
				/*chart.selectAll(".xaxis text")
			.attr("transform", function(d) {
				return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
			});*/
		
		/*
		chart.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.date); })
			.attr("y", function(d) { return y(d.val); })
			.attr("width", 10)
			.attr("height", function(d) { return height - margin.top - margin.bottom -  y(d.val); });
		*/
		
		
		/*this.y = d3.scale.linear().range([this.height,0]);
		
		this.charts.push(d3.select("#" + id)
						.attr("width", this.width)
						.attr("height", this.height));
						
		let index: number = this.charts.length-1;
		
		this.y.domain([0, d3.max(this.data, d => d.value)]);
		
		this.barWidth = this.width / this.data.length;

	 	this.bar = this.charts[index].selectAll("g")
							 .data(this.data)
							 .enter()
							 .append("g")
							 .attr("transform", (d, i) =>  "translate(" + i * this.barWidth + ",0)");

		this.bar.append("rect")
				.attr("y", d => this.y(d.value))
				.attr("height", d => this.height - this.y(d.value))
				.attr("width", this.barWidth - 1);

		this.bar.append("text")
			.attr("x", this.barWidth / 2 )
			.attr("y", d => this.y(d.value) + 3)
			.attr("dy", ".75em")
			.text(d => d.date.toDateString());*/
		
		//console.log(this.diagramdata);
		//console.log(data);
		//var data = [{xValue: "hallo", yValue: 5}, {xValue:"b",yValue:10}];
		
				/*var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);*/
			
		/*var data = this.diagramdata.data;
			
		var margin = {top: 20, right: 30, bottom: 30, left: 40},
			width = 500 - margin.left - margin.right,
			height = 250 - margin.top - margin.bottom;
			
		var minDate = data[0].yValue;
		var maxDate = data[data.length-1].yValue;
		
		var x = d3.time.scale().domain([minDate, maxDate]).range([0,100]);

		var y = d3.scale.linear()
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");


		console.log('#' + this.chartName);
		var chart = d3.select('#' + this.chartName)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/

		//x.domain(data.map(function(d) { return d.xValue; }));
		/*y.domain([0, d3.max(data, function(d) { return d.yValue; })]);

		chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		chart.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		chart.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.xValue); })
			.attr("y", function(d) { return y(d.yValue); })
			.attr("height", function(d) { return height - y(d.yValue); })
			.attr("width", 1000);*/
			//.attr("width", x.rangeBand());
	}
}