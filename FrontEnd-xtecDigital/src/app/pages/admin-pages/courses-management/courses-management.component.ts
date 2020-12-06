import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
  selector: 'app-courses-management',
  moduleId: module.id,
  templateUrl: './courses-management.component.html',
})

export class CoursesManagementComponent implements OnInit {

  constructor(private modal:NgbModal, private router: Router, private CS: CommunicationService) { 
  }

  ngOnInit(): void {
    
  }

  public createCourse(name, credits, career){
    localStorage.setItem("flag","1");
    this.CS.getAdminCourses();
    this.router.navigateByUrl("/admin_profile");
  }

  public updateCourse(courseId, name, credits, career){
    localStorage.setItem("flag","1");
    this.CS.getAdminCourses();
    this.router.navigateByUrl("/admin_profile");
  }

  public deleteCourse(courseId){
    localStorage.setItem("flag","1");
    this.CS.getAdminCourses();
    this.router.navigateByUrl("/admin_profile");
  }

  openModal(content){ this.modal.open(content,{size:'sm', centered:true});}

}
