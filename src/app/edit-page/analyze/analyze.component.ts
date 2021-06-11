import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css'],
})
export class AnalyzeComponent implements OnInit {
  @Output() onBack: EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  handleOnBack() {
    this.onBack.emit();
  }

  arrayOfData = [
    'LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs LogsLogsLogsLogs',
    'MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics MetricsMetrics',
  ];

  myFunctionLogs() {
    var x = document.getElementById('myDIV');
    if (x.innerHTML === ' ' || x.innerHTML === 'Info here') {
      x.innerHTML = this.arrayOfData[0];
    } else if (x.innerHTML === this.arrayOfData[1]) {
      x.innerHTML = this.arrayOfData[0];
    } else {
      x.innerHTML = ' ';
    }
  }

  myFunctionMetrics() {
    var x = document.getElementById('myDIV');
    if (x.innerHTML === ' ' || x.innerHTML === 'Info here') {
      x.innerHTML = this.arrayOfData[1];
    } else if (x.innerHTML === this.arrayOfData[0]) {
      x.innerHTML = this.arrayOfData[1];
    } else {
      x.innerHTML = ' ';
    }
  }
}
