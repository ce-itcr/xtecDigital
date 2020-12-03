import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentLayoutRoutes } from './student-layout.routing';

import { DashboardComponent }       from '../../pages/student-pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/student-pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoursesComponent } from 'app/pages/student-pages/courses/courses.component';
import { RecordsComponent } from 'app/pages/student-pages/records/records.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    CoursesComponent,
    RecordsComponent,
    UserComponent,
  ]
})

export class StudentLayoutModule {}
