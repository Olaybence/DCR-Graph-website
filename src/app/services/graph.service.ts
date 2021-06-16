import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Graph, Node, Link, Role, Location } from '../utils/graph.model';
// Provider of the local graphs
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  graph: Graph;
  // graph: Graph = new Graph(0,"Sed vel ultrices","Mauris elit metus, posuere quis nisi a, sodales ornare odio.",Location.local);
  localGraphs: Array<Graph> = new Array<Graph>();
  // localGraphs: Array<Graph> = [
  //   new Graph(0,"Lorem ipsum dolor sit amet","Vestibulum iaculis enim, consectetur adipiscing elit. Aenean porttitor.",Location.local),
  //   new Graph(1,"Praesent a velit","Sed volutpat venenatis sollicitudin. Sed bibendum, massa non ultrices pharetra.",Location.local),
  //   new Graph(2,"Cras ultricies sem","Nunc faucibus nunc et est placerat vestibulum. Donec tempus bibendum.",Location.local),
  // ];
  sharedGraphs: Array<Graph> = new Array<Graph>();
  // sharedGraphs: Array<Graph> = [
  //   new Graph(0,"Sed vel ultrices","Mauris elit metus, posuere quis nisi a, sodales ornare odio.",Location.shared),
  //   new Graph(1,"Etiam turpis nibh, pellentesque","Nunc faucibus nunc et est placerat vestibulum. Donec tempus bibendum.",Location.shared),
  //   new Graph(2,"Maecenas et pellentesque nunc","Etiam aliquet, sem non finibus imperdiet, sapien elit suscipit urna.",Location.shared),
  // ];

  constructor(
    private http: HttpClient
  ) {
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

  // getGraphMockUp(id: number) : Graph {
  //   console.log("getGraphMockUp",id);    
  //   return this.graph;
  // }
  
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
