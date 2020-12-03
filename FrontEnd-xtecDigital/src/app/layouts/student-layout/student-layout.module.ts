import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentLayoutRoutes } from './student-layout.routing';

import { DashboardComponent }       from '../../pages/student-pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/student-pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
  ]
})

export class StudentLayoutModule {}
