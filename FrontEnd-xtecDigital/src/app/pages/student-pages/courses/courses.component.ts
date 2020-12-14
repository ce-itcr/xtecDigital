import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'student_courses-cmp',
    moduleId: module.id,
    templateUrl: 'courses.component.html'
})

export class CoursesComponent implements OnInit{

    constructor(private router:Router, private CS: CommunicationService){}

    ngOnInit(){
      this.CS.getStudentCourses().subscribe(res => {
        var cont = 0;
        while(cont < res.length){
          var data = JSON.parse(res[cont]);
          var semester = [];
          var courses = [];

          semester.push(data["semester"]);
          var coursesCont = 0;

          var dataCourses = data["courses"];

          while(coursesCont < dataCourses.length){
            var course = [];
            var readCourse = data["courses"][coursesCont];
            course.push(readCourse[0]);
            course.push(readCourse[1]);
            courses.push(course);
            coursesCont ++;
          }
          semester.push(courses);
          this._courses.push(semester);
          cont ++;
        }
      }, error => {
        alert("ERROR");
      });
    }

    goToCourse(code, name, semester){

      var year = this.getSemester(semester);
      var period = this.getPeriod(semester);
      var groupNum = this.getGroup(name);

      localStorage.setItem("currentCourseName", name);
      localStorage.setItem("currentCourse", code);
      localStorage.setItem("currentYear", year);
      localStorage.setItem("currentPeriod", period);
      localStorage.setItem("currentGroup", groupNum);

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['course']));

    }

    getSemester(semester: string){
      return semester.slice(11,15);
    }

    getPeriod(semester: string){
      return semester.slice(9,10);
    }

    getGroup(courseName: string){
      return courseName.slice(courseName.length-1,courseName.length);
    }

    public _courses = [];




}
