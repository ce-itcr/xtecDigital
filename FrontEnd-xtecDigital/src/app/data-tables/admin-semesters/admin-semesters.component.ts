import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AdminSemestersDataSource, AdminSemestersItem } from './admin-semesters-datasource';

@Component({
  selector: 'admin-semesters',
  templateUrl: './admin-semesters.component.html',
  styleUrls: ['./admin-semesters.component.css']
})
export class AdminSemestersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminSemestersItem>;
  dataSource: AdminSemestersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['year', 'period', 'courses'];

  ngOnInit() {
    this.dataSource = new AdminSemestersDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
