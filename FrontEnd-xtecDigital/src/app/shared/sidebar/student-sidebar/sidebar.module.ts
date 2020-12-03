import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentSidebarComponent } from './sidebar.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ StudentSidebarComponent ],
    exports: [ StudentSidebarComponent ]
})

export class StudentSidebarModule {}
