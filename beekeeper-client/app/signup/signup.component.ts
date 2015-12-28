import {Component} from 'angular2/core';
import {NgForm}		from 'angular2/common';
import {User}		from '../user/user';
import {UserService}	from './userService';

@Component({
	templateUrl: 'app/signup/Templates/signup.template.html',
	providers: [UserService]
})
export class SignUpComponent {
	user: User;
	abc: any;
	
	constructor(userService: UserService) {
		this.user = new User();
		var instance = this;
		userService.people.subscribe(
			people => {
				console.log(people);
				console.log(people.message);
				this.user.setEmail(people.message);
				//this.abc = people.message;
				//console.log(this.abc);
				console.log(this.user.getEmail());
			},
			error => console.error("Error" + err),
			() => console.log("Completed")
		);
		
	}
	
	onSubmit(): void {
	}
}