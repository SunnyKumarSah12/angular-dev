import { Component } from '@angular/core';

@Component({
  selector: 'app-kpi-cards',
  templateUrl: './kpi-cards.component.html',
  styleUrl: './kpi-cards.component.css'
})
export class KpiCardsComponent {

  kpis = [
    { title: 'Total Demands', value: 126, icon: 'assignment', color: '#FFB900' },
    { title: 'Open Demands', value: 54, icon: 'hourglass_empty', color: '#646464' },
    { title: 'Fulfilled Demands', value: 58, icon: 'check_circle', color: '#28a745' },
    { title: 'Avg. Aging (Days)', value: 37, icon: 'schedule', color: '#ffc107' }
  ];

  kpiData = [
    { title: 'Total Demands', value: 128 },
    { title: 'Open Demands', value: 43 },
    { title: 'Closed Demands', value: 85 },
    { title: 'Avg. Ageing (days)', value: 14 },
    { title: 'Profiles Shared', value: 56 },
    { title: 'Onboarded', value: 22 }
  ];
}
