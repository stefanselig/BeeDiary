import {Component,Input, AfterViewInit}	from 'angular2/core';
import {DiaryEntryService} from '../services/diaryentry.service';
import {
	DiaryEntry, 
	entryTypeEnum,
	treatmentTypeEnum,
	foodTypeEnum,
	Photo
} from './../../build-client/DiaryEntry/DiaryEntry';

@Component({
	selector: 'diaryentry',
	templateUrl: 'app/diaryentry/Templates/diaryEntry.template.html',
	inputs: ['diaryentry'],
	styles: [`
		.ng-valid[required] {
			border-left: 5px solid #42A948; /* green */
		}

		.ng-invalid {
			border-left: 5px solid #a94442; /* red */
		}
	`]
})
export class DiaryEntryComponent implements AfterViewInit {
	public diaryentry: DiaryEntry;
	public beehiveMap: any[];
	public beehiveMapSelection: BeeHiveMapSelection;
	
	public typeEnum: entryTypeEnum[];
	public treatmentTypes: treatmentTypeEnum[];
	public feedingTypes: foodTypeEnum[];
	
	public isSelectionLoaded: boolean = false;
	public isViewLoaded: boolean = false;
	public mood: boolean = true;
	
	constructor(public diaryEntryService: DiaryEntryService) {
		this.loadEnums();
		this.getBeeHiveNamesAndIds();
	}
	
	public toggleMood(): boolean {
		this.mood = !this.mood;
		return false;
	}
	
	public selectBeeHiveValue(event: any): void {
		this.diaryentry.beeHiveId = event.target.value;
		this.diaryentry.beeHiveName = this.beehiveMap.find(el => el._id == event.target.value).hiveName;
	}
	
	public loadEnums(): void {
		this.diaryEntryService.typeEnum.subscribe(
			(res: entryTypeEnum[]) => this.typeEnum = res.slice(),
			err => console.log(err)
		);
		this.diaryEntryService.treatmentTypes.subscribe(
			(res: treatmentTypeEnum[]) => this.treatmentTypes = res.slice(),
			err => console.log(err)
		);
		this.diaryEntryService.feedingTypes.subscribe(
			(res: foodTypeEnum[]) => this.feedingTypes = res.slice(),
			err => console.log(err)
		);
	}
	
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
	
	public ngAfterViewInit(): void {
		this.isViewLoaded = true;
		if (this.isSelectionLoaded) {
			this.diaryentry.beeHiveName = this.beehiveMap.find(el => el._id == this.diaryentry.beeHiveId).hiveName;
		}
	}
	
	
	public parseMd(): string {
		if (this.diaryentry.description == null) 
			return "";
		else 
			return marked(this.diaryentry.description);
	}
	
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
				this.diaryentry.photos.push(new Photo(0, reader.result));
			});
		});
	}
	
	public deletePhoto(photo: Photo, fileInputPhotos: any): void {
		fileInputPhotos.value = "";
		const index = this.diaryentry.photos.indexOf(this.diaryentry.photos.find(p => p == photo));
		this.diaryentry.photos.splice(index, 1);
	}
}

export interface BeeHiveMapSelection {
	beeHiveId: string;
	beeHiveName: string;
}