import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Demand, DemandService } from '../demand.service';

@Component({
  selector: 'app-add-demand',
  templateUrl: './add-demand.component.html',
  styleUrls: ['./add-demand.component.css']
})
export class AddDemandComponent {
  isBulk = false;
  bulkCount = 1;

  constructor(private demandService: DemandService, private router: Router) {}

  onSubmit(formData: Demand): void {
    console.log('AddDemandComponent :: onSubmit');
    if (this.isBulk && this.bulkCount > 1) {
      this.demandService.createBulkDemands(formData, this.bulkCount);
    } else {
      this.demandService.createDemand(formData);
    }
    this.router.navigate(['/demand']);
  }
}
