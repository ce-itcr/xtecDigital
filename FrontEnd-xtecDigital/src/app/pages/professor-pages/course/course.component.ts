import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'course-cmp',
    moduleId: module.id,
    templateUrl: 'course.component.html'
})

export class CourseComponent implements OnInit{

  constructor(private router:Router, private modal:NgbModal, private CS: CommunicationService){}

  ngOnInit(){

    this.courseName = localStorage.getItem("currentCourseName");
    this.year = localStorage.getItem("currentYear");
    this.period = localStorage.getItem("currentPeriod");
    this.courseId = localStorage.getItem("currentCourse");
    this.courseGroup = localStorage.getItem("currentGroup");

    this.news = [];

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
  currentUser = localStorage.getItem("current_username");

  newsId;

  n = new Date();
  newDate = this.n.getFullYear() + "/0" + (this.n.getMonth() + 1) + "/" + this.n.getDate();

  public getHour(){

    var n = new Date();
    var hour = "";

    if(n.getHours()[0] == "0"){
      hour += n.getHours()[1];
    }else{
      hour += n.getHours();
    }

    hour += ":";

    if(n.getMinutes()[0] == "0"){
      hour += n.getMinutes()[1];
    }else{
      hour += n.getMinutes();
    }

    hour += ":";

    if(n.getSeconds()[0] == "0"){
      hour += n.getSeconds()[1];
    }else{
      hour += n.getSeconds();
    }
    return hour;
  }

  closeModal = false;

  students = [["Nombre Estudiante 1","user01@gmail.com","../../../../assets/img/default-avatar.png"],
              ["Nombre Estudiante 2","user02@gmail.com","../../../../assets/img/default-avatar.png"],
              ["Nombre Estudiante 3","user03@gmail.com","../../../../assets/img/default-avatar.png"],
              ["Nombre Estudiante 3","user03@gmail.com","../../../../assets/img/default-avatar.png"]]

  professors = [["Nombre Profesor 1","prof01@gmail.com","../../../../assets/img/default-avatar.png"],
                ["Nombre Profesor 2","prof02@gmail.com","../../../../assets/img/default-avatar.png"]]

  news = []


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
    this.router.navigate(['professor_documents']));
  }

  toAssignmentsSection(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['professor_rubros']));
  }

  toNewsSection(title, date, author, body, time){
    localStorage.setItem("currentNewsBody",body);
    localStorage.setItem("currentNewsTitle",title);
    localStorage.setItem("currentNewsDate",date);
    localStorage.setItem("currentNewsAuthor",author);
    localStorage.setItem("currentNewsTime",time);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['professor_news']));
  }

  createNew(title, body){
    this.CS.createNews(this.currentUser , title, body, this.newDate, this.getHour(), this.newsId).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

}
