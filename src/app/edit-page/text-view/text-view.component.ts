import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-div',
  templateUrl: 'task-div.svg',
  styleUrls: []
})
export class Task {}

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
