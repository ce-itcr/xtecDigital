import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'student_documents-cmp',
    moduleId: module.id,
    templateUrl: 'documents.component.html'
})

export class DocumentsComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService, private modal:NgbModal) {}

  ngOnInit(){
    this.folders = [];
    this.courseName = localStorage.getItem("currentCourseName");
    this.currentUser = localStorage.getItem("currentUser");
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
  closeModal = false;
  currentUser;
  folders = [];

  n = new Date();
  date = this.n.getFullYear() + "/" + (this.n.getMonth() + 1) + "/" + this.n.getDate();

  toSingleDocumentSection(title){
    localStorage.setItem("currentDocumentSection", title)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_single_document']));
  }


}
