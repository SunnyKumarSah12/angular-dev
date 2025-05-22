import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-aging-table',
  templateUrl: './aging-table.component.html',
  styleUrls: ['./aging-table.component.css']
})
export class AgingTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'clientName',
    'role',
    'createdDate',
    'status',
    'priority',
    'agingDays'
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const data = [
      {
        id: 101,
        clientName: 'Client A',
        role: 'Frontend Developer',
        createdDate: new Date('2024-12-01'),
        status: 'Open',
        priority: 'High'
      },
      {
        id: 102,
        clientName: 'Client B',
        role: 'Backend Developer',
        createdDate: new Date('2024-12-20'),
        status: 'In Progress',
        priority: 'Medium'
      }
    ];

    this.dataSource.data = data.map(item => ({
      ...item,
      agingDays: this.getAgeingDays(item.createdDate)
    }));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAgeingDays(createdDate: Date): number {
    const now = new Date().getTime();
    const created = new Date(createdDate).getTime();
    return Math.floor((now - created) / (1000 * 60 * 60 * 24));
  }
}
