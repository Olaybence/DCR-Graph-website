import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graph, Task, Role } from '../utils/graph.model';
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
    this.graph.tasks = [
      new Task(0,"Collect documents",0,null).setNextForMockUp(1),
      new Task(1,"Unusual property",0,1).setNextForMockUp(2),
      new Task(2,"Make appointment",1,1).setNextForMockUp(3),
      new Task(3,"On-site appraisal",1,2).setNextForMockUp(4),
      new Task(4,"Submit budget",2,3).setNextForMockUp(5),
      new Task(5,"Approve budget",3,4).setNextForMockUp(6),
      new Task(6,"Assess application",0,5).setNextForMockUp(null),
    ];
    this.graph.roles = [
      new Role(0,"IT A"),
      new Role(1,"IT B"),
      new Role(2,"Client"),
      new Role(3,"Intern"),
    ];

    this.localGraphs.push(this.graph);
    this.sharedGraphs.push(this.graph);
  }

  getAllLocalGraphs() {
    // return this.http.get<Graph[]>('http://localhost:8080/local').subscribe(
    //   response => {
    //     console.log("Successful request", response);
    //     return response;
    //   },
    //   error => {
    //     alert("getAllSharedGraphs(): " + error.error.message);
    //     console.log("error",error);
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
    //     alert("getAllSharedGraphs(): " + error.error.message);
    //     console.log("error",error);
    //     console.log(error.error.message);
    //   }
    // );

    return this.sharedGraphs;
  }

  getGraph(id: number) : Observable<Graph> {
    console.log("getGraph",id);
    
    return this.http.get<Graph>(`http://localhost:8080/local/${id}`);
  }

  getGraphMockUp(id: number) : Graph {
    console.log("getGraphMockUp",id);    
    return this.graph;
  }
  
  createGraph(graph: Graph) {
    // MIGHT NEED TO BE CHANGED
    // The URL can be changed as idk what is the convenient calling.
    this.http.put<Graph>('http://localhost:8080/local',graph).subscribe(
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
