import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html'
})
export class GradesComponent implements OnInit {

  constructor(private CS: CommunicationService) { }

  ngOnInit(): void {
    this.userType();
    if(localStorage.getItem("current_username").length == 10){
      this.CS.studentGrades().subscribe(res => {
        var cont = 0;
        while(cont<res.length){
          var data = [];
          data.push(res[cont]["Rubro"]);
          data.push(res[cont]["Assignment"]);
          data.push(res[cont]["APercentage"]);
          data.push(res[cont]["Grade"]);
          this.rows.push(data);
          cont++;
        }
      }, error => {
        alert("ERROR");
      });
    }else{
      this.CS.teacherGrades().subscribe(res => {
        var cont = 0;
        while(cont<res.length){
          var data = [];
          data.push(res[cont]["Student"]);
          data.push(res[cont]["RPercentage"]);
          data.push(res[cont]["AName"]);
          data.push(res[cont]["APercentage"]);
          data.push(res[cont]["Grade"]);
          this.rows.push(data);
          cont++;
        }
      }, error => {
        alert("ERROR");
      })
    }
    
  }

  titles = [];
  message = "";

  userType(){
    if(localStorage.getItem("current_username").length == 10){
      this.titles = [["Valor de Rubro", "Asignación", "Valor de asignación", "Nota"]];
      this.message = "Tus de notas";
    }else{
      this.titles = [["Estudiante" ,"Valor de Rubro", "Asignación", "Valor de asignación", "Nota"]];
      this.message = "Reporte de notas";
    }
  }
  
  rows = [];

}
