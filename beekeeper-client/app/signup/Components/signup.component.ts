import {Component} from 'angular2/core';
import {NgForm}		from 'angular2/common';
import {User}		from '../../user/user';
import {UserService}	from '../services/userService';

@Component({
	templateUrl: 'app/signup/Templates/signup.template.html',
	providers: [UserService]
})
export class SignUpComponent {
	public user: User;
	abc: any;
	userService: UserService;
	
	constructor(userService: UserService) {
		this.user = new User();
		this.userService = userService;
		var instance = this;
		// name, email, password
		

		
		/*userService.people.subscribe(
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
		*/
	}
	
	onSubmit(): void {
		console.log(this.user);
		console.log(this.user._name);
		console.log({
			name: this.user._name,
			email: this.user._email,
			password: this.user._password
		});
		this.userService.createUser({
			name: this.user._name,
			email: this.user._email,
			password: this.user._password
		});
	}
}