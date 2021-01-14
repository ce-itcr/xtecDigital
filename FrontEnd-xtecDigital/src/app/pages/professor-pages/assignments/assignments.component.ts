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
    this.students = [];
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
    this.CS.getGroupStudents().subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        this.students.push(res[cont]);
        cont++;
      }
    }, error => {
      alert("Error");
    });
  }

  courseName;
  currentRubroSection;
  currentFileName;

  currentStudentId;
  currentAssignment;
  currentGroup;

  files = [];
  students = []; 
  workGroup = [];
  groupNum = 1;

  n = new Date();
  date = this.n.getFullYear() + "/" + (this.n.getMonth() + 1) + "/" + this.n.getDate();


  closeModal = false;
  public imagePath;

  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'md', centered:true});
    }
  }

  createAssignment(name, started, percentage, time, date, desc, link){
    this.currentAssignment = name;
    this.CS.createAssignment(name, started, percentage, time+":00", date, desc, link).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  deleteAssignment(name){
    this.CS.deleteAssignment(name).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    })
  }

  onNavigate(url){
    window.location.href=url;
  }

  fillStudents(assignment){
    this.currentAssignment = assignment;
    this.CS.getStudentAssignments(assignment).subscribe(res => {
      this.students = [];
      var cont = 0;
      while(cont < res.length){
        var data = [];
        data.push(res[cont]["id"]);
        data.push(res[cont]["url"]);
        data.push(res[cont]["group"]);
        this.students.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    });
  }

  currentStudent(group){
    this.currentGroup = group;
  }

  uploadFeedback(url, grade){
    this.CS.uploadFeedback(this.currentGroup ,this.currentAssignment, url, grade).subscribe(res => {
      alert(res);
    }, error => {
      alert("ERROR");
    });
  }

  studentsOnCheck(student){
    this.workGroup.push(student);
  }

  addGroup(){
    alert(this.groupNum);
    alert(this.currentAssignment);
    alert(this.workGroup);
    this.CS.createWorkGroup(this.groupNum, this.currentAssignment, this.workGroup).subscribe(res => {
      this.groupNum ++;
      this.deleteStudents();
      this.workGroup = [];
    }, error => {
      alert("Error")
    });
  }

  individualAssignment(){
    this.CS.createIndividualAssignemnt(this.currentAssignment, this.students).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("Error")
    });
  }

  deleteStudents(){
    var cont = 0;
    var newList = [];
    while(cont<this.students.length){
      if(this.students.includes(this.workGroup[cont])){
        cont++;
      }else{
        newList.push(this.students[cont]);
        cont++;
      }
    }
    this.students = newList;
  }

  countReset(){
    this.groupNum = 1;
  }

}

