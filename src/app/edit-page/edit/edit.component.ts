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
    private localGraphService: GraphService
              ) {
    //console.log(this.graph);


    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        let idString = evt.url.split('/').pop();
        this.edit_id = Number(idString);
        console.log("I got it in .ts!!! " + this.edit_id);
        this.graph = this.localGraphService.getGraph(this.edit_id);
      }
    })
  }




  taskDiv() {
    return `
    <svg viewBox="0 0 120 80" x="0" y="80" width="120" height="80">
      <text transform="rotate(270 80,20)"
          font-size="11px" font-weight="bold" x="60" y="40" font-family="Arial, Helvetica, sans-serif"
          text-anchor="middle">
          <tspan dy="0">IT B</tspan>
          <tspan dy="15" x="60"></tspan>
      </text>"
    </svg>`;
  }


  ngOnInit(): void {

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


