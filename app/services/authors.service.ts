import { Injectable, EventEmitter } from '@angular/core';
import { HttpApiService } from '../api/http-api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthorsService {
	public authors: Array<any>;
	public formAuthor: FormGroup;
	public authorFormChange: EventEmitter<any> = new EventEmitter();

	constructor(
		private httpApiService: HttpApiService,
		private formBuilder: FormBuilder
		) {}

	createFormAuthor(author: any = {name: '', id: null}) {
		console.log(author);
		this.formAuthor = this.formBuilder.group({
			name: [author.name, Validators.required],
			id: author.id
		});

		console.log(this.formAuthor.value);
		this.authorFormChange.emit(author);
	}

	getAuthorForm() {
		return this.formAuthor;
	}

	getAuthorFormChange() {
		return this.authorFormChange;
	}

	addAuthor(author: any) {
		this.httpApiService.authorAdd(author).toPromise().then(data => {
			this.authors.push(data.json());
		});
	}

	editAuthor(author: any) {
		this.httpApiService.authorEdit(author.id, author).toPromise().then(data => {
			var res = data.json();
			console.log(res);
			var author = this.authors.find(a => a.id == res.id);
			console.log(author);
			if(author) {
				author.name = res.name;
			}
		}).catch(err => {
			console.log(err);
		})
	}

	getAuthors() {
		return this.httpApiService.getAuthors().toPromise()
			.then(data => {
				console.log('run getAuthors');
				this.authors = data.json()
			});
	}

	deleteAuthor(id: string) {
		console.log('service');
		this.httpApiService.deleteAuthor(id).toPromise().then(data => {
			var res = data.json();
			console.log(res);
			var authorIndex = this.authors.findIndex(a => a.id == res.id);
			if(authorIndex != -1) {
				this.authors.splice(authorIndex, 1);
			}
		}).catch(err => {
			console.log(err);
		})
	}

}