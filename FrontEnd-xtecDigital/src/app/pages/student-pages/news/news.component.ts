import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'student_news-cmp',
    moduleId: module.id,
    templateUrl: 'news.component.html'
})

export class NewsComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService) {}

  ngOnInit(){
    this.newBody = localStorage.getItem("currentNewsBody");
    this.newTitle = localStorage.getItem("currentNewsTitle");
    this.newDate = localStorage.getItem("currentNewsDate");
  }

  newBody;
  newTitle;
  newDate;

}