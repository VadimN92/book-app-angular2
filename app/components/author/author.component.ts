import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';

@Component({
	selector: 'author',
	templateUrl: './app/components/author/author.component.html'
})

export class AuthorComponent {

	@Input('data') author: any;
	@Output() deleteAuthor: EventEmitter<any> = new EventEmitter();

	constructor(private authorsService: AuthorsService) {}


	onDeleteAuthor(author: any) {
		this.deleteAuthor.emit(author);
	}

	onEditAuthor(a: any) {
		this.authorsService.createFormAuthor(a);
	}
	
}