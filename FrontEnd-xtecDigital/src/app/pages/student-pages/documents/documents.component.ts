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
  foldersStructure = [
    {
      title: 'PRESENTACIONES',
      courseId: 'S2-2020-CE3101.2',
      date: '06-06-2020',
      owner: 'xtecdigital',
      children: [
        {
          title: 'Lesson_01_Introduction_to_Databases.pdf',
          type: 'pdf',
          owner: 'PROFESOR',
          date: '07-07-2020',
          children: []
        },
        {
          title: 'Lesson_02_Conceptual_Model.pdf',
          type: 'pdf',
          owner: 'PROFESOR',
          date: '07-10-2020',
          children: []
        },
      ]
    },
    {
      title: 'QUICES',
      courseId: 'S2-2020-CE3101.2',
      date: '06-06-2020',
      owner: 'xtecdigital',
      children: [ ]
    },
    {
      title: 'EXAMENES',
      courseId: 'S2-2020-CE3101.2',
      date: '06-06-2020',
      owner: 'xtecdigital',
      children: [
        {
          title: 'Examen_I_Bases_de_Datos.pdf',
          type: 'pdf',
          owner: 'PROFESOR',
          date: '07-10-2020',
          children: []
        }
      ]
    },
    {
      title: 'PROYECTOS',
      courseId: 'S2-2020-CE3101.2',
      date: '06-06-2020',
      owner: 'xtecdigital',
      children: [
        {
          title: 'Requerimientos_de_Software_Proyecto_I_BD.pdf',
          type: 'pdf',
          owner: 'PROFESOR',
          date: '07-10-2020',
          children: []
        }
      ]
    },

  ];

  student_single_document

  toSingleDocumentSection(title){
    localStorage.setItem("currentDocumentSection", title)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_single_document']));
  }

}
