import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

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
      if(localStorage.getItem("flag") == "1"){
        this.router.navigateByUrl("/admin_coursesManagement");
        localStorage.setItem("flag","0");
      }
      this.userFullName = "Administrador";
      this.userImage = "../../../../assets/img/default-avatar.png"
      this.username = "admin"
    }

    //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}


}
