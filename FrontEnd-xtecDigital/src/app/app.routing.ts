import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProfessorLayoutComponent } from './layouts/professor-layout/professor-layout.component';
import { LoginComponent } from './pages/login/login.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },


  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always'
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},

  {
    path: 'professor_dashboard',
    redirectTo: 'professor_dashboard',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always'
  }, {
    path: '',
    component: ProfessorLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/professor-layout/professor-layout.module#ProfessorLayoutModule'
  }]},


  {
    path: '**',
    redirectTo: ''
  }
]
