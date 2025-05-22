import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-aging-table',
  templateUrl: './aging-table.component.html',
  styleUrls: ['./aging-table.component.css']
})
export class AgingTableComponent implements OnInit {
  displayedColumns: string[] = ['demandId', 'client', 'role', 'created', 'status', 'priority', 'agingDays'];
  dataSource = new MatTableDataSource([
    {
      demandId: '101',
      client: 'Client A',
      role: 'Frontend Developer',
      created: '01-Dec-2024',
      status: 'Open',
      priority: 'High',
      agingDays: 172
    },
    {
      demandId: '102',
      client: 'Client B',
      role: 'Backend Developer',
      created: '20-Dec-2024',
      status: 'In Progress',
      priority: 'Medium',
      agingDays: 153
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
