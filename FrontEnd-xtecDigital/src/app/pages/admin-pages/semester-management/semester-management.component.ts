import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';
import { Alert } from 'bootstrap';

@Component({
  selector: 'app-semester-management',
  templateUrl: './semester-management.component.html',
  moduleId: module.id
})
export class SemesterManagementComponent implements OnInit {

  constructor(private modal:NgbModal, private CS: CommunicationService) { }

  semesterYear;
  semesterPeriod;
  selectedCourse;
  selectedStudents = [];
  teacher = [];
  number = "";

  cont = 0;
  closeModal = false;

  semesterCourses = [];
  semesterData = [];

  courses = [];
  students = [];

  ngOnInit(): void {
    this.CS.getSemesterCourses().subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        data.push(res[cont]["id"]);
        data.push(res[cont]["name"]);
        this.courses.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR")
    });
    this.CS.getSemesterStudents().subscribe(res => {
      this.students = res;
    }, error => {
      alert("ERROR")
    });
  }

  openModal(content){ 
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'sm', centered:true});
    }
  }

  semesterInfo(year, period){
    this.semesterYear = year;
    this.semesterPeriod = period;
  }

  courseOnCheck(course){
    this.cont = 0;
    if(this.includes(course)){
      this.deleteCourses(course);
      this.closeModal = true;
    }else{
      this.selectedCourse = course;
      this.modal.activeInstances
    }
  }
  groupInfo(teacher1, teacher2, number){
    this.teacher = [];
    if((teacher1 != "" || teacher2 != "") && number != ""){
      if(teacher2 == ""){
        this.teacher.push(teacher1);
      }else if(teacher1 == ""){
        this.teacher.push(teacher2);
      }else{
        this.teacher.push(teacher1, teacher2);
      }
      this.number = number;
    }else{
      alert("Ingrese valores válidos");
    }
  }

  studentsOnCheck(item){
    this.selectedStudents.push(item);
  }

  addNewCourse(){
    var data = [];
    data.push(this.selectedCourse, this.teacher, this.number, this.selectedStudents);
    this.semesterCourses.push(data);
    this.erase();
  }

  createSemester(){
    this.semesterData.push(this.semesterPeriod, this.semesterYear, this.semesterCourses);
    console.log(this.semesterData);
    this.semesterYear = "";
    this.semesterPeriod = "";
    this.semesterCourses = [];
  }

  erase(){
    this.selectedStudents = [];
  }

  includes(courseCode){
    while(this.cont < this.semesterCourses.length){
      if(courseCode == this.semesterCourses[this.cont][0]){
        return true;
      }
      this.cont++;
    }
    return false;
  }

  deleteCourses(course){
    while(this.includes(course)){
      this.semesterCourses = this.semesterCourses.slice(0,this.cont).concat(this.semesterCourses.slice(this.cont+1,this.semesterCourses.length));
      this.cont = 0;
    }
  }

}
//this.selectedCourses = this.selectedCourses.slice(0,slice).concat(this.selectedCourses.slice(slice+1,this.selectedCourses.length));