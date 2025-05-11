import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Demand, DemandService } from '../demand.service';

@Component({
  selector: 'app-assign-demand',
  templateUrl: './assign-demand.component.html',
  styleUrls: ['./assign-demand.component.css']
})
export class AssignDemandComponent {

  mode?: 'add' | 'edit';
  demandId?: number;
  // Bind the passed demand data from the Edit Demand Component
  assignedDemand: Demand;

  constructor(
    public dialogRef: MatDialogRef<AssignDemandComponent>,  // To close the dialog
    @Inject(MAT_DIALOG_DATA) public data: {mode: 'add' | 'edit', demand: Demand }, // Inject passed data
    private demandService: DemandService // To update the demand data
  ) {
    this.mode = data.mode;
    this.assignedDemand = { ...data.demand }; // Clone the demand to prevent direct modification of the source
  }

  // On form submit, update the demand
  onAssign(): void {
    // Update the demand with the new assigned details
    this.demandService.updateDemand(this.assignedDemand);
    this.dialogRef.close();  // Close the modal after assignment
  }

  // Close the modal without any updates
  onClose(): void {
    this.dialogRef.close();
  }
}
