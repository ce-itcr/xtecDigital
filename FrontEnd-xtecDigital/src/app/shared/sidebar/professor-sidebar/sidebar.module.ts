import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfessorSidebarComponent } from './sidebar.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ ProfessorSidebarComponent ],
    exports: [ ProfessorSidebarComponent ]
})

export class ProfessorSidebarModule {}
