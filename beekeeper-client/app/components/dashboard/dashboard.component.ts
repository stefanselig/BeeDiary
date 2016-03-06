import {Component, AfterViewInit} from 'angular2/core';

import {Diagram} from './diagram.component';

import {DashBoardService} from '../../services/dashboard.service';

@Component({
	selector: 'dashboard',
	template: `
		<div>
			<div>
				Daten wählen:
				<select [(ngModel)]="selectedChartContent">
					<option *ngFor="#chartContent of chartContents" [value]="chartContent">
						{{chartContent}}
					</option>
				</select>
				<div *ngIf="selectedChartContent != 'Honigernte gesamt' && selectedChartContent != '' && selectedChartContent != undefined">
					Bienenvolk auswählen:
					<select [(ngModel)]="selectedBeeHive">
						<option *ngFor="#beehive of beeHives" [value]="beehive._id">
							{{beehive.name}}
						</option>
					</select>
				</div>
				<!--Diagrammtyp wählen:
				<select [(ngModel)]="selectedChartType">
					<option *ngFor="#chart of chartTypes" [value]="chart">
						{{chart}}
					</option>
				</select>-->
				<button (click)="createChart()" (click)="clickCounter = clickCounter + 1" class="btn btn-default" style="display: block">Diagramm generieren</button>
			</div>
			<diagram *ngIf="clickCounter > 0" [data]="data" [type]="selectedChartType" [content]="selectedChartContent" [dataId]="selectedBeeHive" [libLoaded]="libLoaded" [buttonClicked]="clickCounter"></diagram>
		</div>
	`,
	directives: [Diagram],
	providers: [DashBoardService]
})
export class Dashboard implements AfterViewInit {
	// Test data
	chartTypes = ["Linien", "Torte", "Balken"];
	chartContents = ["Milbenabfall für ein Bienenvolk", "Honigernte für ein Bienenvolk", "Honigernte gesamt"];
	beeHives = [{_id: 123, name: "Bienenstock Rufling"}, {_id: 234, name: "Bienenstock Pasching"}, {_id: 345, name: "Bienenstock Hörsching"}];
	
	selectedChartType: string;
	selectedChartContent: string;
	selectedBeeHive: string;
	
	data: any = {};
	libLoaded: boolean = false;
	clickCounter: number = 0;
	
	constructor(public dashBoardService: DashBoardService) {}
	
	ngAfterViewInit(): void {
    	google.charts.setOnLoadCallback(() => {
			this.libLoaded = true;
			this.data = new google.visualization.DataTable();
		});
	}
	
	public createChart(): void {
		this.data = new google.visualization.DataTable();
		if (this.selectedChartContent == undefined) {
			return;
		}
		switch(this.selectedChartContent) {
			case this.chartContents[0]:
				this.createLineChart();
				break;
			case this.chartContents[2]:
				this.createPieChart();
				break;
			case this.chartContents[1]:
				this.createBarChart();
				break;
		}
	}
	
	public createBarChart(): void {
		this.selectedChartType = "Balken";
		
		this.data.addColumn('string', "Honigernte [kg]");
     	this.data.addColumn('date', 'Zeitverlauf');
		 
		
		 
		/*this.data.addRows([
			['Baltimore Ravens', new Date(2000, 8, 5)],
			['abc', new Date(2001, 10,10)],
			['xyz', new Date(2010, 4, 4)]
		]);*/
	}
	
	public createLineChart(): void {
		this.selectedChartType = "Linien";
		
		this.data.addColumn('date', 'Zeitverlauf');
		this.data.addColumn('number', 'Gestorbene Milben');
		
		this.data.addRows([
			[new Date(2013, 3, 3), 10],
			[new Date(2013, 4, 4), 20],
			[new Date(2013, 5, 5), 30]
		]);
	}
	
	public createPieChart(): void {
		this.selectedChartType = "Torte";
		
		this.data.addColumn("string", "Bienenvolk");
		this.data.addColumn("number", "Honigernte [kg]");
		
		this.dashBoardService.honeyForAll.subscribe(
			res => {
				const data = res.slice();
				console.log(`Data is: `);
				console.log(data);
				/*this.data.addRows([
					[data],
					[],
					[]
				]);	*/
			},
			err => console.log(err)
		);
		
		this.data.addRows([
			[this.beeHives[0].name, 10],
			[this.beeHives[1].name, 20],
			[this.beeHives[2].name, 30]
		]);
	}
}