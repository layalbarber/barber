import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailverifyPageRoutingModule } from './emailverify-routing.module';

import { EmailverifyPage } from './emailverify.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailverifyPageRoutingModule,
    TranslateModule
  ],
  declarations: [EmailverifyPage]
})
export class EmailverifyPageModule {}
