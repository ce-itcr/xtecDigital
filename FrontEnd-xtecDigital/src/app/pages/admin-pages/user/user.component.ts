import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';
import { Alert } from 'bootstrap';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
  userImage = "";
  userFullName = "Usuario por Defecto";
  username = localStorage.getItem("current_username");

  constructor(private modal:NgbModal, private router: Router, private CS: CommunicationService){
  }
    ngOnInit(){
      //SET ADMIN INFO
      this.refresh();
      this.userFullName = "Administrador";
      this.userImage = "../../../../assets/img/default-avatar.png"
      this.username = "admin"
    }

    //OPEN COMPONENT MODALS
    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

    //REFRESH SEMESTERS TABLE
    refresh(){
      if(globalThis.flag == 1){
        this.router.navigateByUrl("/admin_coursesManagement");
        globalThis.flag = 0;
      }else if(globalThis.flag == 2){
        this.router.navigateByUrl("/admin_semesterManagement");
        globalThis.flag = 0;
      }
    }

}
