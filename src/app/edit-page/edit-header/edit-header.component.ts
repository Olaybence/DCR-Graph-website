import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewType } from '../edit/edit.component';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { Graph } from 'src/app/utils/graph.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    private graphService: GraphService,
    private dialog: MatDialog) { }

  ngOnInit(): void { }

  // Navigates to the main page
  goHome() {
    this.router.navigate(['./main']);
  }

  handleOnSaveAs() {
    console.log("Save as", this.graph);
    this.graphService.save(this.graph);
  }

  // Simulate
  handleOnSimulateGraph() {
    this.onChangeView.emit('simulate');
  }

  // Analyze
  handleOnAnalyzeGraph() {
    this.onChangeView.emit('analyze');
  }

  // Other functions
  handleOnShareGraph() {
    console.log('clicked on ShareGraph');
  }

  // Opens up the dialog of the keyboard shortcuts
  helper() {
    const dialogRef = this.dialog.open(GojsShortcutHelperComponent, {
      width: '450px'
    });

    // alert("Informations that explains every aspects of the graphs (nodes parameters, links types, shortcuts)!");
  }

  get selectedView(): string {
    return (
      this.selectedViewType.charAt(0).toUpperCase() +
      this.selectedViewType.slice(1)
    );
  }
}



@Component({
  selector: 'gojs-shortcut-helper',
  templateUrl: 'gojs-shortcut-helper.html',
})
export class GojsShortcutHelperComponent {
  constructor (private router: Router,
    private graphService: GraphService,
    private dialogRef: MatDialogRef<GojsShortcutHelperComponent>) {  }

  //Doesnt properly close the dialog
  public onCancel() {
    this.dialogRef.close();
    return;
  }
}
