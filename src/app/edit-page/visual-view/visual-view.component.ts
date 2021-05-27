import { Component, Input, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/graph.service';
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

  constructor(public graphService: GraphService) { }

  ngOnInit(): void {
    console.log("VisualViewComponent",this.graph);
    this.graph.roles.map((role,i) => {
      role.x = this.roleWidth/2;
      role.y = i*80+40;
    })
  }

  editTask() {
    alert("editTask()");
  }

}
