import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'student_profile-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

  constructor(private modal:NgbModal, private CS: CommunicationService){}

  ngOnInit(){
    this.fullName = "Profesor Profesor";
    this.img_url = "../../../../assets/img/default-avatar.png";
    this.userName = "profesor";
    this.userId = "301230123"
    this.userPassword = "profesor";
    this.cellPhone = "88888888";
    this.userMail = "user@gmail.com";
    this.nationality = "Costarricense";
    this.birthDate = "28-02-2020";
  }

  public imagePath;
  imgURL: any;
  public message: string;

  img_url;
  fullName;
  userMail;
  cellPhone;
  birthDate;
  nationality;
  userPassword;
  userName;
  userId;
  activitiesLength = 0;

  public sidebarColor: string = "white";
  public sidebarActiveColor: string = "danger";

  public state: boolean = true;


  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

  //SE ENVÍAN DATOS ACTUALIZADOS DE USUARIO
  public updateData(password, phone, address, url){
    var imgUrl;
    if(url==""){
      imgUrl = this.img_url;
    }else{
      imgUrl = "../../assets/img/faces/";
      imgUrl = imgUrl + url.slice(12);
    }
    var user = localStorage.getItem('current_username');
    var age = 21;
    this.CS.sendProfileDataToUpdate(this.userName, this.fullName, password, phone, address, this.nationality, this.birthDate, imgUrl).subscribe(
      res => {
        this.ngOnInit();
        alert("Se han actualizado sus datos");
      }, error => {
        alert("Error al actualizar sus datos");
      }
    );
  }


}
