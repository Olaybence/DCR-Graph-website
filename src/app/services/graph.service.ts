import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graph, Task, Role, Location } from '../utils/graph.model';
// Provider of the local graphs
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  graph: Graph = new Graph(0,"Sed vel ultrices","Mauris elit metus, posuere quis nisi a, sodales ornare odio.",Location.local);
  localGraphs: Array<Graph>= [
    new Graph(0,"Lorem ipsum dolor sit amet","Vestibulum iaculis enim, consectetur adipiscing elit. Aenean porttitor.",Location.local),
    new Graph(1,"Praesent a velit","Sed volutpat venenatis sollicitudin. Sed bibendum, massa non ultrices pharetra.",Location.local),
    new Graph(2,"Cras ultricies sem","Nunc faucibus nunc et est placerat vestibulum. Donec tempus bibendum.",Location.local),
  ];
  sharedGraphs: Array<Graph> = [
    new Graph(0,"Sed vel ultrices","Mauris elit metus, posuere quis nisi a, sodales ornare odio.",Location.shared),
    new Graph(1,"Etiam turpis nibh, pellentesque","Nunc faucibus nunc et est placerat vestibulum. Donec tempus bibendum.",Location.shared),
    new Graph(2,"Maecenas et pellentesque nunc","Etiam aliquet, sem non finibus imperdiet, sapien elit suscipit urna.",Location.shared),
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

  getAllLocalGraphs() : Observable<Graph[]> {
    return this.http.get<Graph[]>('http://localhost:8080/local');
  }

  getAllSharedGraphs() {
    return this.http.get<Graph[]>('http://localhost:8080/shared');
  }

  getGraph(id: number, loc: Location) : Observable<Graph> {
    console.log("getGraphLocal",id, "location", loc);
    let location = loc == Location.local ? "local" : "shared";
    return this.http.get<Graph>(`http://localhost:8080/${location}/${id}`);
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

  save(graph: Graph) {
    let location = graph.location == Location.local ? "local" : "shared";
    // MIGHT NEED TO BE CHANGED
    // The URL can be changed as idk what is the convenient calling.
    this.http.post<Graph>(`http://localhost:8080/${location}/${graph.id}`,graph).subscribe(
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
