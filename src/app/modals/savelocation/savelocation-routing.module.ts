import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavelocationPage } from './savelocation.page';

const routes: Routes = [
  {
    path: '',
    component: SavelocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavelocationPageRoutingModule {}
