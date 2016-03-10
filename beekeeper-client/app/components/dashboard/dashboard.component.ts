import {Component, AfterViewInit} from 'angular2/core';

import {Diagram} from './diagram.component';

import {DashBoardService} from '../../services/dashboard.service';
import {DiaryEntryService} from '../../services/diaryentry.service';
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
				<div 
					*ngIf="selectedChartContent != 'Honigernte gesamt' 
					&& selectedChartContent != '' 
					&& selectedChartContent != undefined">
					Bienenvolk auswählen:
					<select [(ngModel)]="selectedBeeHive">
						<option *ngFor="#beehive of beeHives" [value]="beehive._id">
							{{beehive.hiveName}}
						</option>
					</select>
				</div>
				<button
					*ngIf="beehivesLoaded" 
					(click)="createChart()"
					class="btn btn-default" style="display: block">
					Diagramm generieren
				</button>
			</div>
			<diagram 
				*ngIf="showDiagram" 
				[data]="data" 
				[type]="selectedChartType" 
				[content]="selectedChartContent" 
				[dataId]="selectedBeeHive" 
				[libLoaded]="libLoaded" 
				[buttonClicked]="clickCounter" 
				[dataLoaded]="dataLoaded">
			</diagram>
		</div>
	`,
	directives: [Diagram],
	providers: [DashBoardService]
})
export class Dashboard implements AfterViewInit {
	chartTypes = ["Linien", "Torte", "Balken"];
	chartContents = [
		"Milbenabfall für ein Bienenvolk", 
		"Honigernte für ein Bienenvolk", 
		"Honigernte gesamt"];
	beeHives: Array<any> = new Array<any>();
		
	selectedChartType: string;
	selectedChartContent: string;
	selectedBeeHive: string;
	
	data: any = {};
	libLoaded: boolean = false;
	clickCounter: number = 0;
	
	beehivesLoaded: boolean = false;
	dataLoaded: boolean = false;
	showDiagram: boolean = false;
	
	constructor(public dashBoardService: DashBoardService, public diaryEntryService: DiaryEntryService) {
		this.diaryEntryService
			.beehiveNamesAndIdsMap
			.subscribe(res => {
				this.beeHives = res.slice();
				console.log(res);
				this.beehivesLoaded = true;
				//this.dataLoaded = true;
			});
	}
	
	ngAfterViewInit(): void {
    	google.charts.setOnLoadCallback(() => {
			this.libLoaded = true;
			//this.data = new google.visualization.DataTable();
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
		
		this.data.addColumn(`date`, `Zeitverlauf`);
		this.data.addColumn(`number`, ``);
		
		this.dashBoardService
			.getHoneyForOne(this.selectedBeeHive)
			.subscribe(res => {
				const dataArray = new Array<Array<any>>();
				for (const i in res) {
					dataArray.push([new Date(res[i].date), res[i].amount]);
				}
				this.data.addRows(dataArray);
				console.log(dataArray);
				this.dataLoaded = true;
				this.showDiagram = true;
				this.clickCounter++;
			});
	}
	
	public createLineChart(): void {
		this.selectedChartType = "Linien";
		
		this.data.addColumn('date', ``);
		this.data.addColumn('number', ``);
		
		this.dashBoardService
			.getAcarianData(this.selectedBeeHive)
			.subscribe(res => {
				const dataContent = res;
				const dataArray = new Array<Array<any>>();
				for (const i in dataContent) {
					dataArray.push([new Date(dataContent[i].date), dataContent[i].acarianDeathValue]);
				}
				this.data.addRows(dataArray);
				this.dataLoaded = true;
				this.showDiagram = true;
				this.clickCounter++;
			});
	}
	
	public createPieChart(): void {
		this.selectedChartType = "Torte";
		
		this.data.addColumn("string", "Bienenvolk");
		this.data.addColumn("number", "Honigernte [kg]");
		
		this.dashBoardService
			.honeyForAll
			.subscribe(
				res => {
					const dataContent = res.slice();
					const dataArray = new Array<Array<any>>();
					for (const i in dataContent) {
						dataArray.push([dataContent[i].beeHiveName, dataContent[i].amount]);
					}
					this.data.addRows(dataArray);
					this.dataLoaded = true;
					this.showDiagram = true;
					this.clickCounter++;
				},
				err => console.log(err)
			);
	}
}