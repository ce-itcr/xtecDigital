import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'professor_documents-cmp',
    moduleId: module.id,
    templateUrl: 'documents.component.html'
})

export class DocumentsComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService, private modal:NgbModal) {}

  ngOnInit(){
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

  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'sm', centered:true});
    }
  }

  toSingleDocumentSection(title){
    localStorage.setItem("currentDocumentSection", title)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['professor_single_document']));
  }

  createFolder(title, author){
    this.CS.createDocument(title, author, this.date).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

}
