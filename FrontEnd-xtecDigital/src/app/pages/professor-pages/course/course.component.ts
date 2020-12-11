import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'course-cmp',
    moduleId: module.id,
    templateUrl: 'course.component.html'
})

export class CourseComponent implements OnInit{

  constructor(private router:Router, private modal:NgbModal){}

  ngOnInit(){
    this.courseId = localStorage.getItem("currentCourseId");
    this.courseName = localStorage.getItem("currentCourseName");
    this.currentUser = localStorage.getItem("currentUser")
  }

  courseId;
  courseName;
  currentUser;
  closeModal = false;
  students = [["Nombre Estudiante 1","user01@gmail.com","../../../../assets/img/default-avatar.png"],
              ["Nombre Estudiante 2","user02@gmail.com","../../../../assets/img/default-avatar.png"],
              ["Nombre Estudiante 3","user03@gmail.com","../../../../assets/img/default-avatar.png"],
              ["Nombre Estudiante 3","user03@gmail.com","../../../../assets/img/default-avatar.png"]]

  professors = [["Nombre Profesor 1","prof01@gmail.com","../../../../assets/img/default-avatar.png"],
                ["Nombre Profesor 2","prof02@gmail.com","../../../../assets/img/default-avatar.png"]]

  news = [["Horario de Consulta 04/12/2020","2020-04-12","PROFESOR 01","Estimados estudiantes el horario de consulta para el día de hoy es a las 11:00am por el siguiente link: http://localhost:4200/#/course",],
          ["Link para el II Examen Parcial","2020-04-12","PROFESOR 01","Estimados estudiantes el horario de consulta para el día de hoy es a las 11:00am por el siguiente link: http://localhost:4200/#/course"]]


  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'sm', centered:true});
    }
  }
  toCurrentSection(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['course']));
  }

  toDocumentsSection(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_documents']));
  }

  toAssignmentsSection(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_assignments']));
  }

  toNewsSection(title, date, author, body){
    localStorage.setItem("currentNewsBody",body);
    localStorage.setItem("currentNewsTitle",title);
    localStorage.setItem("currentNewsDate",date);
    localStorage.setItem("currentNewsAuthor",author);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['professor_news']));
  }

  createNew(title, body){

  }

}
