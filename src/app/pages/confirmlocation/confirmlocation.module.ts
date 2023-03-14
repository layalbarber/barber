import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmlocationPageRoutingModule } from './confirmlocation-routing.module';

import { ConfirmlocationPage } from './confirmlocation.page';
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmlocationPageRoutingModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'YOUR_MAP_KEY',
    }),
    AgmDirectionModule,
    TranslateModule
  ],
  declarations: [ConfirmlocationPage]
})
export class ConfirmlocationPageModule { }
