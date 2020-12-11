import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfessorLayoutRoutes } from './professor-layout.routing';

import { DashboardComponent }       from '../../pages/professor-pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/professor-pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseComponent } from 'app/pages/professor-pages/course/course.component';
import { NewsComponent } from 'app/pages/professor-pages/news/news.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProfessorLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    CourseComponent,
    NewsComponent
  ]
})

export class ProfessorLayoutModule {}
