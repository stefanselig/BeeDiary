import {Injectable} from 'angular2/core';

@Injectable()
export class Utilities {
	/**
	 * Maps dates that are strings to Dates
	 * (When converting a date to a JSON it becomes
	 * a string and needs to be converted back again)
	 */
	public mapDateStringsToDates(propertyName: string, collection?: any[], option?: string): any[] {
		if (option == undefined) {
			collection
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}
		else {
			collection
				.filter(e => e.type == option)
				.filter(e => e[propertyName] != undefined && e[propertyName] != null && e[propertyName] != NaN)
				.forEach(e => e[propertyName] = new Date(e[propertyName]));
		}
		return collection;
	}
	
	public formatDate(date: Date, options): string {
		if (date == null || date == undefined || isNaN(Date.parse(date.toString())))
			return "";
		const months = ["Jänner", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
		let month;
		if (options == "Noch kein Eintrag vorhanden" && isNaN(Date.parse(date.toDateString()))) {
			return options;
		}
		if (options == "fullmonths") {
			month = months[date.getMonth()];
		}
		else {
			month = date.getMonth()+1 + ".";
		}
		return `${date.getDate()}. ${month} ${date.getFullYear()}`;
	}
}


export interface obj {
	_id: any;
}