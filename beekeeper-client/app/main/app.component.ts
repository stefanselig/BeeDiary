import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {SignUpComponent} from './../signup/signup.component';
import {LogInComponent} from './../login/login.component';

@Component({
	selector: 'beekeeper',
	templateUrl: 'app/main/Templates/main.template.html',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/signup', name: 'SignUp', component: SignUpComponent},
	{path: '/login', name: 'LogIn', component: LogInComponent}
])

export class AppComponent {}