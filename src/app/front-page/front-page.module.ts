import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectGraphComponent } from './select-graph/select-graph.component';
import { SelectSourceComponent } from './select-source/select-source.component';
import { SelectFeatureComponent } from './select-feature/select-feature.component';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  declarations: [
    SelectGraphComponent,
    SelectSourceComponent,
    SelectFeatureComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule
  ], exports: [
    SelectGraphComponent
  ]
})
export class FrontPageModule { }
