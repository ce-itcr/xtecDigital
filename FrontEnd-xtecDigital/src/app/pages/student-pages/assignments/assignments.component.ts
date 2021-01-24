import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'professor_assignments-cmp',
    moduleId: module.id,
    templateUrl: 'assignments.component.html'
})

export class AssignmentsComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService, private modal:NgbModal) {}

  ngOnInit(){

    this.files = [];

    this.courseName = localStorage.getItem("currentCourseName");
    this.currentRubroSection = localStorage.getItem("currentRubroSection");
    //GET STUDENT ASSIGNMENTS
    this.CS.getAssignments().subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        data.push(res[cont]["APercentage"] + "%");
        data.push(res[cont]["AName"]);
        data.push(res[cont]["DueDate"].slice(0,10) + " Hora: " + res[cont]["DueTime"]);
        data.push(res[cont]["ADesc"]);
        data.push(res[cont]["ALink"]);
        this.files.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    })

  }

  courseName;
  currentRubroSection;
  currentFileName;
  currentAssignment;
  grade;
  feedbackLink;
  files = [];

  n = new Date();
  date = this.n.getFullYear() + "/" + (this.n.getMonth() + 1) + "/" + this.n.getDate();


  closeModal = false;
  public imagePath;

  //OPEN COMPONENT MODALS
  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'md', centered:true});
    }
  }

  //OPEN A WINDOW WITH URL
  onNavigate(url){
    window.location.href=url;
  }

  //SET CURRENT ASSIGMENT
  public assignment(assignment){
    this.currentAssignment = assignment;
  }

  //UPLOAD ASSIGNMENT (DRIVE'S LINK)
  public uploadAssignment(url){
    this.CS.uploadAssignment(url, this.currentRubroSection, this.currentAssignment).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  //GET ASSIGNMENT FEEDBACK
  getFeedback(assignment){
    this.CS.getFeedback(assignment).subscribe(res => {
      this.grade = res[0]["grade"];
      this.feedbackLink = res[0]["url"];
    }, error => {
      alert("ERROR")
    });
  }

}

