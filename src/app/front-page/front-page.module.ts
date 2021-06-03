import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGraphComponent } from './select-graph/select-graph.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SelectGraphComponent,
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
    SelectGraphComponent
  ]
})
export class FrontPageModule { }
