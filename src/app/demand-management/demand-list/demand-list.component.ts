import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Demand, DemandService } from '../demand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.css']
})
export class DemandListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'clientName', 'role', 'location', 'priority', 'status', 'demandCreationDate', 'actions'];
  dataSource = new MatTableDataSource<Demand>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private demandService: DemandService, private router: Router) {}

  ngOnInit(): void {
    this.demandService.demands$.subscribe((demands) => {
      this.dataSource =  new MatTableDataSource(demands);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteDemand(id: number): void {
    this.demandService.deleteDemand(id);
  }

  editDemand(demand: Demand): void {
    this.demandService.setSelectedDemand(demand);
    this.router.navigate(['/demand/edit']);
  }
  
}
