import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'professor_dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

    constructor(private router:Router, private CS: CommunicationService){}
    ngOnInit(){
      //GET CURRENT TEACHER COURSES
      this.CS.getTeacherCourses().subscribe(res => {
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

    public _courses = [];

    toSingleCourse(name){
      localStorage.setItem("currentCourseName", name);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['professor_course']));
    }

    //GO TO TEACHER COURSE
    goToCourse(code, name, semester){

      var year = this.getSemester(semester);
      var period = this.getPeriod(semester);
      var groupNum = this.getGroup(name);

      localStorage.setItem("currentUser", "10001000");
      localStorage.setItem("currentCourseName", name);
      localStorage.setItem("currentCourse", code);
      localStorage.setItem("currentYear", year);
      localStorage.setItem("currentPeriod", period);
      localStorage.setItem("currentGroup", groupNum);

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['professor_course']));

    }

    //GET CURRENT SEMESTER
    getSemester(semester: string){
      return semester.slice(11,15);
    }

    //GET CURRENT PERIOD
    getPeriod(semester: string){
      return semester.slice(9,10);
    }

    //GET CURRENT GROUP
    getGroup(courseName: string){
      return courseName.slice(courseName.length-1,courseName.length);
    }

}
