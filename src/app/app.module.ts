import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditModule } from './edit-page/edit.module';
import { FrontPageModule } from './front-page/front-page.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AboutPageModule } from './about-page/about-page.module';
import { ContactPageModule } from './contact-page/contact-page.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Used Angular module
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    DragDropModule,

    AppRoutingModule,
    
    // Rooting
    AppRoutingModule,

    // Page modules
    FrontPageModule,
    AboutPageModule,
    ContactPageModule,
    EditModule,


    // Icons
    MatIconModule,

    // Additional modules
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
