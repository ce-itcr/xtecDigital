import { Routes } from '@angular/router';
import { AssignmentsComponent } from 'app/pages/student-pages/assignments/assignments.component';

import { CourseComponent } from 'app/pages/student-pages/course/course.component';
import { CoursesComponent } from 'app/pages/student-pages/courses/courses.component';
import { DocumentComponent } from 'app/pages/student-pages/document/document.component';
import { DocumentsComponent } from 'app/pages/student-pages/documents/documents.component';
import { NewsComponent } from 'app/pages/student-pages/news/news.component';
import { DashboardComponent } from '../../pages/student-pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/student-pages/user/user.component';

export const StudentLayoutRoutes: Routes = [
    { path: 'student_dashboard',      component: DashboardComponent },
    { path: 'student_courses',        component: CoursesComponent },
    { path: 'student_profile',        component: UserComponent },
    { path: 'course',                 component: CourseComponent },
    { path: 'news',                   component: NewsComponent },
    { path: 'student_documents',      component: DocumentsComponent },
    { path: 'student_assignments',     component: AssignmentsComponent},
    { path: 'student_single_document',       component: DocumentComponent }
];
