import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Demand, DemandService } from '../demand.service';

@Component({
  selector: 'app-view-demand',
  templateUrl: './view-demand.component.html',
  styleUrls: ['./view-demand.component.css']
})
export class ViewDemandComponent implements OnInit {
  demand!: Demand | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private demandService: DemandService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.demand = this.demandService.getDemandById(id);
  }

  goToEdit(): void {
    if (this.demand) {
    this.demandService.setSelectedDemand(this.demand);
    this.router.navigate(['/demand/edit']);
    }
  }
}
