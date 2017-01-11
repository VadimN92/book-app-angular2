import { Injectable} from '@angular/core';
import { HttpApiService } from '../api/http-api.service';

@Injectable()
export class AuthorsService {
	public authors: Array<any>;

	constructor(
		private httpApiService: HttpApiService,
		) {}

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
