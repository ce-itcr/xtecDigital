import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'student_courses-cmp',
    moduleId: module.id,
    templateUrl: 'courses.component.html'
})

export class CoursesComponent implements OnInit{

    constructor(private router:Router){}

    ngOnInit(){}

    test(name){
      //alert(name);
      //localStorage.setItem("currentCourseId", id);
      localStorage.setItem("currentCourseName", name);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['course']));
    }


    public _courses = [[["SEMESTRE 2 2020", "2020-09-09"], "CIRCUITOS EN CORRIENTE ALTERNA GRUPO 3","BASES DE DATOS GRUPO 2"],
                       [["SEMESTRE 1 2020", "2020-09-09"], "CIRCUITOS EN CORRIENTE ALTERNA GRUPO 3","BASES DE DATOS GRUPO 2","ELEMENTOS ACTIVOS GRUPO 2"],
                       [["VERANO 2019-2020", "2020-09-09"], "CIRCUITOS EN CORRIENTE ALTERNA GRUPO 3"],
                       [["SEMESTRE 2 2019", "2020-09-09"], "CIRCUITOS EN CORRIENTE ALTERNA GRUPO 3","BASES DE DATOS GRUPO 2","ELEMENTOS ACTIVOS GRUPO 2","ARTES DRAMATICAS GRUPO 2"]]



}
