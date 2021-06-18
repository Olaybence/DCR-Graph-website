import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { AbstractControl, FormBuilder, FormControl, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Graph, Location } from '../../utils/graph.model';

// import { VisualViewComponent } from 'src/app/edit-page/visual-view/visual-view.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'create-project-dialog',
    templateUrl: 'create-project-dialog.html',
  })
  export class CreateProjectDialog {
    description: string;
    public newId: number;
    public localGraphs: Graph[];
    public graph: Graph;
    
    nameControl = new FormControl('', [Validators.required, this.includes()]);
    name: string;
  
    constructor (private router: Router,
      private graphService: GraphService,
      private dialogRef: MatDialogRef<CreateProjectDialog>) {
  
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
    public onCreate() {
      this.newId = this.localGraphs.length;
  
      this.graph = new Graph(this.newId,this.name,this.description,Location.local,[],[]);
      //console.log("this is the new id", this.newId);
      //console.log("this is my new graph", this.graph);
      
      if(this.nameControl.hasError('required') || this.nameControl.hasError('alreadyExist')) {
        this.getErrorMessage();
        return;
      }
  
      this.graphService.createGraph(this.graph);
      
      this.dialogRef.close(); // Closes itself
      this.router.navigate(['./edit/local/' + this.newId]);
      return ({ name: this.name, description: this.description })
    }
  }
  