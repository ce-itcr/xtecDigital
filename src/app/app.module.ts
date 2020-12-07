import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './shared/sidebar/admin-sidebar/sidebar.module';
import { StudentSidebarModule } from './shared/sidebar/student-sidebar/sidebar.module';
import { ProfessorSidebarModule } from './shared/sidebar/professor-sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfessorLayoutComponent } from './layouts/professor-layout/professor-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { CoursesManagementComponent } from './pages/admin-pages/courses-management/courses-management.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminCoursesComponent } from './data-tables/admin-courses/admin-courses.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProfessorLayoutComponent,
    StudentLayoutComponent,
    CoursesManagementComponent,
    AdminCoursesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    ProfessorSidebarModule,
    StudentSidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
