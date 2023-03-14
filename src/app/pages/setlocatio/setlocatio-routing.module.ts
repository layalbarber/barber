import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetlocatioPage } from './setlocatio.page';

const routes: Routes = [
  {
    path: '',
    component: SetlocatioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetlocatioPageRoutingModule {}
