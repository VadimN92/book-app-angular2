import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookFormService } from '../../forms/book-fotm.service';

@Component({
	selector: 'book',
	templateUrl: './app/components/book/book.component.html'
})

export class BookComponent {
	constructor(private bookFormService: BookFormService) {}

	@Input('data') book: any;
	@Output() deleteBook = new EventEmitter();

	onDeleteBook(book: any) {
		this.deleteBook.emit(book);
	}

	onEditBook(book: any) {
		this.bookFormService.updateBookForm(book);
	}

}
