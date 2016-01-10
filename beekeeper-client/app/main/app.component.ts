import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {SignUpComponent} from './../signup/Components/signup.component';
import {LogInComponent} from './../login/login.component';
import {BeeHiveComponent} from './../beehive/Components/beehive.component';
import {CreateBeeHiveComponent} from './../beehive/Components/createBeeHive.component';
import {EditBeeHiveComponent} from './../beehive/Components/editBeeHive.component';
import {DiaryEntryComponent} from './../diaryentry/Components/diaryentry.component';

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
	{path: '/diaryentry', name: 'DiaryEntry', component: DiaryEntryComponent}
])

export class AppComponent {}