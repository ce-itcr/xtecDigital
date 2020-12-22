import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'professor_rubros-cmp',
    moduleId: module.id,
    templateUrl: 'rubros.component.html'
})

export class RubrosComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService, private modal:NgbModal) {}

  ngOnInit(){
    this.rubros = [];
    this.courseName = localStorage.getItem("currentCourseName");
    this.currentUser = localStorage.getItem("currentUser");
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

  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'sm', centered:true});
    }
  }

  lastRubroInfo(rubro, percentage){
    this.lastRubro = rubro;
    this.lastPercentage = percentage;
  }

  toAssignmentSection(title){
    localStorage.setItem("currentRubroSection", title)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['professor_assignments']));
  }

  createRubro(rubro, percentage){
    this.CS.createRubro(rubro, percentage).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  updateRubro(rubro, percentage){
    this.CS.updateRubro(this.lastRubro, rubro, percentage).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  deleteRubro(rubro){
    this.CS.deleteRubro(rubro).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

}
