import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { Graph } from 'src/app/utils/graph.model';
@Component({
  selector: 'app-select-graph',
  templateUrl: './select-graph.component.html',
  styleUrls: ['./select-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
//Component for creating select-graph
export class SelectGraphComponent implements OnInit {
  //variables used for local or shared graphs
  public localGraphs;
  public sharedGraphs;

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
        },
        error => {
          console.log("graphService - getAllSharedGraphs Error:",error);
        }
      );
    }

  ngOnInit(): void {
  }
  
  //Routing the graphs to a unique path based on graph ID.
  //For both local and shared.
  selectGraph(graph: Graph) {
    console.log("selecting", graph.id, graph);
    if (this.sharedGraphs.includes(graph)) {
      this.router.navigate(['./edit/shared/' + graph.id]);
    } else {
      this.router.navigate(['./edit/local/' + graph.id]);
    }
  }

}
