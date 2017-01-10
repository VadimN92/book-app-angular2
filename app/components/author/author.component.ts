import { Component, Input, Output } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';

@Component({
	selector: 'author',
	templateUrl: './app/components/author/author.component.html'
})

export class AuthorComponent {

	constructor(private authorsService: AuthorsService) {}

	@Input('data') author: any;

	deleteAuthor(id: string) {
		this.authorsService.deleteAuthor(id);
	}

	onEditAuthor(a: any) {
		console.log(a);
		this.authorsService.createFormAuthor(a);
	}
	
}