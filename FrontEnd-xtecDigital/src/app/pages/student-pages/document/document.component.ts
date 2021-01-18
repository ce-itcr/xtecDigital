import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'student_document-cmp',
    moduleId: module.id,
    templateUrl: 'document.component.html'
})

export class DocumentComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService, private modal:NgbModal) {}

  ngOnInit(){

    this.files = [];

    this.courseName = localStorage.getItem("currentCourseName");
    this.currentDocumentSection = localStorage.getItem("currentDocumentSection");
    //FILL DOCUMENT FILES
    this.CS.getDocumentFiles(this.currentDocumentSection).subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        data.push(res[cont]["name"]);
        data.push(res[cont]["date"].slice(0,10));
        data.push(res[cont]["url"]);
        this.files.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    })

  }

  courseName;
  currentDocumentSection;
  currentFileName;
  files = [];
  public imagePath;

  n = new Date();
  date = this.n.getFullYear() + "/" + (this.n.getMonth() + 1) + "/" + this.n.getDate();

  
  //SET CURRENT ASSIGN
  assign(name){
    this.currentFileName = name;
  }

  //OPEN A NEW WINDOW WITH AN URL
  onNavigate(url){
    window.location.href=url;
  }

}

