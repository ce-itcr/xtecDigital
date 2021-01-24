import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES_PROFESSOR: RouteInfo[] = [
    { path: '/professor_dashboard',     title: 'Inicio',         icon:'nc-bank',       class: '' },
    { path: '/professor_profile',          title: 'Perfil',      icon:'nc-single-02',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-prof-cmp',
    templateUrl: 'sidebar.component.html',
})

export class ProfessorSidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES_PROFESSOR.filter(menuItem => menuItem);
    }
}
