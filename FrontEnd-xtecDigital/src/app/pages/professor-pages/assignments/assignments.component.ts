import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'professor_assignments-cmp',
    moduleId: module.id,
    templateUrl: 'assignments.component.html'
})

export class AssignmentsComponent implements OnInit{
  constructor(private router: Router, private CS:CommunicationService, private modal:NgbModal) {}

  ngOnInit(){

    this.files = [];

    this.courseName = localStorage.getItem("currentCourseName");
    this.currentRubroSection = localStorage.getItem("currentRubroSection");

    this.CS.getDocumentFiles(this.currentRubroSection).subscribe(res => {
      var cont = 0;
      while(cont < res.length){
        var data = [];
        data.push(res[cont]["name"]);
        data.push(res[cont]["date"].slice(0,10));
        data.push(res[cont]["url"]);
        this.files.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    })

  }

  courseName;
  currentRubroSection;
  currentFileName;

  files = [];

  n = new Date();
  date = this.n.getFullYear() + "/" + (this.n.getMonth() + 1) + "/" + this.n.getDate();


  closeModal = false;
  public imagePath;

  openModal(content){
    if(this.closeModal){
      this.closeModal = false;
    }else{
      this.modal.open(content,{size:'md', centered:true});
    }
  }

  createFile(name, url){
    var size = 50
    this.CS.createDocumentFile(this.currentRubroSection, name, this.date, size, url).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  deleteFile(name){
    this.CS.deleteDocumentFile(this.currentRubroSection, name).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    })
  }

  updateFile(name, url){
    this.CS.updateDocumentFile(this.currentRubroSection, name, url).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    })
  }

  asign(name){
    this.currentFileName = name;
  }

  onNavigate(url){
    window.location.href=url;
  }

}

