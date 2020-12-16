import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/admin-sidebar/sidebar.component';
import { ROUTES_PROFESSOR } from '../sidebar/professor-sidebar/sidebar.component';
import { ROUTES_STUDENT } from '../sidebar/student-sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location} from '@angular/common';
import { CommunicationService } from 'app/communication/communication.service';

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
    news = [];


    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button;

    constructor(location:Location, private renderer : Renderer2, private element : ElementRef, private router: Router, private CS: CommunicationService) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){

        this.news = [];

        this.listTitles = this.allRoutes.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
          this.sidebarClose();
       });
       this.CS.getNews(localStorage.getItem("newsId")).subscribe(res => {
        var cont = 0;
        while(cont < res.length){
          var data = [];
          var newInfo = res[cont];
          data.push(newInfo["title"]);
          data.push(newInfo["publicationDate"]);
          data.push(newInfo["message"]);
          this.news.push(data);
          cont++;
      }
       }, error => {
         alert("ERROR")
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

      test(){
        alert("HOLA");
      }
}
