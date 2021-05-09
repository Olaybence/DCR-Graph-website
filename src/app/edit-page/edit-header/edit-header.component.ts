import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.css'],
})
export class EditHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  handleOnAddObject() {
    console.log('clicked on AddObject');
  }
  handleOnRemoveObject() {
    console.log('clicked on RemoveObject');
  }
  handleOnConnectObject() {
    console.log('clicked on ConnectObject');
  }
  handleOnSaveAs() {
    console.log('clicked on SaveAs');
  }
  handleOnLoad() {
    console.log('clicked on Load');
  }
  handleOnSimulateGraph() {
    console.log('clicked on SimulateGraph');
  }
  handleOnEditParameters() {
    console.log('clicked on EditParameters');
  }
  handleOnViewExecutionLog() {
    console.log('clicked on ViewExecutionLog');
  }
  handleOnAnalyzeGraph() {
    console.log('clicked on AnalyzeGraph');
  }
  handleOnViewMetrics() {
    console.log('clicked on ViewMetrics');
  }
  handleOnViewLogs() {
    console.log('clicked on AddObject');
  }
  handleOnShareGraph() {
    console.log('clicked on ShareGraph');
  }
}
