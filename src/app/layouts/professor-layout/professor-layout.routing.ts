import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/professor-pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/professor-pages/user/user.component';

export const ProfessorLayoutRoutes: Routes = [
    { path: 'professor_dashboard',      component: DashboardComponent },
    { path: 'professor_profile',           component: UserComponent },
];
