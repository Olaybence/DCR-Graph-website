import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

import * as $ from 'jquery';

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

  data = [
    {
      label: 'Label 1',
      value: 'Value One'
    },
    {
      label: 'Label 2',
      value: 'Value Two'
    }
  ];
  
  moreData = [
    {
      label: 'Label 3',
      value: 'Value Three'
    },
    {
      label: 'Label 4',
      value: 'Value Four'
    },
    {
      label: 'Label 5',
      value: 'Value Five'
    }
  ];
  //moreData = moreData.slice(0,6);

  constructor() { }

  ngOnInit(): void {
    
    console.log("VisualViewComponent - ngOnInit, jQuery: $(document)",$(document)[0]);

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

    // COPIED //////////////////////////////////////

    let self = this;
    // toggle 'selected' state on a tile
    $(document).on('change', ':checkbox', function() {
      $(this).closest('.tile').toggleClass('selected');
      if ($(this).closest('.tile').hasClass('copy')) {
        $('.invisible').find(':checkbox').click();
      }
    });
    
    // toggle details view
    $(document).on('click', '.tile .body', function() {
      let tile = $(this).closest('.tile');
      if (tile.hasClass('copy')) {
        // do nothing
      } else {
        self.growTile(tile);
      }
    });
    
    // click anywhere off tile to close
    $(document).on('click', '.overlay', this.shrinkTile);
    
    // view attachments
    $(document).on('click', '.fa.fa-paperclip', this.viewAttachments);
    
    // view report
    $(document).on('click', '.fa.fa-file-text', this.viewReport);
    
    // on load
    this.addTiles(100);
    this.addInitialDetailsHTML();
  }

  editTask(taskID: number) {
    alert(`editTask(${taskID})`);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  

  ////////////////////////////////////////////////
  // COPIED //////////////////////////////////////
  ////////////////////////////////////////////////
  
  // generate tiles with random RAG status and completion status
  addTiles(num) {
    let tile = $('.tile'),
        ragStates = ['red', 'amber', 'green', 'green', 'no-rag'],
        completionStates = ['complete', 'complete', 'complete', 'incomplete'];
    for (let i = 0; i < num; i++) {
      let rag = ragStates[Math.floor(Math.random() * ragStates.length)];
      let com = completionStates[Math.floor(Math.random() * completionStates.length)];
      $('.tiles').append(tile.clone().addClass(rag).addClass(com));
    }
    tile.remove();
  }
  
  // add the initial 2 labels and values to all tiles
  addInitialDetailsHTML() : void {
    let frag = '';
    for (let i = 0; i < 2; i++) {
      let def = this.generateDefHTML(this.data[i].label, this.data[i].value);
      frag += def;
    }
    $('.tile dl:first-child').html(frag);
  }
  
  growTile(tile) : void {
      let scrollTop = $(window).scrollTop();
      let osTop = tile.offset().top;
      let osLeft = tile.offset().left;
      // make copy
      let copy = tile.clone().addClass('copy');
      // make original invisible to keep tile space
     tile.addClass('invisible');
      copy.css({
        left: osLeft,
        top: osTop - scrollTop
      });
      this.addDetailsWithLayout(copy);
      copy.appendTo('.tiles');
      $('body').addClass('no-scroll');
      $('.overlay').fadeIn(200, function() {
        copy.addClass('zoom');
      });
  }
  
  shrinkTile() {
      $('body').removeClass('no-scroll');
      $('.copy').removeClass('zoom');
      setTimeout(function() {
        $('.invisible').removeClass('invisible');
        $('.copy').remove();
        $('.overlay').fadeOut(600);
      }, 600);
  }
  
  generateDefHTML(label, value) {
    return '<dt>' + label + '</dt><dd>' + value + '</dd>';
  }
  
  addDetailsWithLayout(copy) {
    let initialDataCount = 2,
        moreDataCount = this.moreData.length,
        totalDataCount = initialDataCount + moreDataCount,
        columnCount = Math.ceil(totalDataCount * 1/3);
    for (let i = 0; i < this.moreData.length; i++) {
      let def = this.generateDefHTML(this.moreData[i].label, this.moreData[i].value);
      // determine column (columns read down then across)
      if (i + 3 <= columnCount) {
        copy.find('dl:first-child').append(def);
      }
      if (i + 3 > columnCount && i + 3 <= (columnCount * 2)) {
        copy.find('dl:nth-child(2)').append(def);
      }
      if (i + 3 > (columnCount * 2) && i + 3 <= (columnCount * 3)) {
        copy.find('dl:nth-child(3)').append(def);
      }
    }
  }
  
  viewAttachments() {
    alert('View attachments function');
  }
  
  viewReport() {
    alert('View report function');
  }

}
