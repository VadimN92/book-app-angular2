import { Router, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component'

const appRouters = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'authors',
		component: AuthorsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'books',
		component: BooksComponent,
		canActivate: [AuthGuard]
	},
	{
    	path: '**',
    	component: NotFoundComponent
  	}
]

export const routing = RouterModule.forRoot(appRouters);

/*canActivate: [AuthGuard]

{
				path: '',
				redirectTo: 'authors',
				pathMatch: 'full'
			},

*/