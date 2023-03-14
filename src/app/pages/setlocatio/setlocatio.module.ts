import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetlocatioPageRoutingModule } from './setlocatio-routing.module';

import { SetlocatioPage } from './setlocatio.page';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetlocatioPageRoutingModule,
    GooglePlaceModule,
    TranslateModule
  ],
  declarations: [SetlocatioPage]
})
export class SetlocatioPageModule {}
