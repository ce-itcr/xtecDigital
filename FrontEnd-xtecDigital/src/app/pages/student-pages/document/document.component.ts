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
    //this.test("PRESENTACIONES");
    this.populateDocs(this.currentDocumentSection);
  }

  courseName;
  currentDocumentSection;
  documents;
  folders = [["PRESENTACIONES","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf","Lesson_02_Conceptual_Model.pdf"]],
             ["QUICES","NOMBRE PROFESOR","2020-07-10",["Quiz_1.pdf","Quiz2_test.pdf"]],
             ["EXAMENES","NOMBRE PROFESOR","2020-07-10",["Examen_1.pdf"]],
             ["PROYECTOS","NOMBRE PROFESOR","2020-07-10",["Proyecto_1.pdf"]]
            ]

  populateDocs(name){
    for(var i=0; i<this.folders.length; i++){
      if(name == this.folders[i][0]){
        //console.log(this.folders[i][3]);
        this.documents = this.folders[i][3];
        break;
      }
    }
  }

  onNavigate(){
    //this.router.navigateByUrl("https://www.google.com");
    window.location.href="https://drive.google.com/file/d/1XoyVt6QgcJWDvBRMVo4sQ_3DA_PcGwO0/view?usp=sharing";
  }

}

