import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParametersDialog } from './parameters-dialog.component';

@Component({
  selector: 'app-simulate',
  templateUrl: './simulate.component.html',
  styleUrls: ['./simulate.component.css'],
})
export class SimulateComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ParametersDialog, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
