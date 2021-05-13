import { Component, OnInit } from '@angular/core';

export type ViewType = 'text' | 'visual';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  selectedViewType: ViewType = 'text';

  constructor() {}
  ngOnInit(): void {}

  handleOnChangeView(vt: ViewType) {
    this.selectedViewType = vt;
  }

  renderTextView(): boolean {
    return this.selectedViewType === 'text';
  }

  renderVisualView(): boolean {
    return this.selectedViewType === 'visual';
  }
}
