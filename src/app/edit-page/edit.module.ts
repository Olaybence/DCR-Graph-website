import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { TextViewComponent } from './text-view/text-view.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { InspectorComponent } from './visual-view/inspector/inspector.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';

import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialog } from '../utils/error-dialog/error-dialog';
import { SharedModule } from '../shared/shared.module';
import { SimulateComponent } from './simulate/simulate.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { ParametersDialog } from './simulate/parameters-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { VisualViewComponent } from './visual-view/visual-view.component';

import { GojsAngularModule } from 'gojs-angular';


@NgModule({
  declarations: [
    EditComponent,
    EditHeaderComponent,
    ParametersDialog,
    TextViewComponent,
    InspectorComponent,
    ErrorDialog,
    SimulateComponent,
    AnalyzeComponent,
    VisualViewComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    GojsAngularModule,
  ], exports: [
    EditComponent
  ]
})
export class EditModule { }
