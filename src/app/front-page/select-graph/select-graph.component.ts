import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { Graph } from 'src/app/utils/graph.model';
@Component({
  selector: 'app-select-graph',
  templateUrl: './select-graph.component.html',
  styleUrls: ['./select-graph.component.css']
})
export class SelectGraphComponent implements OnInit {
  public localGraphs;
  public sharedGraphs;

  constructor(
    protected router: Router,
    private graphService: GraphService
    ) {
      this.localGraphs = this.graphService.getAllLocalGraphs();
      this.sharedGraphs = this.graphService.getAllSharedGraphs();
    }

  ngOnInit(): void {
  }
  
  selectGraph(graph: Graph) {
    console.log(graph.id, graph);

    if (this.sharedGraphs.includes(graph)) {
      this.router.navigate(['./edit/shared/'+graph.id]);
    } else {
      this.router.navigate(['./edit/local/'+graph.id]);
    }
  }

}
