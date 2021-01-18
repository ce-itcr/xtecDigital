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

  //SEND COURSE_ID, COURSE_NAME, COURSE_CREDITS, COURSE_CAREER TO CREATE A COURSE
  public createCourse(courseId ,name, credits, career){
    this.CS.createCourse(courseId, name, credits, career).subscribe(res => {
      this.CS.getAdminCourses(true);
    }, error => {
      alert("ERROR");
    });
    //this.router.navigateByUrl("/admin_profile");
  }

  //SEND COURSE_ID, COURSE_NAME, COURSE_CREDITS, COURSE_CAREER TO UPDATE A COURSE
  public updateCourse(courseId, name, credits, career){
    this.CS.updateCourse(courseId, name, credits, career).subscribe(res => {
      this.CS.getAdminCourses(true);
    }, error => {
      alert("ERROR");
    });
  }

  //SEND COURSE_ID, COURSE_AVAILABILITY TO CHANGE COURSE AVAILABILITY
  public deleteCourse(courseId, available){
    this.CS.deleteCourse(courseId, available).subscribe(res => {
      this.CS.getAdminCourses(true);
    }, error => {
      alert("ERROR");
    });
    //this.router.navigateByUrl("/admin_profile");
  }

  //OPEN COMPONENT MODALS
  openModal(content){ this.modal.open(content,{size:'sm', centered:true});}

}
