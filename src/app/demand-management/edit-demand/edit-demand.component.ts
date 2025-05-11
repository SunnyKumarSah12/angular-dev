import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Demand, DemandService } from '../demand.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignDemandComponent } from '../assign-demand/assign-demand.component';

@Component({
  selector: 'app-edit-demand',
  templateUrl: './edit-demand.component.html',
  styleUrls: ['./edit-demand.component.css']
})
export class EditDemandComponent implements OnInit {
  selectedDemand: Demand | null = null;

  constructor(
    private demandService: DemandService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.selectedDemand = this.demandService.getSelectedDemand();
    if (!this.selectedDemand) {
      // Optionally redirect if no demand is selected
      this.router.navigate(['/demand']);
    }
  }

  onSubmit(updatedDemand: Demand): void {
    this.demandService.updateDemand(updatedDemand);
    this.router.navigate(['/demand']);
  }

  openAssignDemandModal(): void {
    const dialogRef = this.dialog.open(AssignDemandComponent, {
      width: '600px', // Set modal width
      data: { demand: this.selectedDemand }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The modal was closed');
    });
  }
}
