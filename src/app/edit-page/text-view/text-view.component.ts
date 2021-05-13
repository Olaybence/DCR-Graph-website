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
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css'],
})
export class TextViewComponent implements OnInit {
  errorMsg: string;
  graphStatus: Status[];

  constructor() {}
  ngOnInit(): void {}

  parse(input: string) {
    this.errorMsg = '';

    try {
      const graph = window.parser.parse(input);
      console.log(graph.status());
      this.graphStatus = graph.status();
    } catch (error) {
      this.graphStatus = [];
      this.errorMsg = error.message + JSON.stringify(error.location);
    }
  }
}
