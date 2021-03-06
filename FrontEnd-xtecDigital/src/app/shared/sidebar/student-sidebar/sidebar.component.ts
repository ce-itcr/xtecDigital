import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES_STUDENT: RouteInfo[] = [
    { path: '/student_courses',       title: 'Inicio',         icon:'nc-single-copy-04',  class: '' },
    { path: '/student_profile',       title: 'Cuenta',         icon:'nc-settings-gear-65',       class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-stud-cmp',
    templateUrl: 'sidebar.component.html',
})

export class StudentSidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES_STUDENT.filter(menuItem => menuItem);
    }
}
