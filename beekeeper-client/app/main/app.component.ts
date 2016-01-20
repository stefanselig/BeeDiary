import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {SignUpComponent} from './../signup/Components/signup.component';
import {LogInComponent} from './../login/login.component';
import {BeeHiveComponent} from './../beehive/Components/beehive.component';
import {CreateBeeHiveComponent} from './../beehive/Components/createBeeHive.component';
import {EditBeeHiveComponent} from './../beehive/Components/editBeeHive.component';
import {DiaryEntriesComponent} from './../diaryentry/Components/diaryentries.component';
import {CreateDiaryEntryComponent} from './../diaryentry/Components/createDiaryEntry.component';
import {EditDiaryEntryComponent} from './../diaryentry/Components/editDiaryEntry.component';

@Component({
	selector: 'beekeeper',
	templateUrl: 'app/main/Templates/main.template.html',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/signup', name: 'SignUp', component: SignUpComponent},
	{path: '/login', name: 'LogIn', component: LogInComponent},
	{path: '/beehive', name: 'BeeHive', component: BeeHiveComponent},
	{path: '/createbeehive', name: 'CreateBeeHive', component: CreateBeeHiveComponent},
	{path: '/editbeehive:id', name: 'EditBeeHive', component: EditBeeHiveComponent},
	{path: '/diaryentries', name: 'DiaryEntries', component: DiaryEntriesComponent},
	{path: '/creatediaryentry', name: 'CreateDiaryEntry', component: CreateDiaryEntryComponent},
	{path: '/editdiaryentry/:id', name: 'EditDiaryEntry', component: EditDiaryEntryComponent}
])

export class AppComponent {}