import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebShowPageRoutingModule } from './web-show-routing.module';

import { WebShowPage } from './web-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebShowPageRoutingModule
  ],
  declarations: [WebShowPage]
})
export class WebShowPageModule {}
