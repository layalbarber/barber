import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';

import { TranslateModule } from '@ngx-translate/core';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';
import {NgPipesModule} from 'ngx-pipes';
@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    IonicModule,
    NotificationPageRoutingModule,
    TranslateModule,
    NgxProgressiveImgLoaderModule,
    NgPipesModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
