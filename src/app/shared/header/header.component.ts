import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph.service';
import { AbstractControl, FormBuilder, FormControl, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { Graph, Location } from '../../utils/graph.model';

// import { VisualViewComponent } from 'src/app/edit-page/visual-view/visual-view.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateProjectDialog } from './create-project-dialog';

export interface DataThings {
  name: String;
  description: String;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,
    public router: Router) { }

  ngOnInit(): void {  }

  createProject() {
    const dialogRef = this.dialog.open(CreateProjectDialog, {
      width: '250px'
    });  
  }

  directMain() {        this.router.navigate(['./main']); }
  directUserManual() {  this.router.navigate(['./usermanual']); }
  directContactUs() {   this.router.navigate(['./contact']); }

}