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

import {Dashboard} from './../dashboard/Components/dashboard.component';

import {MapsService} from './../beehive/services/maps.service';
import {BeeHiveService} from './../beehive/services/beehive.service';
import {DiaryEntryService} from './../diaryentry/services/diaryentry.service';

@Component({
	selector: 'beekeeper',
	template: `
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-header">
				<a class="navbar-brand">BeeKeeper</a>
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
					<!--<li>
						<a [routerLink]="['DashBoard']">Dashboard</a>
					</li>-->
				</ul>
			</div>
		</nav>
		<br />
		<br />
		<br />
		<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES],
	providers: [MapsService, BeeHiveService, DiaryEntryService]
})
@RouteConfig([
	{path: '/signup', name: 'SignUp', component: SignUpComponent},
	{path: '/login', name: 'LogIn', component: LogInComponent},
	{path: '/beehive', name: 'BeeHives', component: BeeHiveComponent},
	{path: '/createbeehive', name: 'CreateBeeHive', component: CreateBeeHiveComponent},
	{path: '/editbeehive/:id', name: 'EditBeeHive', component: EditBeeHiveComponent},
	{path: '/diaryentries', name: 'DiaryEntries', component: DiaryEntriesComponent},
	{path: '/creatediaryentry', name: 'CreateDiaryEntry', component: CreateDiaryEntryComponent},
	{path: '/editdiaryentry/:id', name: 'EditDiaryEntry', component: EditDiaryEntryComponent},
	{path: '/dashboard', name: 'DashBoard', component: Dashboard}
])

export class AppComponent {}