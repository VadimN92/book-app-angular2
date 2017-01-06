import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthorsService } from '../../services/authors.service';

@Component({
	selector: 'authors-add',
	templateUrl: './app/components/authors-add/authors-add.componetn.html'
})

export class AuthorsAddComponent implements OnInit {
	addAuthorForm: FormGroup;
	constructor(private authorsService: AuthorsService ) {}

	ngOnInit() {
		this.addAuthorForm = new FormGroup({
			name: new FormControl('')
		})
	}

	onAuthorAdd(newAuthor: any) {

		console.log(newAuthor);
		this.authorsService.addAuthor(newAuthor);
		this.addAuthorForm.reset()
	}

}