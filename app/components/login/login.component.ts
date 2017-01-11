import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginFormService } from '../../forms/login-form.service';

@Component({
	selector: 'login',
	templateUrl: './app/components/login/login.component.html'
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	errorMsg: string = '';

	constructor(
	  	private authService: AuthService,
    	private router: Router,
    	private loginFormService: LoginFormService) {}

	ngOnInit() {
		this.authService.logout();
		this.loginForm = this.loginFormService.createLoginForm();
	}

	onLogin(user: any) {
		this.errorMsg = '';
		this.authService.login(user)
			.then((res) => {
				localStorage.setItem('isAuth', 'true');
				localStorage.setItem('token', res.token);
				this.router.navigate(['home']);
			})
			.catch((err) => {
				this.errorMsg = err.statusText;
			});
	}

}
