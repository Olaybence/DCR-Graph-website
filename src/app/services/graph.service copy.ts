import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graph, Node, Role } from '../utils/graph.model';

// Provider of the local graphs
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  graph: Graph = new Graph(0,"Sed vel ultrices","Mauris elit metus, posuere quis nisi a, sodales ornare odio.");
  localGraphs: Array<Graph>= [
    new Graph(0,"Lorem ipsum dolor sit amet","Vestibulum iaculis enim, consectetur adipiscing elit. Aenean porttitor."),
    new Graph(1,"Praesent a velit","Sed volutpat venenatis sollicitudin. Sed bibendum, massa non ultrices pharetra."),
    new Graph(2,"Cras ultricies sem","Nunc faucibus nunc et est placerat vestibulum. Donec tempus bibendum."),
  ];
  sharedGraphs: Array<Graph> = [
    new Graph(0,"Sed vel ultrices","Mauris elit metus, posuere quis nisi a, sodales ornare odio."),
    new Graph(1,"Etiam turpis nibh, pellentesque","Nunc faucibus nunc et est placerat vestibulum. Donec tempus bibendum."),
    new Graph(2,"Maecenas et pellentesque nunc","Etiam aliquet, sem non finibus imperdiet, sapien elit suscipit urna."),
  ];

  constructor(
    private http: HttpClient
  ) {
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

    this.localGraphs.push(this.graph);
    this.sharedGraphs.push(this.graph);
  }

  getAllLocalGraphs() {
    // return this.http.get<Graph[]>('http://localhost:8080/local').subscribe(
    //   response => {
    //     console.log(response);
    //     return response;
    //   }
    // );

    return this.localGraphs;
  }

  getAllSharedGraphs() {
    // return this.http.get<Graph[]>('http://localhost:8080/shared').subscribe(
    //   response => {
    //     console.log(response);
    //     return response;
    //   },
    //   error => {
    //     console.log(error.error.message);
    //   }
    // );

    return this.sharedGraphs;
  }

  getGraph(id: number) : Observable<Graph> {
    console.log("getGraph",id);
    
    return this.http.get<Graph>(`http://localhost:8080/local/${id}`);
  }

  getGraphMockUp() : Graph {
    console.log("getGraphMockUp");
    
    return this.graph;
  }
  
  createGraph(graph: Graph) {
    // MIGHT NEED TO BE CHANGED
    // The URL can be changed as idk what is the convenient calling.
    this.http.put('http://localhost:8080/local',graph).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error.error.message);
      }
    );
    // TODO: write it as JSON into LocalGraph folder (check if exists already and so on)
  }
}
