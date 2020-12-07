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
    this.fullName = "Student Student";
    this.img_url = "../../../../assets/img/default-avatar.png";
    this.userName = "student";
    this.userCarnet = "2020000000"
    this.userPassword = "student";
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
  userCarnet;
  activitiesLength = 0;

  public sidebarColor: string = "white";
  public sidebarActiveColor: string = "danger";

  public state: boolean = true;

  changeSidebarColor(color){
    var sidebar = <HTMLElement>document.querySelector('.sidebar');

    this.sidebarColor = color;
    if(sidebar != undefined){
        sidebar.setAttribute('data-color',color);
    }
  }

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

  //SE AÑADEN LOS ÍCONOS A LA INTERFAZ
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

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
