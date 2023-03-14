import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailverifyPage } from './emailverify.page';

const routes: Routes = [
  {
    path: '',
    component: EmailverifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailverifyPageRoutingModule {}
