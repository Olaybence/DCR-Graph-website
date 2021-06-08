import { Component, OnInit } from '@angular/core';

type Status = {
  deadline: any;
  enabled: boolean;
  executed: boolean;
  included: boolean;
  label: string;
  lastExecuted: any;
  name: string;
  pending: boolean;
};

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css'],
})
export class AnalyzeComponent implements OnInit {
  errorMsg: string;
  graph: any;

  constructor() {}
  ngOnInit(): void {}

  parse(input: string) {
    this.errorMsg = '';

    try {
      this.graph = window.parser.parse(input);
    } catch (error) {
      this.errorMsg = error.message + JSON.stringify(error.location);
    }
  }

  get graphStatus(): Status[] {
    if (!this.graph) {
      return [];
    }

    return this.graph.status();
  }

  time() {
    this.graph.timeStep(1);
  }

  execute(name: string) {
    this.graph.execute(name);
  }
}
