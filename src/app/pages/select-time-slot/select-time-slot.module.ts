import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTimeSlotPageRoutingModule } from './select-time-slot-routing.module';

import { SelectTimeSlotPage } from './select-time-slot.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectTimeSlotPageRoutingModule,
    TranslateModule
  ],
  declarations: [SelectTimeSlotPage]
})
export class SelectTimeSlotPageModule {}
