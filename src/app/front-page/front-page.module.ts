import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SortPipe } from 'src/sort';
import { FilterPipe } from 'src/filter';
import { SortParamsDirective } from 'src/sortParams';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

import {MatTooltipModule} from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { ContactPageComponent } from './contact-page/contact-page.component';
import { SharedModule } from '../shared/shared.module';
import { AboutPageComponent } from './about-page/about-page.component';


@NgModule({
  declarations: [
    MainPageComponent,
    SortPipe,
    FilterPipe,
    SortParamsDirective,
    ContactPageComponent,
    AboutPageComponent
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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    
    MatTooltipModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,

    SharedModule
  ], exports: [
    MainPageComponent,
    ContactPageComponent,
    AboutPageComponent,
    SortParamsDirective
  ]
})
export class FrontPageModule { }
