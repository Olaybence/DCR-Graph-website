import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Graph, Task, Role, Location } from '../../utils/graph.model';

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
  public newId: number;
  public localGraphs: Graph[];
  public graph: Graph;

  public sdescription: String;
  public description: String;
  public comments: String;

  public des: string;
  public name: string;

  public form: HTMLFormElement = document.querySelector('#myform');


  constructor (private router: Router,
    private graphService: GraphService) { this.getGraphs(); }


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

  // Need to properly send to the backend and create a new field for the diagram
  public onCreate() {
    // console.log("the data is here", this.newgraph);
    //this.newgraph.name = data.name;
    //console.log(this.newgraph.name);
    console.log(this.localGraphs);
    this.newId = this.localGraphs.length;
    //console.log("My name", data.name);
    console.log("my des", this.des);
    //console.log("my description", data.description);
    
    this.graph = new Graph(this.newId,this.name,this.des,Location.local);
    console.log("this is the new id", this.newId);
    console.log("this is my new graph", this.graph);
    this.graphService.createGraph(this.graph);
    
    this.router.navigate(['./edit/local/' + this.newId]);
  }
}