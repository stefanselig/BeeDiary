import {Component,Input, AfterViewInit}	from 'angular2/core';

import {DiaryEntryService} from '../../../services/diaryentry.service';

import * as DiaryEntryModel from '../../../model/model/DiaryEntry/DiaryEntry';

@Component({
	selector: 'diaryentry',
	templateUrl: 'app/components/diaryentry/diaryentry/diaryentry.template.html',
	inputs: ['diaryentry'],
	styles: [`
		.ng-valid[required] {
			border-left: 5px solid green;
		}
		.ng-invalid {
			border-left: 5px solid red;
		}
	`]
})
export class DiaryEntryComponent implements AfterViewInit {
	public diaryentry: DiaryEntryModel.DiaryEntry;
	public beehiveMap: any[];
	public beehiveMapSelection: BeeHiveMapSelection;

	entryTypes: string[] = DiaryEntryModel.entryTypes;
	treatmentTypes: string[] = DiaryEntryModel.treatmentTypes;
	foodTypes: string[] = DiaryEntryModel.foodTypes;
	
	public isSelectionLoaded: boolean = false;
	public isViewLoaded: boolean = false;
	public mood: boolean = true;
	/** Loads BeeHives' names and ids */
	constructor(public diaryEntryService: DiaryEntryService) {
		this.getBeeHiveNamesAndIds();
	}
	/** Toggles the mood buttons */
	public toggleMood(): boolean {
		if (this.diaryentry.mood == undefined)
			this.diaryentry.mood = false;
		this.diaryentry.mood = !this.diaryentry.mood;
		return false;
	}
	/** Select BeeHiveValue */
	public selectBeeHiveValue(event: any): void {
		this.diaryentry.beeHiveId = event.target.value;
		this.diaryentry.beeHiveName = this.beehiveMap.find(el => el._id == event.target.value).hiveName;
	}
	/** Gets BeeHives' names and ids */
	public getBeeHiveNamesAndIds(): void {
		this.diaryEntryService
			.beehiveNamesAndIdsMap
			.subscribe(
				res => {
					console.log(res);
					this.beehiveMap = res.slice();
					this.beehiveMap.unshift({hiveName: undefined, _id: undefined});
					this.isSelectionLoaded = true;
					if (this.isViewLoaded) {
						this.diaryentry.beeHiveName = this.beehiveMap.find(el => el._id == this.diaryentry.beeHiveId).hiveName;
					}
				},
				err => console.log(err)
			);
	}
	/** Loads BeeHiveName after view is initialized */
	public ngAfterViewInit(): void {
		this.isViewLoaded = true;
		if (this.isSelectionLoaded) {
			this.diaryentry.beeHiveName = this.beehiveMap.find(el => el._id == this.diaryentry.beeHiveId).hiveName;
		}
	}
	/** Parses the markdown text to html */
	public parseMd(): string {
		return this.diaryentry.description == null ? "" : marked(this.diaryentry.description);
	}
	/** Loads photos from HTML Filepicker */
	public handlePhotos(pictures): void {
		const readers = new Array<FileReader>();
		for (let i = 0; i < pictures.length; i++) {
			readers.push(new FileReader());
			if (pictures[i]) {
				readers[i].readAsDataURL(pictures[i]);
			}
		}
		readers.forEach(reader => {
			reader.addEventListener("load", () => {
				this.diaryentry.photos.push(new DiaryEntryModel.Photo(0, reader.result));
			});
		});
	}
	/** Deletes a photo */
	public deletePhoto(photo: DiaryEntryModel.Photo, fileInputPhotos: any): void {
		fileInputPhotos.value = "";
		const index = this.diaryentry.photos.indexOf(this.diaryentry.photos.find(p => p == photo));
		this.diaryentry.photos.splice(index, 1);
	}
}
/** Interface for a BeeHiveMap */
export interface BeeHiveMapSelection {
	beeHiveId: string;
	beeHiveName: string;
}