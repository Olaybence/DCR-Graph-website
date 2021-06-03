import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
//import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { AboutPageComponent } from './about-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AboutPageComponent
    //FooterComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatGridListModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
  ], exports: [
    AboutPageComponent
  ]
})
export class AboutPageModule { }
