import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/admin-sidebar/sidebar.component';
import { ROUTES_PROFESSOR } from '../sidebar/professor-sidebar/sidebar.component';
import { ROUTES_STUDENT } from '../sidebar/student-sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    allRoutes = ROUTES.concat(ROUTES_PROFESSOR).concat(ROUTES_STUDENT);
    newsData = [
      {
        title: 'Horario de Consulta 04/12/2020',
        date: '04-12-2020',
        body: 'Estimados estudiantes el horario de consulta para el día de hoy es a las 11:00am por el siguiente link: http://localhost:4200/#/course'
      },
      {
        title: 'Link para el Examen Parcial II',
        date: '04-10-2020',
        body: ''
      },
      {
        title: 'Link para el Examen Parcial I',
        date: '12-09-2020',
        body: ''
      },
      {
        title: 'Horario de Consulta día de hoy',
        date: '25-07-2020',
        body: ''
      },
    ];


    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button;

    constructor(location:Location, private renderer : Renderer2, private element : ElementRef, private router: Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        this.listTitles = this.allRoutes.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
    }
    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }
      toProfile(){
        var accountType = localStorage.getItem("accountType");
        if(accountType == "STUDENT"){
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['student_profile']));
        } else if(accountType == "ADMIN"){
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['admin_profile']));
        } else if(accountType == "PROFESSOR"){
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['professor_profile']));
        }
      }

      toNewsSection(title, date, body){
        localStorage.setItem("currentNewsBody",body);
        localStorage.setItem("currentNewsTitle",title);
        localStorage.setItem("currentNewsDate",date);
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['news']));
      }

}
