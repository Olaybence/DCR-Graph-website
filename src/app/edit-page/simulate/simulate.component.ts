import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, ParametersDialog } from './parameters-dialog.component';

@Component({
  selector: 'app-simulate',
  templateUrl: './simulate.component.html',
  styleUrls: ['./simulate.component.css'],
})
export class SimulateComponent implements OnInit {
  @Output() onBack: EventEmitter<any> = new EventEmitter();


  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open<ParametersDialog, DialogData>(
      ParametersDialog,
      {
        width: '250px',
        data: { parameters: 'dsf' },
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  handleOnBack() {
    this.onBack.emit()
  }
}
