import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {DiaryEntryComponent} from './diaryentry.component';
import {DiaryEntryService}	from '../services/diaryentry.service';

@Component({
	selector: 'EditDiaryEntry',
	directives: [DiaryEntryComponent],
	templateUrl: `
		<div>
			<div class="form-group">
				<diaryentry [diaryentry]="diaryentry"></diaryentry>
				<input type="submit" (click)="updateDiaryEntry()" value="Update DiaryEntry" class="btn btn-default"/>
				<input type="button" (click)="cancel()" value="Cancel" class="btn btn-default"/>
			</div>
		</div>
	`,
	providers: [DiaryEntryService]
})
export class EditDiaryEntryComponent {
	public diaryentry: any = {};
	//public display: boolean = false;
	
	constructor(public diaryEntryService: DiaryEntryService, public router: Router, params: RouteParams) {
		this.loadSelectedDiaryEntry(params.get('id'));
	}
	
	public loadSelectedDiaryEntry(id: string): void {
		this.diaryEntryService
		.getDiaryEntryById(id)
		.subscribe(
			res => this.diaryentry = res,
			err => console.log(err),
			()  => console.log("Load completed.") 
		);
	}
	
	public updateDiaryEntry(): void {
		this.diaryEntryService
		.updateDiaryEntry(this.diaryentry)
		.subscribe(
			res => console.log(res), 
			err => console.log(err), 
			()  => {
				console.log("Update completed.");
				this.router.navigate(['DiaryEntries']);
			}
		);
	}
	
	public cancel(): void {
		this.router.navigate(['DiaryEntries']);
	}
}