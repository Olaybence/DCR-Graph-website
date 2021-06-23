import { Inject, NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { AbstractControl, FormBuilder, FormControl, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Graph, Location } from '../../utils/graph.model';

// import { VisualViewComponent } from 'src/app/edit-page/visual-view/visual-view.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'edit-project-dialog',
    templateUrl: 'edit-project-dialog.html',
  })
  export class EditProjectDialog {
    public description: string;
    public localGraphs: Graph[];
    public graph: Graph;
    
    nameControl = new FormControl('', [Validators.required, this.includes()]);
    name: string;
  
    constructor (@Inject(MAT_DIALOG_DATA) public data: any,
      private router: Router,
      private graphService: GraphService,
      private dialogRef: MatDialogRef<EditProjectDialog>) {
        
        console.log("EditProjectDialog",data);
        this.graph = data.graph;
        this.name = this.graph.name;
        this.description = this.graph.description;

        this.graphService.getAllLocalGraphs().subscribe(
          graphs => {
            console.log("graphService - getAllLocalGraphs:",graphs);
            this.localGraphs = graphs;
          },
          error => {
            console.log("graphService - getAllLocalGraphs Error:",error);
          }
        );
      }
  
    //Doesnt properly close the dialog
    public onCancel() {
      this.dialogRef.close();
      return;
    }
  
    public includes() : ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {
        console.log("checked",this.nameControl);
        if (this.localGraphs && this.localGraphs.length > 0 && this.localGraphs.map(g => g.name).includes(this.nameControl.value)) {
          console.log("TRUE");
          return {'alreadyExist': true};
        } else {
          return null
        }
      }
    }
    
    getErrorMessage() {
      if (this.nameControl.hasError('required')) {
        return 'You must enter a value';
      }
  
      return this.nameControl.hasError('alreadyExist') ? 'The name is already exists' : '';
    }
  
    //Doesnt properly close the dialog
    public saveEdit() {    
      
      if(this.nameControl.hasError('required') || this.nameControl.hasError('alreadyExist')) {
        this.getErrorMessage();
        return;
      }
      
      this.graph.name = this.name;
      this.graph.description = this.description;
      
      this.dialogRef.close(); // Closes itself
    }
  }
  