import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { EditModule } from './edit-page/edit.module';
import { FrontPageModule } from './front-page/front-page.module';

import { EditComponent } from './edit-page/edit/edit.component';
import { MainPageComponent } from './front-page/main-page/main-page.component';

import { AboutPageComponent } from './front-page/about-page/about-page.component';
import { ContactPageComponent } from './front-page/contact-page/contact-page.component';

const routes: Routes = [
  {
    path: 'main', // Component Selected (Select feature)
    component: MainPageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'edit', // Edit the selected graph
    component: EditComponent, children: [
      {
        path: ':local',
        component: EditComponent,
        children: [
          {
            path: ':id',
            component: EditComponent,
          }
        ]
      },
      {
        path: ':shared',
        component: EditComponent,
        children: [
          {
            path: ':id',
            component: EditComponent,
          }
        ]
      },
      {
        path: '**',
        redirectTo: "/main"
      }
    ]
  },
  { path: "**", redirectTo: "/main", pathMatch: "full" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FrontPageModule,
    EditModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }