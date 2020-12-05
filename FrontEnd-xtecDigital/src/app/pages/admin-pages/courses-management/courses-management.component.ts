import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AdminCoursesDataSource} from '../../../data-tables/admin-courses/admin-courses-datasource'

@Component({
  selector: 'app-courses-management',
  moduleId: module.id,
  templateUrl: './courses-management.component.html',
})

export class CoursesManagementComponent implements OnInit {

  constructor(private modal:NgbModal, private router: Router) { 
  }

  teachDS: any;

  ngOnInit(): void {
    if(globalThis.flag == 0){
      globalThis.adminCourses = [
        {id: "MA0101", name: 'Matemática General', credits: 2, hours: 5}
      ];
    }
  }

  public deleteCourse(){
    globalThis.flag = 1;
    globalThis.adminCourses = [
                                {id: "MA0101", name: 'Matemática General', credits: 2, hours: 5},
                                {id: "MA1403", name: 'Matemática Discreta', credits: 4, hours: 4},
                                {id: "MA1102", name: 'Cálculo Diferencial', credits: 4, hours: 4},
                                {id: "MA1103", name: 'Cálculo y Álgebra Lineal', credits: 4, hours: 4},
                                {id: "MA2104", name: 'Cálculo Superior', credits: 4, hours: 4},
                                {id: "MA2105", name: 'Ecuaciones Diferenciales', credits: 4, hours: 4}
                              ];
    this.router.navigateByUrl("/admin_profile");
  }

  openModal(content){ this.modal.open(content,{size:'sm', centered:true});}

}
