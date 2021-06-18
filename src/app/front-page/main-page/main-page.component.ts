import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { Graph, Location } from 'src/app/utils/graph.model';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-select-graph',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
//Component for creating select-graph
export class MainPageComponent implements OnInit {
  searchTerm:string = "";
  
  //variables used for local or shared graphs
  public localGraphs: Array<Graph> = new Array<Graph>();
  public sharedGraphs: Array<Graph> = new Array<Graph>();
  
  displayedColumns: string[] = ['id', 'name', 'shortDescription', 'creationDate', 'lastOpened'];
  // displayedColumns: string[] = ['id', 'name', 'shortDescription', 'creationDate', 'lastOpened', 'description'];
  dataSourceLocal = new MatTableDataSource<Graph>(this.localGraphs);
  dataSourceShared = new MatTableDataSource<Graph>(this.sharedGraphs);

  @ViewChild(MatSort) sort: MatSort;

  //Constructor has implementation of getting local and shared graphs from database.
  constructor(
    protected router: Router,
    private graphService: GraphService
    ) {
      // GET LOCAL GRAPHS
      // this.localGraphs = this.graphService.getAllLocalGraphs();
      // WITH HTTP REQUEST
      this.graphService.getAllLocalGraphs().subscribe(
        graphs => {
          console.log("graphService - getAllLocalGraphs:",graphs);
          this.localGraphs = graphs;
          // this.localGraphs.map(graph => {
          //   console.log(graph.lastOpened.getDate() + graph.lastOpened.getHours() + graph.lastOpened.getMinutes());
          // });

          // SET UP LOCAL GRAPH TABLE
          this.dataSourceLocal = new MatTableDataSource<Graph>(this.localGraphs);
          this.dataSourceLocal.sort = this.sort;
          
          // Set up filter for the table
          this.dataSourceLocal.filterPredicate = (data: Graph, filter: string) => {
            if(data.collaborators.map(user => user.name).includes(filter) ||
              data.name.toLowerCase().includes(filter) ||
              data.description.toLowerCase().includes(filter) ||
              data.lastOpened.toString().includes(filter) ||
              data.creationDate.toString().includes(filter)
              ) {
                return true;
              } else {
                return false;
              }
          };

        },
        error => {
          console.log("graphService - getAllLocalGraphs Error:",error);
        }
      );

      // GET SHARED GRAPHS
      // this.sharedGraphs = this.graphService.getAllSharedGraphs();
      // WITH HTTP REQUEST
      this.graphService.getAllSharedGraphs().subscribe(
        graphs => {
          console.log("graphService - getAllSharedGraphs:",graphs);
          this.sharedGraphs = graphs;

          // SET UP SHARED GRAPH TABLE
          this.dataSourceShared = new MatTableDataSource<Graph>(this.sharedGraphs);
          this.dataSourceShared.sort = this.sort;
          
          // Set up filter for the table
          this.dataSourceShared.filterPredicate = (data: Graph, filter: string) => {
            if(data.collaborators.map(user => user.name).includes(filter) ||
              data.name.toLowerCase().includes(filter) ||
              data.description.toLowerCase().includes(filter) ||
              data.comments.map(comment => comment.toLowerCase().includes(filter)) ||
              data.lastOpened.toString().includes(filter) ||
              data.creationDate.toString().includes(filter)
               ) {
                return true;
              } else {
                return false;
              }
          };
        },
        error => {
          console.log("graphService - getAllSharedGraphs Error:",error);
        }
      );
    }


  ngOnInit(): void { }

  //Routing the graphs to a unique path based on graph ID.
  //For both local and shared.
  selectGraph(graph: Graph) {
    console.log("selecting", graph.id,graph);
    this.graphService.graph = graph;
    if (this.sharedGraphs.includes(graph)) {
      this.graphService.graph.location = Location.shared;
      this.router.navigate(['./edit/shared/' + graph.id]);
    } else {
      this.graphService.graph.location = Location.local;
      this.router.navigate(['./edit/local/' + graph.id]);
    }
  }

  applyFilter() {
    console.log(this.searchTerm.trim().toLowerCase());
    this.dataSourceLocal.filter = this.searchTerm.trim().toLowerCase();
    this.dataSourceShared.filter = this.searchTerm.trim().toLowerCase();
    // console.log("dataSourceLocal",this.dataSourceLocal.filteredData);
    // console.log("dataSourceShared",this.dataSourceShared.filteredData);
  }

  deleteGraph(id: number) {
    alert("delete" + id);
    // TODO: DELETE
  }

  formatDate(graph) {
    console.log(graph);
    let date = graph.lastOpened.split('T')[0];
    let time = graph.lastOpened.split('T')[1].substring(0,5);
    console.log(date, time);
    return date;
    // return date + " " + time;
  }


}