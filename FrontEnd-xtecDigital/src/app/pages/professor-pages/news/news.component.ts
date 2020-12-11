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
  }

  newBody;
  newTitle;
  newDate;
  newAuthor;
  closeModal = false

  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'sm', centered:true});
    }
  }

  updateNew(title, body){
  }

}
