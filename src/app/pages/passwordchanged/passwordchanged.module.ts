import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordchangedPageRoutingModule } from './passwordchanged-routing.module';

import { PasswordchangedPage } from './passwordchanged.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordchangedPageRoutingModule,
    TranslateModule
  ],
  declarations: [PasswordchangedPage]
})
export class PasswordchangedPageModule {}
