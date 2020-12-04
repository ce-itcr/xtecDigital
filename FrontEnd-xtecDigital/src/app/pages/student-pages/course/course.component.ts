import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'course-cmp',
    moduleId: module.id,
    templateUrl: 'course.component.html'
})

export class CourseComponent implements OnInit{

  constructor(private router:Router){}

  ngOnInit(){
    this.courseId = localStorage.getItem("currentCourseId");
    this.courseName = localStorage.getItem("currentCourseName");
  }

  courseId;
  courseName;
  courseProfessor = [
    {
      title: 'Nombre Profesor',
      email: 'prof@gmail.com'
    }
  ];
  courseStudents = [
    {
      title: 'Nombre Estudiante',
      email: "user01@gmail.com"
    },
    {
      title: 'Nombre Estudiante',
      email: "user02@gmail.com"
    },
    {
      title: 'Nombre Estudiante',
      email: "user03@gmail.com"
    },
  ];
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



  toCurrentSection(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['course']));
  }

  toDocumentsSection(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['documents']));
  }

  toAssignmentsSection(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['assignments']));
  }

  toNewsSection(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['assignments']));
  }


}
