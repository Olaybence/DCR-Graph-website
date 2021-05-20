import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { Graph, Node, Role } from 'src/app/utils/graph.model';

export type ViewType = 'text' | 'visual';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  edit_id: number;
  graph: Graph = new Graph(0,"Sed vel ultrices","Mauris elit metus, posuere quis nisi a, sodales ornare odio.");
  selectedViewType: ViewType = 'visual';

  
  constructor(private router: Router,
    public graphService: GraphService) {
    this.graph.nodes = [
      new Node(0,"Collect documents",0,null).setNextForMockUp(1),
      new Node(1,"Unusual property",0,1).setNextForMockUp(2),
      new Node(2,"Make appointment",1,1).setNextForMockUp(3),
      new Node(3,"On-site appraisal",1,2).setNextForMockUp(4),
      new Node(4,"Submit budget",2,3).setNextForMockUp(5),
      new Node(5,"Approve budget",3,4).setNextForMockUp(6),
      new Node(6,"Assess application",0,5).setNextForMockUp(null),
    ];
    this.graph.roles = [
      new Role(0,"IT A"),
      new Role(0,"IT B"),
      new Role(0,"Client"),
      new Role(0,"Intern"),
    ];
    //console.log(this.graph);


    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        let id = evt.url.split('/').pop();
        this.edit_id = Number(id);
       console.log("I got it in .ts!!! " + this.edit_id);
      }
    })
  }


  ngOnInit(): void {
    
    this.graphService.getGraph(this.edit_id).subscribe(
      graph => {
        console.log("localGraphService - getGraph ",this.edit_id,":",graph);
        this.graph = graph;
      },
      error => {
        console.log("localGraphService - getGraph Error:",error);
      }
    );
    // this.graph = this.graphService.getGraphMockUp();
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


