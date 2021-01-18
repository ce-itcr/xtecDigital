import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
  selector: 'app-semester-management',
  templateUrl: './semester-management.component.html',
  moduleId: module.id
})
export class SemesterManagementComponent implements OnInit {

  constructor(private modal:NgbModal, private CS: CommunicationService, private router: Router) { }

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
    var x = [1,2,3,4,5];
    //FILL SEMESTER COURSES (AVAILABILITY ON)
    this.CS.getSemesterCourses().subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        if(res[cont]["available"] == "Habilitado"){
          data.push(res[cont]["id"]);
          data.push(res[cont]["name"]);
          this.courses.push(data);
        }
        cont++;
      }
    }, error => {
      alert("ERROR")
    });
    //FILL SEMESTER STUDENTS
    this.CS.getSemesterStudents().subscribe(res => {
      this.students = res;
    }, error => {
      alert("ERROR")
    });
  }

  //OPEN COMPONENT MODALS
  openModal(content){ 
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'sm', centered:true});
    }
  }

  //SET SEMESTER INFO
  semesterInfo(year, period){
    this.semesterYear = year;
    this.semesterPeriod = period;
  }

  //SET COURSES ON CHECK (COURSES THAT ALREADY HAVE INFO)
  courseOnCheck(course){
    this.selectedStudents = [];
    this.cont = 0;

    this.CS.getSemesterStudents().subscribe(res => {
      this.students = res;
      if(this.includes(course)){
        this.deleteCourses(course);
        this.closeModal = true;
      }else{
        this.selectedCourse = course;
        this.modal.activeInstances
      }
    }, error => {
      alert("ERROR")
    });
  }

  //SET GROUP INFO (TEACHER(S) AND GROUP NUMBER)
  groupInfo(teacher1, teacher2, number){
    this.teacher = [];
    this.putOutStudents();
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

  //SET STUDENTS ON CHECK (STUDENTS THAT ALREADY HAVE GROUP)
  studentsOnCheck(item){
    this.selectedStudents.push(item);
  }

  //SET NEW COURSE IN INFO ARRAY TO SEND DATA
  addNewCourse(){
    var data = [];
    data.push(this.selectedCourse, this.teacher, this.number, this.selectedStudents);
    this.semesterCourses.push(data);
  }

  //SEND ALL SETTED DATA TO CREATE A NEW SEMESTER
  createSemester(){
    this.semesterData.push(this.semesterPeriod, this.semesterYear, this.semesterCourses);
    console.log(this.semesterData);
    this.CS.sendNewSemester(this.semesterData[1], this.semesterData[0], this.semesterData[2]).subscribe(res => {
      this.semesterYear = "";
      this.semesterPeriod = "";
      this.semesterCourses = [];
      this.CS.getAdminSemesters(true);
    }, error => {
      alert("ERROR SEMESTER");
    });
  }

  //VERIFY IF SEMESTER COURSES CONTAINS A COURSE CODE
  includes(courseCode){
    while(this.cont < this.semesterCourses.length){
      if(courseCode == this.semesterCourses[this.cont][0]){
        return true;
      }
      this.cont++;
    }
    return false;
  }

  //DELETE COURSES IN SEMESTER COURSES ARRAY
  deleteCourses(course){
    while(this.includes(course)){
      this.semesterCourses = this.semesterCourses.slice(0,this.cont).concat(this.semesterCourses.slice(this.cont+1,this.semesterCourses.length));
      this.cont = 0;
    }
  }

  //PUT OUT STUDENTS THAT ALREADY HAVE A GROUP IN A COURSE
  putOutStudents(){
    var cont = 0;
    while(cont < this.selectedStudents.length){
      if(this.students.includes(this.selectedStudents[cont])){
        var slice = this.students.indexOf(this.selectedStudents[cont]);
        this.students = this.students.slice(0,slice).concat(this.students.slice(slice+1,this.students.length));
      }
      cont++;
    }
  }

  //SEND FILE PATH TO API TO CREATE A SEMESTER WITH EXCEL FILE
  addSemesterByExcel(file){
    var url = "C:/Users/Usuario/Desktop/xTecDigitalFE/xtecDigital/FrontEnd-xtecDigital/src/assets/semesters/" + file.slice(12);
    this.CS.createSemesterByExcel(url).subscribe(res => {
      this.CS.getAdminSemesters(true);
    }, error => {
      alert("ERROR")
    });
  }

}