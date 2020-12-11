import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'assignments-cmp',
    moduleId: module.id,
    templateUrl: 'assignments.component.html'
})

export class AssignmentsComponent implements OnInit{

  constructor(private router:Router, private modal: NgbModal){}

  ngOnInit(){
    this.courseName = localStorage.getItem("currentCourseName");
    //this.populateDocs("PROYECTOS");
  }

  courseName;
  singleAssignment;
  closeModal = false;
  assignments = [["QUICES","30",[]],
                 ["EXAMENES","30",[[["Examen 1","15"],["Examen 2","15"]]]],
                 ["PROYECTOS","40",[["Proyecto 1","20"],["Proyecto 2","10"],["Proyecto 3","10"]]]
                ]

  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'sm', centered:true});
    }
  }

  populateDocs(name){
    for(var i=0; i<this.assignments.length; i++){
      if(name == this.assignments[i][0]){
        console.log(this.assignments[i][2]);
        this.singleAssignment = this.assignments[i][2];
        break;
      }
    }
  }

  downloadFile(document){
    alert(document);
  }

}
