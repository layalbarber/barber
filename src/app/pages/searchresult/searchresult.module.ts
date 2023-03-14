import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchresultPageRoutingModule } from './searchresult-routing.module';

import { SearchresultPage } from './searchresult.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchresultPageRoutingModule,
    TranslateModule
  ],
  declarations: [SearchresultPage]
})
export class SearchresultPageModule {}
