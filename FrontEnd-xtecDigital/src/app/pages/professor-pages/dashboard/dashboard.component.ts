import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';


@Component({
    selector: 'professor_dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

    constructor(private router:Router){}
    ngOnInit(){}

    toSingleCourse(name){
      localStorage.setItem("currentCourseName", name);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['professor_course']));
    }


    public _courses = [[["SEMESTRE 2 2020", "2020-09-09"], "CIRCUITOS EN CORRIENTE ALTERNA GRUPO 3","BASES DE DATOS GRUPO 2"],
                       [["SEMESTRE 1 2020", "2020-09-09"], "LENGUAJES COMPILADORES E INTERPRETES GRUPO 3","SEMINARIO DE ESTUDIOS COSTARRICENSES GRUPO 2","ELEMENTOS ACTIVOS GRUPO 2"]]



}
