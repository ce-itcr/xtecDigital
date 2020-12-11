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
  }

  courseName;
  closeModal = false;
  currentUser;
  folders = [["PRESENTACIONES","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf"]],
             ["QUICES","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf"]],
             ["EXAMENES","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf"]],
             ["PROYECTOS","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf"]]
            ]

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
    let date: Date = new Date();
    alert(title + date + author)
  }

}
