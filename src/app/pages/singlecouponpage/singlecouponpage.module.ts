import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglecouponpagePageRoutingModule } from './singlecouponpage-routing.module';

import { SinglecouponpagePage } from './singlecouponpage.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglecouponpagePageRoutingModule,
    TranslateModule
  ],
  declarations: [SinglecouponpagePage]
})
export class SinglecouponpagePageModule {}
