import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Graph, Task, Role, Location } from '../../utils/graph.model';
import { VisualViewComponent } from 'src/app/edit-page/visual-view/visual-view.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DataThings {
  name: String;
  description: String;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createProject() {
    const dialogRef = this.dialog.open(CreateProjectDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}


@Component({
  selector: 'create-project-dialog',
  templateUrl: 'create-project-dialog.html',
})
export class CreateProjectDialog {
  name: string;
  description: string;
  public newId: number;
  public localGraphs: Graph[];
  public graph: Graph;

  public form: HTMLFormElement = document.querySelector('#myform');

  constructor (private router: Router,
    private graphService: GraphService) { this.getGraphs(); }

  //Doesnt properly close the dialog
  public onCancel() {
    return;
  }

  public getGraphs() {
    this.graphService.getAllLocalGraphs().subscribe(
      graphs => {
        console.log("graphService - getAllLocalGraphs:",graphs);
        this.localGraphs = graphs;
      },
      error => {
        console.log("graphService - getAllLocalGraphs Error:",error);
      }
    );
  }


  //Doesnt properly close the dialog
  public onCreate() {
    this.newId = this.localGraphs.length;

    this.graph = new Graph(this.newId,this.name,this.description,Location.local);
    //console.log("this is the new id", this.newId);
    //console.log("this is my new graph", this.graph);
    this.graphService.createGraph(this.graph);

    this.router.navigate(['./edit/local/' + this.newId]);
    return ({ name: this.name, description: this.description })
  }
}
