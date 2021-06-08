import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
  @Output() onBack: EventEmitter<any> = new EventEmitter();
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

  handleOnBack() {
    this.onBack.emit()
  }

  arrayOfData = ["LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs", 
          "MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics"];

  myFunctionLogs() {
    var x = document.getElementById("myDIV");
    if (x.innerHTML === " " || x.innerHTML === "Info here") {
      x.innerHTML = this.arrayOfData[0];
    }
    else if (x.innerHTML === this.arrayOfData[1]) {
      x.innerHTML = this.arrayOfData[0];
    } else {
      x.innerHTML = " ";
    }
  }

  myFunctionMetrics() {
    var x = document.getElementById("myDIV");
    if (x.innerHTML === " " || x.innerHTML === "Info here") {
      x.innerHTML = this.arrayOfData[1];
    } 
    else if (x.innerHTML === this.arrayOfData[0]) {
      x.innerHTML = this.arrayOfData[1];
    }
    else {
      x.innerHTML = " ";
    }
  }
}
