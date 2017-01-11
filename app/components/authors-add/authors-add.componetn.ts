import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorFormService } from '../../forms/author-form.service';

import { AuthorsService } from '../../services/authors.service';

@Component({
	selector: 'authors-add',
	templateUrl: './app/components/authors-add/authors-add.componetn.html'
})

export class AuthorsAddComponent implements OnInit, OnDestroy {
	addAuthorForm: FormGroup;
	subFormAuthor: any;
	constructor(
	  private authorsService: AuthorsService,
  private authorFormService: AuthorFormService) {}

	ngOnInit() {
    this.addAuthorForm = this.authorFormService.createFormAuthor();
		this.subFormAuthor = this.authorFormService.getAuthorFormChange()
			.subscribe((form: FormGroup) => {
				this.addAuthorForm = form;
			});
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
