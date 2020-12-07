import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'bootstrap';

@Component({
  selector: 'app-semester-management',
  templateUrl: './semester-management.component.html',
  moduleId: module.id
})
export class SemesterManagementComponent implements OnInit {

  constructor(private modal:NgbModal) { }

  semesterYear;
  semesterPeriod;
  selectedCourse;
  selectedStudents = [];
  teacher = [];
  number = "";

  semesterCourses = [];
  semesterData = [];

  courses = [["CE3105", "Lenguajes"],["CE2121","Datos 1"],["EL2323", "CC"],["MA2103","Cálculo Diferencial"],["CS4567", "Seminario EC"]];
  students = ["2020202020","2020202021","2020202022","2020202023","2020202024","2020202025","2020202026","2020202027","2020202028"];

  ngOnInit(): void {
  }

  openModal(content){ this.modal.open(content,{size:'sm', centered:true});}

  semesterInfo(year, period){
    this.semesterYear = year;
    this.semesterPeriod = period;
  }

  courseOnCheck(item){
    this.selectedCourse = item;
  }

  groupInfo(teacher1, teacher2, number){
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
    this.selectedCourse = "";
    this.selectedStudents = [];
    this.teacher = [];
    this.number = "";
  }
}
//this.selectedCourses = this.selectedCourses.slice(0,slice).concat(this.selectedCourses.slice(slice+1,this.selectedCourses.length));