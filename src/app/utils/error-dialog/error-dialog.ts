import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

// Needed for the HTML elements
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'error-dialog',
    templateUrl: 'error-dialog.html',
  })
  export class ErrorDialog {

    // TODO: Take the message it as a param
    @Input() errorMsg: string;
    
    // Is it worth to have?
    @Input() buttonFunction: void;
    @Input() buttonText: string;

    constructor(protected router: Router) { }
    
    eMsg: string = "You have no DCR-Graph selected.";

    home() : void {
      this.router.navigate(['./select/']);
      // TODO: Close the dialog window
    }
  }