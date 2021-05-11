import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit-page/edit/edit.component';
import { FrontPageModule } from './front-page/front-page.module';
import { SelectGraphComponent } from './front-page/select-graph/select-graph.component';
import { CreateGraphService } from './services/create-graph.service';
import { OpenLocalService } from './services/open-local.service';

const routes: Routes = [
  { path: "", redirectTo: "/select", pathMatch: "full" },
  {
    path: 'select/:id', // Component Selected (Select feature)
    component: SelectGraphComponent, children: [
      {
        path: ':id',
        component: SelectGraphComponent,
      }
    ]
  },
  {
    path: 'edit', // Edit the selected graph
    component: EditComponent, children: [
      {
        path: ':id',
        component: EditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
