import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/admin-pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/admin-pages/user/user.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'admin_dashboard',      component: DashboardComponent },
    { path: 'admin_profile',           component: UserComponent },
];
