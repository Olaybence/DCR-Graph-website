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

  goHome() {
    this.router.navigate(['./main']);
  }
  
  handleOnSaveAs() {
    console.log("Save as",this.graph)
    this.graphService.save(this.graph);
  }
  
  // Simulate
  handleOnSimulateGraph() {
    this.onChangeView.emit('simulate');
  }

  handleOnEditParameters() {
    console.log('clicked on EditParameters');
  }
  
  handleOnViewExecutionLog() {
    console.log('clicked on ViewExecutionLog');
  }
  
  // Analyze
  handleOnAnalyzeGraph() {
    this.onChangeView.emit('analyze');
  }

  handleOnViewMetrics() {
    console.log('clicked on ViewMetrics');
  }
  
  handleOnViewLogs() {
    console.log('clicked on AddObject');
  }

  // Other functions
  handleOnShareGraph() {
    console.log('clicked on ShareGraph');
  }

  helper() {
    alert("Informations that explains every aspects of the graphs (nodes parameters, links types, shortcuts)!");
  }

  get selectedView(): string {
    return (
      this.selectedViewType.charAt(0).toUpperCase() +
      this.selectedViewType.slice(1)
    );
  }
}
