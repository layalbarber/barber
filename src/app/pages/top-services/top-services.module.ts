import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopServicesPageRoutingModule } from './top-services-routing.module';

import { TopServicesPage } from './top-services.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopServicesPageRoutingModule,
    TranslateModule,
    NgxProgressiveImgLoaderModule
  ],
  declarations: [TopServicesPage]
})
export class TopServicesPageModule {}
