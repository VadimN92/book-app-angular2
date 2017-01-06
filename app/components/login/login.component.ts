import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'login',
	templateUrl: './app/components/login/login.component.html'
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	errorMsg: string = '';

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit() {
		this.authService.logout();
		this.loginForm = new FormGroup({
			email: new FormControl(''),
			password: new FormControl('')
		});
	}

	onLogin(user: any) {
		this.errorMsg = '';
		this.authService.login(user)
			.then((res) => {
				localStorage.setItem('isAuth', 'true');
				this.router.navigate(['home']);
			})
			.catch((err) => {
				this.errorMsg = err.statusText;
			});
	}

}


/*(status: boolean, msg: string = '') => {
			if(!status) {
				this.errorMsg = msg;
			}
		})*/