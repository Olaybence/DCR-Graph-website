import { NgModule } from '@angular/core';

// MATERIAL
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

// GOJS
import { GojsAngularModule } from 'gojs-angular';

// OWN STUFF
import { EditComponent } from './edit/edit.component';
import { EditHeaderComponent } from './edit-header/edit-header.component';
import { TextViewComponent } from './text-view/text-view.component';

import { InspectorComponent } from './visual-view/inspector/inspector.component';
import { ErrorDialog } from '../utils/error-dialog/error-dialog';
import { SimulateComponent } from './simulate/simulate.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { ParametersDialog } from './simulate/parameters-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { VisualViewComponent } from './visual-view/visual-view.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EditComponent,

    EditHeaderComponent,
    VisualViewComponent,
    InspectorComponent,

    TextViewComponent,

    ParametersDialog,
    ErrorDialog,

    SimulateComponent,
    AnalyzeComponent
  ],
  imports: [
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
    MatTooltipModule,
    MatCardModule,

    GojsAngularModule,

    // NgxMatColorPickerModule,
    SharedModule
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  exports: [
    EditComponent
  ]
})
export class EditModule { }
