import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { TextViewComponent } from './text-view/text-view.component';
import { Task, VisualViewComponent } from './visual-view/visual-view.component';



@NgModule({
  declarations: [
    EditComponent,
    EditHeaderComponent,
    Task,
    TextViewComponent,
    VisualViewComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule
  ], exports: [
    EditComponent
  ]
})
export class EditModule { }
