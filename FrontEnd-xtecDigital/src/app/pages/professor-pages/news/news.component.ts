import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'student_news-cmp',
    moduleId: module.id,
    templateUrl: 'news.component.html'
})

export class NewsComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService, private modal:NgbModal) {}

  ngOnInit(){
    this.newBody = localStorage.getItem("currentNewsBody");
    this.newTitle = localStorage.getItem("currentNewsTitle");
    this.newDate = localStorage.getItem("currentNewsDate");
    this.newAuthor = localStorage.getItem("currentNewsAuthor");
    this.newTime = localStorage.getItem("currentNewsTime");
  }

  newBody;
  newTitle;
  newDate;
  newAuthor;
  newTime;
  closeModal = false

  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'sm', centered:true});
    }
  }

  deleteNews(){
    var toDelete = this.newAuthor + "-" + this.newDate + "-" + this.newTime;
    this.CS.deleteNews(toDelete).subscribe(res => {
      this.router.navigateByUrl("/professor_course");
    }, error => {
      this.router.navigateByUrl("/professor_course");
      alert("ERROR");
    });
  }

  updateNews(title, body){
    var toDelete = this.newAuthor + "-" + this.newDate + "-" + this.newTime;
    this.CS.updateNews(toDelete, title, body).subscribe(res => {
      this.router.navigateByUrl("/professor_course");
    }, error => {
      alert("ERROR");
    });
  }

}
