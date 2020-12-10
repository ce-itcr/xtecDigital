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
  }

  courseName;
  folders = [["PRESENTACIONES","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf"]],
             ["QUICES","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf"]],
             ["EXAMENES","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf"]],
             ["PROYECTOS","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf"]]
            ]



  toSingleDocumentSection(title){
    localStorage.setItem("currentDocumentSection", title)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_single_document']));
  }

}
