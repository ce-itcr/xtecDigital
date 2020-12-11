import { Routes } from '@angular/router';
import { AssignmentsComponent } from 'app/pages/professor-pages/assignments/assignments.component';
import { CourseComponent } from 'app/pages/professor-pages/course/course.component';
import { DocumentComponent } from 'app/pages/professor-pages/document/document.component';
import { DocumentsComponent } from 'app/pages/professor-pages/documents/documents.component';
import { NewsComponent } from 'app/pages/professor-pages/news/news.component';
import { CoursesComponent } from 'app/pages/student-pages/courses/courses.component';

import { DashboardComponent } from '../../pages/professor-pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/professor-pages/user/user.component';

export const ProfessorLayoutRoutes: Routes = [
    { path: 'professor_dashboard',      component: DashboardComponent },
    { path: 'professor_profile',        component: UserComponent },
    { path: 'professor_course',         component: CourseComponent },
    { path: 'professor_news',           component: NewsComponent },
    { path: 'professor_documents',      component: DocumentsComponent },
    { path: 'professor_single_document',component: DocumentComponent },
    { path: 'professor_assignments',    component: AssignmentsComponent }
];
