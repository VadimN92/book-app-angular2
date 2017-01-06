import { Component, OnInit } from '@angular/core';

import { AuthorsService } from '../../services/authors.service';

@Component({
	selector: 'authors-list',
	templateUrl: './app/components/authors-list/authors-list.componetn.html'
})

export class AuthorsListComponent implements OnInit {
	authorsC: Array<any>;
	constructor(private authorsService: AuthorsService) {}

	ngOnInit() {
		
		this.authorsService.getAuthors()
			.then(res => {
				console.log(res);	
				this.authorsC = this.authorsService.authors;
			})
			.catch(err => {
				console.error(err);
			});
	}

}