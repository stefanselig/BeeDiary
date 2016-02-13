import {Component} from 'angular2/core';
import {DashBoardService}	from '../services/dashboard.service';
import {Diagram} from './diagram.component';

@Component({
	selector: 'DashBoard',
	directives: [Diagram],
	template: `
				<div>
					<ul class="nav nav-tabs">
						<li *ngFor="#tab of tabs">
							<a href="{{'#' + tab.name}}" data-toggle="tab" (click)="onTabClicked(tab.name)">{{tab.name}}</a>
						</li>
					</ul>
				</div>
				<div class="tab-content">
					<div class="tab-pane" id="{{name}}">
						<diagram [diagramdata]="diagramdata" [name]="name"></diagram>
					</div>
				</div>
				`,
	providers: [DashBoardService]
})
export class Dashboard {
	dashboardService: DashBoardService;
	tabs: any[];
	tabContents: any[];
	public name: string;
	
	public diagramdata: any;
	
	// <!--*ngFor="#diagramdata of tabContents"--> 
	
	acarianData: any[];
	feedingData: any[];
	honeyData: any[];
	
	data: any[];
	
	x: any;
	y: any;
	width: number = 500;
	height: number = 250;
	barWidth: number;
	charts: any[];
	bar: any;
	//name: string;
	
	public show(obj: any) {
		console.log(obj);
	}

	constructor(dS: DashBoardService) {
		this.dashboardService = dS;
		
		this.tabs = [{name: "HoneyPie"},{name: "HoneyBar"},{name: "Acarian"}];
		this.diagramdata = {data: [{
					val: 5,
					date: new Date(2010,1,1,0,0,0,0),
				},
				{
					val: 10,
					date: new Date(2011,1,2,0,0,0,0),
				},
				{
					val: 20,
					date: new Date(2012,1,3,0,0,0,0)
				},
				{
					val: 100,
					date: new Date(2013,5,4,0,0,0,0)
				},
				{
					val: 50,
					date: new Date(2014,6,12,0,0,0,0)
				},
				{
					val: 70,
					date: new Date(2015,7,6,0,0,0,0)
				},
				{
					val: 7,
					date: new Date(2016,12,1,0,0,0,0)
				}],
				name: this.name
		};	
		this.tabContents = [
			{
				data: [{
					xValue: 5,
					yValue: 10,
				},
				{
					xValue: 10,
					yValue: 20,
				},
				{
					xValue: 20,
					yValue: 30
				}],
				name: 'first'
			},
			{
								data: [{
					xValue: 5,
					yValue: 10,
				},
				{
					xValue: 10,
					yValue: 20,
				},
				{
					xValue: 20,
					yValue: 30
				}],
				name: "second"
			},
			{
				data: [{
					xValue: 5,
					yValue: 10,
				},
				{
					xValue: 10,
					yValue: 20,
				},
				{
					xValue: 20,
					yValue: 30
				}],
				name: "third"
			}
		];
		this.acarianData = [
			/*{numberOfDays: 2, deadAcarians: 10},
			{numberOfDays: 5, deadAcarians: 30},
			{numberOfDays: 10, deadAcarians: 22},
			{numberOfDays: 12, deadAcarians: 15},
			{numberOfDays: 20, deadAcarians: 42}*/
			{xValue: 2, yValue: 10},
			{xValue: 5, yValue: 30},
			{xValue: 10, yValue: 22},
			{xValue: 12, yValue: 15},
			{xValue: 20, yValue: 42}
		];
		this.feedingData = [
			/*{amount:12},
			{amount:22},
			{amount:32},
			{amount:15},
			{amount:17},
			{amount:29}*/
			{xValue: new Date(2016,1,1,0,0,0,0), yValue: 22},
			{xValue: new Date(2015,1,1,0,0,0,0), yValue: 32},
			{xValue: new Date(2014,1,1,0,0,0,0), yValue: 42},
			{xValue: new Date(2012,1,1,0,0,0,0), yValue: 52}
		];
		this.honeyData = [
			{xValue:112},
			{xValue:222},
			{xValue:302},
			{xValue:105},
			{xValue:107},
			{xValue:209}
		];
		
		this.data = [
			{date: new Date(), value: 1},
			{date: new Date(2016,1,1,0,0,0,0), value: 2},
			{date: new Date(2015,1,1,0,0,0,0), value: 4},
			{date: new Date(2014,1,1,0,0,0,0), value: 3},
			{date: new Date(2013,1,1,0,0,0,0), value: 6},
			{date: new Date(2012,1,1,0,0,0,0), value: 7},
			{date: new Date(2011,1,1,0,0,0,0), value: 8}
		];
		this.charts = [];
		this.loadChart('acarianControlChart');
		/*this.data = this.dashboardService
			.getData()
			.subscribe(
				res => this.data = res,
				err => console.error(err),
				()  => console.log("Data for Charts loaded.")
		);*/
	}
	
	public onTabClicked(name: string): void {
		//this.diagramdata.name = name;
		//console.log(this.diagramdata.name);
		this.name = name;
	}
	
	public loadChart(id: string): void {
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
			
		/*var data = [];
		switch(id) {
			case 'acarianControlChart':
				data = this.acarianData;
			case 'feedingChart':
				data = this.feedingData;
			case 'honeyRemovalChart':
				data = this.honeyData;
		}
			
		var margin = {top: 20, right: 30, bottom: 30, left: 40},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
			.rangeRoundBands([0, width], .1);

		var y = d3.scale.linear()
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

		var chart = d3.select("#" + id)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		x.domain(data.map(function(d) { return d.date.toDateString(); }));
		y.domain([0, d3.max(data, function(d) { return d.value; })]);

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
			.attr("height", function(d) { return height - y(d.value); })
			.attr("width", x.rangeBand());	*/
	}
}