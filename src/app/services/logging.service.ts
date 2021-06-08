import { Injectable } from '@angular/core';
import { Graph } from '../utils/graph.model';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(graph: Graph) {
    console.log("logged graph:",graph);
    // this.http.get<Graph[]>('http://localhost:8080/local');
  }
}
