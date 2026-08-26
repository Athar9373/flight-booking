import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { PageNotFound } from './features/404_page/page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
