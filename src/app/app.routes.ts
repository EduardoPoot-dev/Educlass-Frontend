import { Routes } from '@angular/router';

export const routes: Routes = [
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
