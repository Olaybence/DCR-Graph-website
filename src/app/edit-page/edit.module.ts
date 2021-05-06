import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { EditHeaderComponent } from './edit-header/edit-header.component';



@NgModule({
  declarations: [
    EditComponent,
    EditHeaderComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    EditComponent,
    EditHeaderComponent
  ]
})
export class EditModule { }
