import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AuthorsService } from '../../services/authors.service';

@Component({
	selector: 'authors-add',
	templateUrl: './app/components/authors-add/authors-add.componetn.html'
})

export class AuthorsAddComponent implements OnInit, OnDestroy {
	addAuthorForm: FormGroup;
	subFormAuthor: any;
	constructor(private authorsService: AuthorsService ) {}

	ngOnInit() {
		this.authorsService.createFormAuthor();
		this.addAuthorForm = this.authorsService.getAuthorForm();
		this.subFormAuthor = this.authorsService.getAuthorFormChange()
			.subscribe((value: any) => {
				this.addAuthorForm = this.authorsService.getAuthorForm();
			})
	}

	ngOnDestroy() {
		this.subFormAuthor.unsubscribe();
	}

	onAuthorSubmit(author: any) {
		if(author.id) {
			this.authorsService.editAuthor(author);
			this.addAuthorForm.reset()
		} else {
			this.authorsService.addAuthor(author);
			this.addAuthorForm.reset()
		}
		
	}

	onCanceledit() {
		this.addAuthorForm.reset();
	}

}