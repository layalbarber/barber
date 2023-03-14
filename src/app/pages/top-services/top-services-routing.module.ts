import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopServicesPage } from './top-services.page';

const routes: Routes = [
  {
    path: '',
    component: TopServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopServicesPageRoutingModule {}
