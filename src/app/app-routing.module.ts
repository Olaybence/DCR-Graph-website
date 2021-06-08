import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { EditModule } from './edit-page/edit.module';
import { FrontPageModule } from './front-page/front-page.module';

import { EditComponent } from './edit-page/edit/edit.component';
import { SelectGraphComponent } from './front-page/select-graph/select-graph.component';

import { AboutPageComponent } from './about-page/about-page.component';
import { AboutPageModule } from './about-page/about-page.module';
import { ContactPageComponent } from './contact-page/contact-page.component';

const routes: Routes = [
  { path: "", redirectTo: "/select", pathMatch: "full" },
  {
    path: 'select', // Component Selected (Select feature)
    component: SelectGraphComponent, children: [
      {
        path: ':id',
        component: SelectGraphComponent,
      }
    ]
  },
  // About and contact routing
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },

  { path: 'edit', // Edit the selected graph
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
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FrontPageModule,
    AboutPageModule,
    EditModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }