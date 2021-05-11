import { Injectable } from '@angular/core';
import { Graph } from '../utils/graph.model';
import { ShareInfo } from '../utils/share-info.model';

@Injectable({
  providedIn: 'root'
})
export class SharedGraphService {

  constructor() { }

  getAllGraphs() {
    // TODO: Return an array of the shared graphs (just info)
  }

  getGraph(shareInfo: ShareInfo) {
    // TODO: request the graph
  }

  postChange(graph: Graph) {
    // TODO: save it as JSON into LocalGraph folder
  }
}
