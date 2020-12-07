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

    test(id,name){
      //alert(id);
      localStorage.setItem("currentCourseId", id);
      localStorage.setItem("currentCourseName", name);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['course']));
    }


    public courses = [
      {
        title: 'SEMESTRE 2 2020',
        children: [
          {
            title: 'CIRCUITOS EN CORRIENTE ALTERNA GRUPO 3',
            id: "S2-2020-EL2114.3",
            children: []
          },
          {
            title: 'BASES DE DATOS GRUPO 2',
            id: "S2-2020-CE3101.2",
            children: []
          },
        ]
      },
      {
        title: 'SEMESTRE 1 2020',
        children: [
          {
            title: 'CIRCUITOS EN CORRIENTE CONTINUA GRUPO 3',
            id: "S1-2020-EL2113.3",
            children: []
          },
          {
            title: 'LENGUAJE, COMPILADORES E INTERPRETES GRUPO 2',
            id: "S1-2020-CE3104.2",
            children: []
          },
          {
            title: 'ECUACIONES DIFERENCIALES GRUPO 1',
            id: "S1-2020-MA2105.1",
            children: []
          },
        ]
      },
      {
        title: 'SEMESTRE 2 2019',
        children: [
          {
            title: "FISICA GENERAL GRUPO 5",
            id: "S2-2019-FI1102.5",
            children: []
          }
        ]
      },
      {
        title: 'SEMESTRE 1 2019',
        children: [
          {
            title: "ALGORITMOS Y ESTRUCTURAS DE DATOS II GRUPO 1",
            id: "S1-2019-CE2103.1",
            children: []
          }
        ]
      },
    ];

}
