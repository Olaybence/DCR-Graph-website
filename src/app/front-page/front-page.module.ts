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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateProjectDialog } from './header/header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SelectGraphComponent,
    HeaderComponent,
    FooterComponent,
    CreateProjectDialog,
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
    FormsModule
  ], exports: [
    SelectGraphComponent
  ]
})
export class FrontPageModule { }
