import { Component, Input, Output } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
	selector: 'book',
	templateUrl: './app/components/book/book.component.html'
})

export class BookComponent {
	br = 'sfsdfsd';

	constructor(private booksService: BooksService) {}

	@Input('data') book: any;

	onDeleteBook(id: number) {
		this.booksService.deleteBook(id);
	}
	
}