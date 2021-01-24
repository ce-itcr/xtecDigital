import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProfessorLayoutComponent } from './layouts/professor-layout/professor-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { LoginComponent } from './pages/login/login.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },


  {
    path: 'admin_semesterManagement',
    redirectTo: 'admin_semesterManagement',
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
    path: 'student_courses',
    redirectTo: 'student_courses',
    pathMatch: 'full',
    runGuardsAndResolvers: 'always'
  }, {
    path: '',
    component: StudentLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/student-layout/student-layout.module#StudentLayoutModule'
  }]},


  {
    path: '**',
    redirectTo: ''
  }
]
