import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'professor_profile-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
  userImage = "";
  userFullName = "Usuario por Defecto";
  username = localStorage.getItem("current_username");

  constructor(private modal:NgbModal){}
    ngOnInit(){
      this.userFullName = "Professor";
      this.userImage = "../../../../assets/img/default-avatar.png"
      this.username = "professor"
    }

    //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
    openModal(content){ this.modal.open(content,{size:'ms', centered:true});}


}
