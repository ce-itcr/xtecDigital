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
    this.percentages = [];
    this.courseName = localStorage.getItem("currentCourseName");
    this.currentUser = localStorage.getItem("current_username");
    this.CS.getRubros().subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        data.push(res[cont]["rubro"]);
        data.push(res[cont]["percentage"] + "%");
        this.percentages.push(res[cont]["percentage"]);
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

  percentages = [];

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

  toAssignmentSection(title, percentage){
    localStorage.setItem("currentRubroSection", title);
    localStorage.setItem("currentRubroPercentage", percentage);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['professor_assignments']));
  }

  createRubro(rubro, percentage){
    var cont = 0;
    var result = 0;
    while(cont < this.percentages.length){
      result += parseInt(this.percentages[cont]);
      cont++;
    }
    result += parseInt(percentage);
    if(result <= 100){
      this.CS.createRubro(rubro, percentage).subscribe(res => {
        this.ngOnInit();
      }, error => {
        alert("ERROR");
      });
    }else{
      alert("Los rubros no pueden sumar más de 100%")
    }
    
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
