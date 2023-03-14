import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllSalonsPageRoutingModule } from './all-salons-routing.module';

import { AllSalonsPage } from './all-salons.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllSalonsPageRoutingModule,
    TranslateModule,
    NgxProgressiveImgLoaderModule
  ],
  declarations: [AllSalonsPage]
})
export class AllSalonsPageModule {}
