import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {LogInComponent} from '../login/login.component';

import {BeeHiveComponent} from '../beehive/beehives/beehive.component';
import {CreateBeeHiveComponent} from '../beehive/createbeehive/createBeeHive.component';
import {EditBeeHiveComponent} from '../beehive/editbeehive/editBeeHive.component';

import {DiaryEntriesComponent} from '../diaryentry/diaryentries/diaryentries.component';
import {CreateDiaryEntryComponent} from '../diaryentry/creatediaryentry/createDiaryEntry.component';
import {EditDiaryEntryComponent} from '../diaryentry/editdiaryentry/editDiaryEntry.component';

import {Dashboard} from '../dashboard/dashboard.component';

import {BeeHiveService} from '../../services/beehive.service';
import {MapsService} from '../../services/maps.service';
import {DiaryEntryService} from '../../services/diaryentry.service';
import {Utilities} from '../../services/utilities.service';
import {AuthService} from '../../services/auth.service';

import {SignInHeader} from './signinheader.component';

@Component({
	selector: 'beediary',
	template: `
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-header">
				<a class="navbar-brand">BeeDiary</a>
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
			</div>
			<div class="navbar-collapse collapse">
				<ul class="nav navbar-nav">
					<li>
						<a [routerLink]="['BeeHives']">Bienenstöcke</a>
					</li>
					<li>
						<a [routerLink]="['DiaryEntries']">Tagebucheinträge</a>
					</li>	
					<li>
						<a [routerLink]="['DashBoard']">Dashboard</a>
					</li>
				</ul>
				<signinheader></signinheader>
			</div>
		</nav>
		<br />
		<br />
		<br />
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES, SignInHeader],
	providers: [AuthService, BeeHiveService, MapsService, DiaryEntryService, Utilities]
})
@RouteConfig([
	{path: "/", redirectTo: ['LogIn', {logOut: 'false'}]},
	{path: '/login', name: 'LogIn', component: LogInComponent},
	{path: '/beehive', name: 'BeeHives', component: BeeHiveComponent},
	{path: '/createbeehive', name: 'CreateBeeHive', component: CreateBeeHiveComponent},
	{path: '/editbeehive/:id', name: 'EditBeeHive', component: EditBeeHiveComponent},
	{path: '/diaryentries', name: 'DiaryEntries', component: DiaryEntriesComponent},
	{path: '/creatediaryentry', name: 'CreateDiaryEntry', component: CreateDiaryEntryComponent},
	{path: '/editdiaryentry/:id', name: 'EditDiaryEntry', component: EditDiaryEntryComponent},
	{path: '/dashboard', name: 'DashBoard', component: Dashboard}
])
/** No logic, unique purpose is delivering routing throughout the application */
export class AppComponent {}