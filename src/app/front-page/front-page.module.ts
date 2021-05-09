import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGraphComponent } from './select-graph/select-graph.component';
import { HeaderComponent } from './header/header.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    SelectGraphComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
  ], exports: [
    SelectGraphComponent
  ]
})
export class FrontPageModule { }
