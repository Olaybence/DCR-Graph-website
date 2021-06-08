import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewType } from '../edit/edit.component';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { Graph } from 'src/app/utils/graph.model';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.css'],
})
export class EditHeaderComponent implements OnInit {
  @Input() selectedViewType: ViewType;
  @Input() graph: Graph;
  @Output() onChangeView = new EventEmitter<ViewType>();

  viewTypes: ViewType[] = ['text', 'visual'];

  constructor(private router: Router,
    private graphService: GraphService) {}

  ngOnInit(): void {}

  handleOnHomePage() {
    console.log('clicked on HomePage');
    this.router.navigate(['./select']);
  }
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
    console.log("Save as",this.graph)
    this.graphService.save(this.graph);
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

  changeView(vt: ViewType) {
    this.onChangeView.emit(vt);
  }

  get selectedView(): string {
    return (
      this.selectedViewType.charAt(0).toUpperCase() +
      this.selectedViewType.slice(1)
    );
  }
}
