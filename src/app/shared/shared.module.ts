import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateProjectDialog, HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule, 
    MatInputModule,
    MatToolbarModule,
    MatGridListModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    CreateProjectDialog
  ],
  exports: [
    HeaderComponent, 
    FooterComponent
  ],
})
export class SharedModule {}
