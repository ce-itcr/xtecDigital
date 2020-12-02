import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
  userImage = "";
  userFullName = "Usuario por Defecto";
  username = localStorage.getItem("current_username");

  constructor(private modal:NgbModal){}
    ngOnInit(){
      this.userFullName = "Administrador";
      this.userImage = "../../../../assets/img/default-avatar.png"
      this.username = "admin"
    }

    //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
    openModal(content){ this.modal.open(content,{size:'sm', centered:true});}


}
