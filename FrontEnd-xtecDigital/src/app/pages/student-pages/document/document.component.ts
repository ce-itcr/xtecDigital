import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'student_document-cmp',
    moduleId: module.id,
    templateUrl: 'document.component.html'
})

export class DocumentComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService) {}

  ngOnInit(){
    this.courseName = localStorage.getItem("currentCourseName");
    this.currentDocumentSection = localStorage.getItem("currentDocumentSection");
    this.files = [];

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
  documents;
  files = [];

  onNavigate(url){
    window.location.href=url;
  }

}

