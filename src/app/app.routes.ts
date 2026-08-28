import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { PageNotFound } from './features/404_page/page-not-found/page-not-found';
import { Booking } from './features/booking/booking';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'booking',
    component: Booking,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
