import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditModule } from './edit-page/edit.module';
import { EditComponent } from './edit-page/edit/edit.component';
import { FrontPageModule } from './front-page/front-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrontPageModule,
    EditModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
