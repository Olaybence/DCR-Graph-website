import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { EditHeaderComponent } from './edit-header/edit-header.component';



@NgModule({
  declarations: [
    EditComponent,
    EditHeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule
  ], exports: [
    EditComponent,
    EditHeaderComponent
  ]
})
export class EditModule { }
