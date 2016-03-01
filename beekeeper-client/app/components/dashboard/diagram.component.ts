import {Component, AfterViewInit, OnChanges, SimpleChange} from 'angular2/core';

@Component({
	selector: 'diagram',
	template: `
		<div [id]="id"></div>
	`,
	inputs: ["data", "type", "content", "libLoaded", "dataId", "buttonClicked"]
})
export class Diagram implements AfterViewInit, OnChanges  {
	height: number = 0;
	width: number = 0;
	
	data: any;
	type: any;
	content: any;
	libLoaded: boolean;
	dataId: any;
	buttonClicked: any;
	
	id: string = "chart";
	options: any;
	chart: any;
	viewLoaded: boolean = false;
	
	ngAfterViewInit() {
		window.onresize = this.scale;
		this.viewLoaded = true;
		this.scale();
	}
	
	public scale(): void {
		this.height = document.getElementById(this.id).parentElement.clientHeight / 2;
		this.width = document.getElementById(this.id).parentElement.clientWidth;
		//console.log(`width is: ${this.width} and height is: ${this.height}`);
		this.drawChart();
	}
	
	ngOnChanges(changes: {[propName: string]: SimpleChange}): void {
		//console.log(changes);
		if (changes["buttonClicked"] != undefined && changes["buttonClicked"].currentValue != changes["buttonClicked"].previousValue && this.libLoaded && this.viewLoaded) {
			this.drawChart();
		}
	}

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
	 
	public generateBarChart(): void {
		this.chart = new google.visualization.BarChart(document.getElementById(this.id));
		this.chart.draw(this.data, this.options);
	}
	
	public generateLineChart(): void {
		this.chart = new google.visualization.LineChart(document.getElementById(this.id));
		this.chart.draw(this.data, this.options);
	}
	
	public generatePieChart(): void {
		this.chart = new google.visualization.PieChart(document.getElementById(this.id));
        this.chart.draw(this.data, this.options);
	}
}