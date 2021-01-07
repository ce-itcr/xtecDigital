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
    this.CS.getAdminCourses(false);
    this.CS.getAdminSemesters(false);
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
    this.router.navigate(['student_courses']));
  }

  //VERIFICA QUE LOS DATOS INGRESADOS PERTENEZCAN A UN USUARIO REGISTRADO
  //POSTERIORMENTE SE ENVÍA AL COMPONENTE RESPECTIVO
  //RECIBE: NOMBRE DE USUARIO Y CONTRASEÑA, RESPECTIVAMENTE
  verifyLogin(username, password, type){
    localStorage.setItem('current_username', username);
    localStorage.setItem("current_password", password);
    
    if(type == "S"){
      this.CS.studentLogIn(username, password).subscribe(res => {
        alert(res["_id"] == 0);
        if(!(res["_id"] == 0)){
          localStorage.setItem("firstName", res["Name"]);
          localStorage.setItem("email", res["Email"]);
          localStorage.setItem("phoneNumber", res["PhoneNumber"]);
          localStorage.setItem("accountType", "STUDENT");
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['student_courses']));
        }
        else{
          alert("Usuario inexistente");
        }
      }, error => { 
        alert("Usuario inexistente");
      });
    }
    else if(type == "T"){
      this.CS.teacherLogIn(username, password).subscribe(res => {
        if(!(res["_id"] == 0)){
          localStorage.setItem("firstName", res["Name"]);
          localStorage.setItem("email", res["Email"]);
          localStorage.setItem("accountType", "PROFESSOR");
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['professor_dashboard']));
        }
        else{
          alert("Usuario inexistente");
        }
      }, error => {
        alert("Usuario inexistente");
      });
    }
    else if(type == "A"){
      if(username == "admin" && password == "admin"){
        localStorage.setItem("accountType", "ADMIN");
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['admin_semesterManagement']));
      }
      else{
        alert("Usuario inexistente");
      }
    }
  }

  testMD5(password){
    let e = Md5.hashStr("HI");
    alert(password + Md5.hashStr(password));
  }

}
