import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'student_rubros-cmp',
    moduleId: module.id,
    templateUrl: 'rubros.component.html'
})

export class RubrosComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService, private modal:NgbModal) {}

  ngOnInit(){
    this.rubros = [];
    this.courseName = localStorage.getItem("currentCourseName");
    this.currentUser = localStorage.getItem("current_username");
    //FILL COURSE RUBROS INFO 
    this.CS.getRubros().subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        data.push(res[cont]["rubro"]);
        data.push(res[cont]["percentage"] + "%");
        this.rubros.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    });
  }

  courseName;
  closeModal = false;
  currentUser;
  rubros = [];
  lastRubro;
  lastPercentage;

  n = new Date();
  date = this.n.getFullYear() + "/" + (this.n.getMonth() + 1) + "/" + this.n.getDate();

  //SET CURRENT LAST RUBRO INFO
  lastRubroInfo(rubro, percentage){
    this.lastRubro = rubro;
    this.lastPercentage = percentage;
  }

  //GO TO ASSIGNMENTS COMPONENT
  toAssignmentSection(title){
    localStorage.setItem("currentRubroSection", title)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['student_assignments']));
  }

}
