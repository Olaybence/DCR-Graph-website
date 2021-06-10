import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parameter } from './simulate.component';

export type DialogData = {
  parameters: Parameter[];
};

@Component({
  selector: 'parameters-dialog.component',
  templateUrl: 'parameters-dialog.component.html',
  styleUrls: ['parameters-dialog.component.css'],
})
export class ParametersDialog {
  constructor(
    public dialogRef: MatDialogRef<ParametersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleAddNewParameter(): void {
    const currentIndex = this.data.parameters.length
    this.data.parameters.push({ name: `parameter_${currentIndex}`, value: '' });
  }

  handleRemoveParameter(index: number): void {
    this.data.parameters.splice(index, 1);
  }
}
