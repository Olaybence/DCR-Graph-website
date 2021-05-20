import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditModule } from './edit-page/edit.module';
import { FrontPageModule } from './front-page/front-page.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Used Angular module
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    
    // Rooting
    AppRoutingModule,

    // Page modules
    FrontPageModule,
    EditModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
