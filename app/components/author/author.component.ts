import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthorFormService } from '../../forms/author-form.service';

@Component({
	selector: 'author',
	templateUrl: './app/components/author/author.component.html'
})

export class AuthorComponent {

	@Input('data') author: any;
	@Output() deleteAuthor: EventEmitter<any> = new EventEmitter();

	constructor(private authorFormService: AuthorFormService) {}


	onDeleteAuthor(author: any) {
		this.deleteAuthor.emit(author);
	}

	onEditAuthor(a: any) {
		this.authorFormService.updateAuthorForm(a);
	}

}
