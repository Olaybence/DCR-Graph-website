import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

import { Graph } from 'src/app/utils/graph.model';

@Component({
  selector: 'app-visual-view',
  templateUrl: './visual-view.component.html',
  styleUrls: ['./visual-view.component.css']
})
export class VisualViewComponent implements OnInit {

  @Input() graph: Graph;
  
  // CSS: ITEM SIZES (in pixels)
  roleWidth: number = 150;

  spaceBetweenRows: number = 20;
  rowWidth: number = 120;
  rowHeight: number = 80;

  circleR: number = 20; // start and end circle
  firstRowWidth: number = 2 * this.circleR + 2* this.spaceBetweenRows; // where the circle is (an empty row)

  canvasWidth: number;
  numberOfRows: number; // counter


  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  constructor() { }

  ngOnInit(): void {
    
    // Role parameters set
    this.graph.roles.map((role,i) => {
      role.x = this.roleWidth/2;
      role.y = i*80+40;
    });
    
    
    // RowCounter
    this.numberOfRows = 0;
    
    // Calculate Task positions
    this.graph.tasks.map((task,i) => {
      if(i == 0 || this.graph.tasks[i-1].roleID == task.roleID) { // If first or put into the next row with the same role
        task.x = this.graph.startRole * this.rowHeight; // Vertical
        task.y = this.roleWidth + this.rowWidth * this.numberOfRows; // Horizontal
        
        this.numberOfRows++;
      }
      else { // If not inline with the previous
        task.x = task.roleID * this.rowHeight; // Vertical
        task.y = this.roleWidth + this.rowWidth * this.numberOfRows; // Horizontal
      }
      console.log('i',i,'x',task.x,'y',task.y);
    });

    // main-canvas size: 600 px
    this.canvasWidth = 600 + this.roleWidth;
  }

  editTask(taskID: number) {
    alert(`editTask(${taskID})`);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
