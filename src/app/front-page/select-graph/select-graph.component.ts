import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Graph } from 'src/app/utils/graph.model';
@Component({
  selector: 'app-select-graph',
  templateUrl: './select-graph.component.html',
  styleUrls: ['./select-graph.component.css']
})
export class SelectGraphComponent implements OnInit {
  public localGraphs = [
    new Graph(0,"Lorem ipsum dolor sit amet","Vestibulum iaculis enim, consectetur adipiscing elit. Aenean porttitor."),
    new Graph(1,"Praesent a velit","Sed volutpat venenatis sollicitudin. Sed bibendum, massa non ultrices pharetra."),
    new Graph(2,"Cras ultricies sem","Nunc faucibus nunc et est placerat vestibulum. Donec tempus bibendum."),
  ];
  public sharedGraphs = [
    new Graph(0,"Sed vel ultrices","Mauris elit metus, posuere quis nisi a, sodales ornare odio."),
    new Graph(1,"Etiam turpis nibh, pellentesque","Nunc faucibus nunc et est placerat vestibulum. Donec tempus bibendum."),
    new Graph(2,"Maecenas et pellentesque nunc","Etiam aliquet, sem non finibus imperdiet, sapien elit suscipit urna."),
  ];

  constructor(protected router: Router) { }

  ngOnInit(): void {
  }
  
  selectGraph(graph: Graph) {
    console.log(graph.id, graph);
    // this.router.navigate(['./edit/'+graph.id]);
    this.router.navigate(['./edit']);
  }

}
