import { Component, Input, OnInit } from '@angular/core';
import { Graph } from 'src/app/utils/graph.model';

@Component({
  selector: 'app-visual-view',
  templateUrl: './visual-view.component.html',
  styleUrls: ['./visual-view.component.css']
})
export class VisualViewComponent implements OnInit {

  @Input() graph: Graph;
  // x: Array<Number>;
  roleWidth: number = 200;
  rowSize: number = 80;

  constructor() { }

  ngOnInit(): void {
    console.log("VisualViewComponent",this.graph);
    this.graph.roles.map((role,i) => {
      role.x = this.roleWidth/2;
      role.y = i*80+40;
    })
  }

}
