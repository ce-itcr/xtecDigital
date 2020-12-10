import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';
import {Md5} from 'ts-md5/dist/md5';


@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent{
  constructor(private router: Router, private CS:CommunicationService) {
    localStorage.setItem("flag","0");
    /*this.CS.getAdminCourses().subscribe(res => {
      this.CS.getAdminCourses().subscribe(res => {
        var data = []
        var cont = 0;
        while(cont < res.length){
          data.push(res[cont]);
          cont++;
        }
        localStorage.setItem("adminCourses",JSON.stringify(data));
      }, error => {
        alert("ERROR");
      });
    }, error => {
      alert("ERROR");
    });*/
  }

  //SE NAVEGA HACIE EL COMPONENTE "DASHBOARD" DE ADMINISTRADOR
  toAdminLayout(){
    localStorage.setItem("accountType", "ADMIN");
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['admin_semesterManagement']));
  }

  //SE NAVEGA HACIE EL COMPONENTE "DASHBOARD" DE PROFESOR
  toProfessorLayout(){
    localStorage.setItem("accountType", "PROFESSOR");
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['professor_dashboard']));
  }

    //SE NAVEGA HACIE EL COMPONENTE "DASHBOARD" DE ESTUDIANTE
  toStudentLayout(){
    localStorage.setItem("accountType", "STUDENT");
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

  testMD5(password){
    let e = Md5.hashStr("HI");
    alert(password + Md5.hashStr(password));
  }

}
