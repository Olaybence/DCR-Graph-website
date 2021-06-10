import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateProjectDialog, HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule],
  declarations: [HeaderComponent, FooterComponent, CreateProjectDialog],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
