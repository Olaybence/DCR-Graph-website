import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { TextViewComponent } from './text-view/text-view.component';
import { VisualViewComponent } from './visual-view/visual-view.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GojsAngularModule } from 'gojs-angular';

@NgModule({
  declarations: [
    EditComponent,
    EditHeaderComponent,
    TextViewComponent,
    VisualViewComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    GojsAngularModule
  ], exports: [
    EditComponent
  ]
})
export class EditModule { }
