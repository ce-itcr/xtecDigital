import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/student-pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/student-pages/user/user.component';

export const StudentLayoutRoutes: Routes = [
    { path: 'student_dashboard',      component: DashboardComponent },
    { path: 'student_profile',           component: UserComponent },
];
