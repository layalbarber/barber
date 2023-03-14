import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordchangedPage } from './passwordchanged.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordchangedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordchangedPageRoutingModule {}
