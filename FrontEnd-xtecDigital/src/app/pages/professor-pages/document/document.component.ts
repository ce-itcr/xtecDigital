import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'professor_document-cmp',
    moduleId: module.id,
    templateUrl: 'document.component.html'
})

export class DocumentComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService, private modal:NgbModal) {}

  ngOnInit(){
    this.courseName = localStorage.getItem("currentCourseName");
    this.currentDocumentSection = localStorage.getItem("currentDocumentSection");
    //this.test("PRESENTACIONES");
    this.populateDocs(this.currentDocumentSection);
  }

  img_url;
  courseName;
  currentDocumentSection;
  documents;
  closeModal = false;
  public imagePath;
  imgURL: any;
  public message: string;
  folders = [["PRESENTACIONES","NOMBRE PROFESOR","2020-07-10",["Lesson_01_Introduction_to_Databases.pdf","Lesson_02_Conceptual_Model.pdf"]],
             ["QUICES","NOMBRE PROFESOR","2020-07-10",["Quiz_1.pdf","Quiz2_test.pdf"]],
             ["EXAMENES","NOMBRE PROFESOR","2020-07-10",["Examen_1.pdf"]],
             ["PROYECTOS","NOMBRE PROFESOR","2020-07-10",["Proyecto_1.pdf"]]
            ]

  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'md', centered:true});
    }
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  populateDocs(name){
    for(var i=0; i<this.folders.length; i++){
      if(name == this.folders[i][0]){
        //console.log(this.folders[i][3]);
        this.documents = this.folders[i][3];
        break;
      }
    }
  }

  downloadFile(document){
    alert(document);
  }

}

