import { Injectable } from '@angular/core';
import { Graph } from '../utils/graph.model';

// Provider of the local graphs
@Injectable({
  providedIn: 'root'
})
export class LocalGraphService {

  constructor() { }

  getAllGraphs() {
    // TODO: Return an array of the local graphs
  }

  getGraph(id: number) {
    // TODO: read in a graph
  }

  saveGraph(graph: Graph) {
    // TODO: write it as JSON into LocalGraph folder (check if exists already and so on)
  }
}
