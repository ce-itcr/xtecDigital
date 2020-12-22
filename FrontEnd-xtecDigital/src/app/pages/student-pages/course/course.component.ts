import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'course-cmp',
    moduleId: module.id,
    templateUrl: 'course.component.html'
})

export class CourseComponent implements OnInit{

  constructor(private router:Router, private CS: CommunicationService){}

  ngOnInit(){

    this.courseName = localStorage.getItem("currentCourseName");
    this.year = localStorage.getItem("currentYear");
    this.period = localStorage.getItem("currentPeriod");
    this.courseId = localStorage.getItem("currentCourse");
    this.courseGroup = localStorage.getItem("currentGroup");

    this.newsId = this.year + "-" + this.period + "-" + this.courseId + "-" + this.courseGroup;
    localStorage.setItem("newsId",this.newsId);

    this.CS.getNews(this.newsId).subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        var newInfo = res[cont];
        data.push(newInfo["title"]);
        data.push(newInfo["publicationDate"]);
        data.push(newInfo["author"]);
        data.push(newInfo["message"]);
        data.push(newInfo["publicationTime"]);
        this.news.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    });
  }

  courseName;
  year;
  period;
  courseId;
  courseGroup;

  newsId;

  students = [["Nombre Estudiante 1","user01@gmail.com","../../../../assets/img/default-avatar.png"],
              ["Nombre Estudiante 2","user02@gmail.com","../../../../assets/img/default-avatar.png"],
              ["Nombre Estudiante 3","user03@gmail.com","../../../../assets/img/default-avatar.png"],
              ["Nombre Estudiante 3","user03@gmail.com","../../../../assets/img/default-avatar.png"]]

  professors = [["Nombre Profesor 1","prof01@gmail.com","../../../../assets/img/default-avatar.png"],
                ["Nombre Profesor 2","prof02@gmail.com","../../../../assets/img/default-avatar.png"]]

  news = []


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
    this.router.navigate(['student_rubros']));
  }

  toNewsSection(title, date, author, body){
    localStorage.setItem("currentNewsBody",body);
    localStorage.setItem("currentNewsTitle",title);
    localStorage.setItem("currentNewsDate",date);
    localStorage.setItem("currentNewsAuthor",author);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['news']));
  }


}
