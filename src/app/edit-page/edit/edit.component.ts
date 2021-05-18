import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ResolveStart } from '@angular/router';
import { Graph, Node, Role } from 'src/app/utils/graph.model';

export type ViewType = 'text' | 'visual';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  edit_id: string;
  graph: Graph = new Graph(0,"Sed vel ultrices","Mauris elit metus, posuere quis nisi a, sodales ornare odio.");
  selectedViewType: ViewType = 'visual';

  
  constructor(private router: Router) {
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
        this.edit_id = evt.url.split('/').pop();
       console.log("I got it in .ts!!! " + this.edit_id);
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


