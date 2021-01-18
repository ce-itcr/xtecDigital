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
    this.rubroPercentage = localStorage.getItem("currentRubroPercentage");
    this.students = [];
    this.percentages = [];
    //FILL FILES ARRAY TO COMPONENT DATA
    this.CS.getAssignments().subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        data.push(res[cont]["APercentage"] + "%");
        this.percentages.push(res[cont]["APercentage"])
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
    //GET STUDENTS TO CREATE WORKGROUPS
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

  percentages = [];
  rubroPercentage;
  flag = 0;

  files = [];
  students = []; 
  workGroup = [];
  groupNum = 1;

  n = new Date();
  date = this.n.getFullYear() + "/" + "0" + (this.n.getMonth() + 1) + "/" + this.n.getDate();


  closeModal = false;
  public imagePath;

  //OPEN COMPONENT MODALS
  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      if(this.flag == 0){
        this.modal.open(content,{size:'md', centered:true});
      }else{
        this.flag = 0;
      }
      
    }
  }

  //SEND NAME, START DATE, PERCENTAGE, TIME, FINAL_DATE, DESCRIPTION AND LINK TO CREATE ASSIGNMENT
  createAssignment(name, started, percentage, time, date, desc, link){
    var cont = 0;
    var result = 0;
    while(cont < this.percentages.length){
      result += parseInt(this.percentages[cont]);
      cont++;
    }
    result += parseInt(percentage);
    if(result <= parseInt(this.rubroPercentage)){
      this.currentAssignment = name;
      this.CS.createAssignment(name, started, percentage, time+":00", date, desc, link).subscribe(res => {
        this.ngOnInit();
      }, error => {
        alert("ERROR");
      });
    }else{
      this.flag = 1;
      alert("Las asignaciones no pueden exceder el porcentage del rubro (" + this.rubroPercentage + ")")
    }
  }

  //SEND NAME TO DELETE ASSIGNMENT
  deleteAssignment(name){
    this.CS.deleteAssignment(name).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    })
  }

  //OPEN A WINDOW WITH URL
  onNavigate(url){
    window.location.href=url;
  }

  //GET STUDENTS THAT ALREADY UPLOADED THE ASSIGNMENT
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

  //SET CURRENT STUDENT (TO UPLOAD FEEDBACK)
  currentStudent(group){
    this.currentGroup = group;
  }

  //UPLOAD FEEDBACK TO STUDENT
  uploadFeedback(url, grade){
    this.CS.uploadFeedback(this.currentGroup ,this.currentAssignment, url, grade).subscribe(res => {
      alert(res);
    }, error => {
      alert("ERROR");
    });
  }

  //SET STUDENTS THAT ALREADY HAVE A WORKGROUP
  studentsOnCheck(student){
    this.workGroup.push(student);
  }

  //ADD NEW WORKGROUP
  addGroup(){
    this.CS.createWorkGroup(this.groupNum, this.currentAssignment, this.workGroup, this.currentRubroSection).subscribe(res => {
      this.groupNum ++;
      this.deleteStudents();
      this.workGroup = [];
    }, error => {
      alert("Error")
    });
  }

  //SET ALL STUDENTS IN INDIVIDUAL GROUPS
  individualAssignment(){
    this.CS.createIndividualAssignemnt(this.currentAssignment, this.students, this.currentRubroSection).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("Error")
    });
  }

  //DELETE STUDENTS THAT ALREADY HAVE WORKGROUP
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

  //RESET GROUP NUMS WHEN ALL GROUPS HAVE CREATED
  countReset(){
    this.groupNum = 1;
  }

  //SHOW GRADES TO ALL STUDENTS
  showGrades(){
    this.CS.showGrades(this.currentAssignment, this.date, this.getHour()).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  //GET HOUR
  public getHour(){

    var n = new Date();
    var hour = "";

    if(n.getHours()[0] == "0"){
      hour += n.getHours()[1];
    }else{
      hour += n.getHours();
    }

    hour += ":";

    if(n.getMinutes()[0] == "0"){
      hour += n.getMinutes()[1];
    }else{
      hour += n.getMinutes();
    }

    hour += ":";

    if(n.getSeconds()[0] == "0"){
      hour += n.getSeconds()[1];
    }else{
      hour += n.getSeconds();
    }
    return hour;
  }

}

