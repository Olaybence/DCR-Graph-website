import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-div',
  templateUrl: 'task-div.svg',
  styleUrls: []
})
export class Task {}
@Component({
  selector: 'app-visual-view',
  templateUrl: './visual-view.component.html',
  styleUrls: ['./visual-view.component.css']
})
export class VisualViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
