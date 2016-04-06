import {Component, AfterViewInit, OnChanges, SimpleChange} from 'angular2/core';

@Component({
	selector: 'diagram',
	template: `
		<div [id]="id"></div>
	`,
	inputs: ["data", "type", "content", "libLoaded", "dataId", "buttonClicked", "dataLoaded"]
})
export class Diagram implements AfterViewInit, OnChanges  {
	height: number = 0;
	width: number = 0;
	
	data: any;
	type: any;
	content: any;
	libLoaded: boolean;
	dataLoaded: boolean = false;
	dataId: any;
	buttonClicked: any;
	
	id: string = "chart";
	options: any;
	chart: any;
	viewLoaded: boolean = false;
	/** Scales charts and sets onresize callback */
	ngAfterViewInit() {
		window.onresize = this.scale;
		this.viewLoaded = true;
		this.scale();
	}
	/** Scales chart's height and width */
	public scale(): void {
		this.height = document.getElementById(this.id).parentElement.clientHeight / 2;
		this.width = document.getElementById(this.id).parentElement.clientWidth;
		this.drawChart();
	}
	/** Draws chart depending on component input */
	ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
		if (changes["buttonClicked"] != undefined 
			&& changes["buttonClicked"].currentValue != changes["buttonClicked"].previousValue
			&& this.libLoaded 
			&& this.viewLoaded 
			&& this.dataLoaded ) {
			console.log(changes);
			this.drawChart();
		}
	}
	/** Draws a chart depending on selected type */
    public drawChart() {
		this.options = {
			title: this.content,
			width: this.width,
			height: this.height
		};
		
		switch(this.type) {
			case "Torte":
				this.generatePieChart();
				break;
			case "Balken":
				this.generateBarChart();
				break;
			case "Linien":
				this.generateLineChart();
				break;
		}
    }
	/** Generates a bar chart */
	public generateBarChart(): void {
		this.chart = new google.visualization.ColumnChart(document.getElementById(this.id));
		this.chart.draw(this.data, this.options);
	}
	/** Generates a line chart */
	public generateLineChart(): void {
		this.chart = new google.visualization.ColumnChart(document.getElementById(this.id));
		this.chart.draw(this.data, this.options);
	}
	/** Generates a pie chart */
	public generatePieChart(): void {
		this.chart = new google.visualization.PieChart(document.getElementById(this.id));
        this.chart.draw(this.data, this.options);
	}
}