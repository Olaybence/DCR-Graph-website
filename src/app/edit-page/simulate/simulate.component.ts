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

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  handleOnBack() {
    this.onBack.emit();
  }

  array = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ];

  myFunction() {
    var x = document.getElementById('myDIV');
    if (x.innerHTML === ' ' || x.innerHTML === 'Display Logs Here!') {
      x.innerHTML = this.array[0];
    } else {
      x.innerHTML = ' ';
    }
  }
}
