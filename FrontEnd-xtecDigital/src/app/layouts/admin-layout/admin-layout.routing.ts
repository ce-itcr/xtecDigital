import { Routes } from '@angular/router';
import { CoursesManagementComponent } from 'app/pages/admin-pages/courses-management/courses-management.component';
import { DashboardComponent } from '../../pages/admin-pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/admin-pages/user/user.component';
import { SemesterManagementComponent } from '../../pages/admin-pages/semester-management/semester-management.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin_dashboard',      component: DashboardComponent },
    { path: 'admin_profile',           component: UserComponent },
    { path: 'admin_coursesManagement',           component: CoursesManagementComponent },
    { path: 'admin_semesterManagement',           component: SemesterManagementComponent }
];
