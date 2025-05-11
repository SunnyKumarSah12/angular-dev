import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandListComponent } from './demand-list/demand-list.component';
import { AddDemandComponent } from './add-demand/add-demand.component';
import { EditDemandComponent } from './edit-demand/edit-demand.component';
import { ViewDemandComponent } from './view-demand/view-demand.component';

const routes: Routes = [
  { path: '', component: DemandListComponent },
  { path: 'add', component: AddDemandComponent },
  { path: 'edit', component: EditDemandComponent },
  { path: 'view/:id', component: ViewDemandComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandManagementRoutingModule {}
