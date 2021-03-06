import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentLayoutRoutes } from './student-layout.routing';

import { UserComponent }            from '../../pages/student-pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoursesComponent } from 'app/pages/student-pages/courses/courses.component';
import { CourseComponent } from 'app/pages/student-pages/course/course.component';
import { NewsComponent } from 'app/pages/student-pages/news/news.component';
import { DocumentsComponent } from 'app/pages/student-pages/documents/documents.component';
import { DocumentComponent } from 'app/pages/student-pages/document/document.component';
import { AssignmentsComponent } from 'app/pages/student-pages/assignments/assignments.component';
import { RubrosComponent } from 'app/pages/student-pages/rubros/rubros.component';
import { GradesComponent } from 'app/pages/student-pages/grades/grades.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudentLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    CoursesComponent,
    UserComponent,
    CourseComponent,
    NewsComponent,
    DocumentsComponent,
    AssignmentsComponent,
    DocumentComponent,
    RubrosComponent,
    GradesComponent
  ]
})

export class StudentLayoutModule {}
