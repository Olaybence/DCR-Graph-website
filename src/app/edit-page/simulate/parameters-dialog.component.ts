import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export type DialogData = {
  parameters: string;
}

@Component({
  selector: 'parameters-dialog.component',
  templateUrl: 'parameters-dialog.component.html',
})
export class ParametersDialog {

  constructor(
    public dialogRef: MatDialogRef<ParametersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
