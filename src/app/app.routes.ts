import { Routes } from '@angular/router';
import { HomeComponent } from '@home/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.routes')
  },
  {
    path: 'courses',
    loadChildren: () => import('../app/courses/courses.routes')
  },
  {
    path: '**',
    redirectTo: 'courses'
  }
];
