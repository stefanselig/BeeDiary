import {Component, AfterViewInit} 		from 'angular2/core';
import {Router}			from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';
import {DiaryEntryComponent} from './diaryentry.component';

@Component({
	selector: 'CreateDiaryEntry',
	template: `
		<form (ngSubmit)="submitDiaryEntry()" #diaryEntryForm="ngForm">
			<diaryentry [diaryentry]="diaryentry"></diaryentry>
			<input type="submit" value="Submit" class="btn btn-default" [disabled]="!diaryEntryForm.form.valid"/>
			<input type="button" (click)="cancel()" value="Cancel" class="btn btn-default"/>
		</form>
	`,
	directives: [DiaryEntryComponent],
	providers: [DiaryEntryService]
})
export class CreateDiaryEntryComponent implements AfterViewInit {
	public diaryentry: any = {};
	/*public typeEnum: any[] = [];
	public treatmentTypes: any[] = [];
	public feedingTypes: any[] = [];*/
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router) {
		//this.loadEnums();
	}
	
	public ngAfterViewInit(): void {}
	
	/*public loadEnums(): void {
		this.diaryEntryService
			.loadEnums()
			.then(
				res => {
					this.typeEnum = this.diaryEntryService.typeEnum.slice();
					this.feedingTypes = this.diaryEntryService.feedingTypes.slice();
					this.treatmentTypes = this.diaryEntryService.treatmentTypes.slice();
				}
			)
			.catch(
				err => console.log(err)
			);
	}*/
	
	public submitDiaryEntry(): void {
		console.log(this.diaryentry);
	}

	public cancel(): void {
		this.router.navigate(['DiaryEntries']);
	}
	
	/*public parseMd(): any {
		if (this.mdDescription == null) 
			return "";
		else 
			return marked(this.mdDescription);
	}*/
	
	/*public createNewDiaryEntry(): void {
		const newDiaryEntry = {
			type: this.type,
			countDays: this.countDays,
			deadAcarians: this.deadAcarians,
			treatmentType: this.treatmentType,
			appliance: this.appliance,
			treatmentBegin: this.treatmentBegin,
			treatmentEnd: this.treatmentEnd,
			feedingType: this.feedingType,
			amount: this.amount,
			proportion: this.proportion,
			reason: this.reason,
			otherText: this.otherText,
			date: this.date,
			isMarkdownEnabled: this.isMarkdownEnabled,
			description: this.description,
			photos: this.photos
		};
		
		this.diaryEntryService
		.createDiaryEntry(newDiaryEntry)
		.subscribe(
			res => {
				console.log(res);
				this.router.navigate(['DiaryEntries']);	
			},
			err => console.log(err),
			()  => console.log("Created diary entry.")
		);
	}*/
	
	
	
	/*public initDates(): void {
		var items = document.getElementsByTagName("input");
		for (let k = 0; k < items.length; k++) {
			if (items[k].type == "date") {
				items[k].value = this.formatDate(new Date(), "YYYY-MM-DD");
				console.log(items[k].value);
			}
		}
	}
	
	public initDate(): string {
		return this.formatDate(new Date(), "YYYY-MM-DD");
	}
	
	public formatDate(date: Date, format: string): string {
		var month = date.getMonth()+1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		switch (format) {
			case "YYYY-MM-DD":
				return date.getFullYear() + "-" + month + "-" + day;
		}
		return "";
	}*/
}