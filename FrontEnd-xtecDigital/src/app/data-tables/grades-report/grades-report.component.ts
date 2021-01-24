import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { GradesReportDataSource, GradesReportItem } from './grades-report-datasource';

@Component({
  selector: 'grades-report',
  templateUrl: './grades-report.component.html',
  styleUrls: ['./grades-report.component.css']
})
export class GradesReportComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<GradesReportItem>;
  dataSource: GradesReportDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rubro', 'rubroPercentage', 'assignment', 'grade'];

  ngOnInit() {
    this.dataSource = new GradesReportDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
