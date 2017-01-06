import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html'
})
export class AppComponent  { 
	constructor(public authService: AuthService) {}
}
