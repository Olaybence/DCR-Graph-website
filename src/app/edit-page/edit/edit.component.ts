import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { Graph, Node, Role } from 'src/app/utils/graph.model';

export type ViewType = 'text' | 'visual';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ GraphService ]
})
export class EditComponent implements OnInit {
  edit_id: number;
  graph: Graph;
  selectedViewType: ViewType = 'visual';

  
  constructor(
    private router: Router,
    private graphService: GraphService
              ) {
    //console.log(this.graph);


    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        let idString = evt.url.split('/').pop();
        this.edit_id = Number(idString);
        console.log("I got it in .ts!!! " + this.edit_id);
      }
    })
  }

  ngOnInit(): void {
    // this.graphService.getGraph(this.edit_id).subscribe(
    //   graph => {
    //     console.log("localGraphService - getGraph ",this.edit_id,":",graph);
    //     this.graph = graph;
    //   },
    //   error => {
    //     console.log("localGraphService - getGraph Error:",error);
    //   }
    // );
    this.graph = this.graphService.getGraph(this.edit_id);
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
  }


