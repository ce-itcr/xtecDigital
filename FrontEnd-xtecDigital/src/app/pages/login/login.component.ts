import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent{
  constructor(private router: Router, private CS:CommunicationService) {}

  //SE NAVEGA HACIE EL COMPONENTE "DASHBOARD" DE ADMINISTRADOR
  toAdminLayout(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['admin_dashboard']));
  }

  //SE NAVEGA HACIE EL COMPONENTE "DASHBOARD" DE PROFESOR
  toProfessorLayout(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['professor_dashboard']));
  }

    //SE NAVEGA HACIE EL COMPONENTE "DASHBOARD" DE ESTUDIANTE
  toStudentLayout(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_dashboard']));
  }

  //VERIFICA QUE LOS DATOS INGRESADOS PERTENEZCAN A UN USUARIO REGISTRADO
  //POSTERIORMENTE SE ENVÍA AL COMPONENTE RESPECTIVO
  //RECIBE: NOMBRE DE USUARIO Y CONTRASEÑA, RESPECTIVAMENTE
  verifyLogin(username, password){
    localStorage.setItem('current_username', username);
    localStorage.setItem("current_password", password);
    this.CS.verifyUser(username, password).subscribe(
      res => {
        if(res['userType'] == 'Admin'){
          this.router.navigateByUrl('/dashboard');
        }
        else if(res['userType'] == 'Professor'){
          this.router.navigateByUrl('/dashboard');
        }
        else if(res['userType'] == 'Student'){
          this.router.navigateByUrl('/dashboard');
        }
        else{
          alert(res);
        }
      },
      error => {
        alert("Nombre de usuario o contraseña incorrectos");
      }
    )
  }

}
