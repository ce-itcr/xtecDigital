import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'student_dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService) {}

  ngOnInit(){}

  //SE NAVEGA HACIE EL COMPONENTE "DASHBOARD" DE ESTUDIANTE
  toDashboardPage(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_dashboard']));
  }

  //SE NAVEGA HACIE EL COMPONENTE "COURSES" DE ESTUDIANTE
  toCoursesPage(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_courses']));
  }

  //SE NAVEGA HACIE EL COMPONENTE "RECORDS" DE ESTUDIANTE
  toRecordsPage(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_records']));
  }

  //SE NAVEGA HACIE EL COMPONENTE "PROFILE" DE ESTUDIANTE
  toProfilePage(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_profile']));
  }
}
