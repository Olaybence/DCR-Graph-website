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
import { FormsModule } from '@angular/forms';

import { SortPipe } from 'src/sort';
import { FilterPipe } from 'src/filter';
import { SortParamsDirective } from 'src/sortParams';


@NgModule({
  declarations: [
    SelectGraphComponent,
    HeaderComponent,
    FooterComponent,
    SortPipe,
    FilterPipe,
    SortParamsDirective
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
    FormsModule
  ], exports: [
    SelectGraphComponent,
    SortPipe,
    FilterPipe,
    SortParamsDirective
  ]
})
export class FrontPageModule { }
