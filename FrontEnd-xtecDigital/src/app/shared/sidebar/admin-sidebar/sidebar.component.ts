import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    //{ path: '/admin_dashboard',     title: 'Inicio',         icon:'nc-bank',       class: '' },
    { path: '/admin_semesterManagement',          title: 'Inicio',      icon:'nc-bank',  class: '' },
    { path: '/admin_coursesManagement',          title: 'Cursos',      icon:'nc-single-copy-04',  class: '' },
    { path: '/admin_profile',          title: 'Perfil',      icon:'nc-single-02',  class: '' },

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
