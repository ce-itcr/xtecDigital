import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

    constructor(private CS: CommunicationService) { 
        this.CS.reset();
    }

    ngOnInit(){
    }
}
