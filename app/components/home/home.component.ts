import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'home',
	templateUrl: './app/components/home/home.component.html'
})

export class HomeComponent implements OnInit {

	isLogined: boolean;

	constructor(private authServise: AuthService) {}

	ngOnInit() {
		this.isLogined = this.authServise.isLogined() || false;
	}

	onLogout() {
		this.authServise.logout();
	}
}