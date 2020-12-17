import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'student_documents-cmp',
    moduleId: module.id,
    templateUrl: 'documents.component.html'
})

export class DocumentsComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService) {}

  ngOnInit(){
    this.courseName = localStorage.getItem("currentCourseName");
    this.user = localStorage.getItem("currentUser");
    this.folders = [];
    this.CS.getDocuments().subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        data.push(res[cont]["name"]);
        data.push(res[cont]["Teacher"]);
        data.push(res[cont]["creationDate"]);
        this.folders.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    });
  }

  courseName;
  user;
  folders = []



  toSingleDocumentSection(title){
    localStorage.setItem("currentDocumentSection", title)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_single_document']));
  }

}
