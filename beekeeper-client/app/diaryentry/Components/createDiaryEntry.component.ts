import {Component, AfterViewInit} 		from 'angular2/core';
import {Router}			from 'angular2/router';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'CreateDiaryEntry',
	templateUrl: 'app/diaryentry/Templates/createDiaryEntry.template.html',
	providers: [DiaryEntryService]
})
export class CreateDiaryEntryComponent implements AfterViewInit {
	public newDiaryEntry: any = {};
	public mdDescription: string = "";
	
	public typeEnum: any[] = [];
	public treatmentTypes: any[] = [];
	public feedingTypes: any[] = [];
		
	public diaryEntryService: DiaryEntryService;
	public router: Router;
	
	constructor(diaryEntryService: DiaryEntryService, router: Router) {
		this.diaryEntryService = diaryEntryService;
		this.router = router;
		
		this.loadEnums();
	}
	
	public ngAfterViewInit(): void {
		//this.initDates();
	}
	
	public loadEnums(): void {
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
	}
	
	public createNewDiaryEntry(createDiaryEntryForm: any): void {
		this.newDiaryEntry = createDiaryEntryForm.value;
		
		this.diaryEntryService
		.createDiaryEntry(this.newDiaryEntry)
		.subscribe(
			res => {
				console.log(res);
				this.router.navigate(['DiaryEntries']);	
			},
			err => console.log(err),
			()  => console.log("Created diary entry.")
		);
	}
	
	public cancel(): void {
		this.router.navigate('DiaryEntries');
	}
	
	public parseMd(): any {
		if (this.mdDescription == null) 
			return "";
		else 
			return marked(this.mdDescription);
	}
	
	public initDates(): void {
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
	}
}