import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { Graph, Node, Link, Location } from 'src/app/utils/graph.model';

export type ViewType = 'text' | 'visual' | 'simulate' | 'analyze';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ GraphService ]
})
export class EditComponent implements OnInit {
  edit_id: number;
  location: Location;
  graph: Graph;
  selectedViewType: ViewType = 'visual';
  
  constructor(
    private router: Router,
    public graphService: GraphService
              ) {
    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        let idString = evt.url.split('/')[3];
        this.location = Location[evt.url.split('/')[2]];
        this.edit_id = Number(idString);
        console.log("url",evt.url.split('/'));
        console.log("location",location);
        console.log("I got it in .ts!!! " + this.edit_id);
      }
    })
  }

  ngOnInit(): void {
    this.graphService.getGraph(this.edit_id,this.location).subscribe(
      graph => {
        console.log("localGraphService - getGraph ",this.edit_id,":",graph);
        this.graph = graph;
        this.graph.location = this.location;
      },
      error => {
        console.log("localGraphService - getGraph Error:",error);
      }
    );
    //this.graph = this.graphService.getGraphMockUp(this.edit_id);
  }

  handleOnChangeView(vt: ViewType) {
    this.selectedViewType = vt;
  }

  renderTextView(): boolean {
    return this.selectedViewType === 'text';
  }

  renderVisualView(): boolean {
      return this.selectedViewType === 'visual';
  }

  renderSimulate(): boolean {
    return this.selectedViewType === 'simulate';
  }

  renderAnalyze(): boolean {
    return this.selectedViewType === 'analyze';
  }
}


