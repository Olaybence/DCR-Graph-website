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
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { SortPipe } from 'src/sort';
import { FilterPipe } from 'src/filter';
import { SortParamsDirective } from 'src/sortParams';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SelectGraphComponent,
    SortPipe,
    FilterPipe,
    SortParamsDirective,
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
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ], exports: [
    SelectGraphComponent,
    SortPipe,
    FilterPipe,
    SortParamsDirective
  ]
})
export class FrontPageModule { }
