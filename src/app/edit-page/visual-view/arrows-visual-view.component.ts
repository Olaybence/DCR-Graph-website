import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
// import * as go from 'gojs';
import * as _ from 'lodash';

import { Graph } from 'src/app/utils/graph.model';
import { ErrorDialog } from 'src/app/utils/error-dialog/error-dialog';
import { LoggingService } from 'src/app/services/logging.service';


import * as go from 'gojs/release/go';
import { Inspector } from 'gojs/extensions/DataInspector';
import { RealtimeDragSelectingTool } from 'gojs/extensions/RealtimeDragSelectingTool';

/////////////////////
////// ARROWS ///////
/////////////////////

@Component({
  selector: 'app-visual-view',
  templateUrl: './visual-view.component.html',
  styleUrls: ['./visual-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VisualViewComponent implements OnInit {

  @Input() graph: Graph;
  myDiagram: go.Diagram;
  myPalette: go.Palette;
  myOverview: go.Overview;
  inspector: Inspector;

  constructor( // Dependency Injections
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private logger: LoggingService,
  ) { }


  ngOnInit(): void {
    // if(true) { // For testing the error message
    if(this.graph == null) {
      const dialogRef = this.dialog.open(ErrorDialog);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  ngAfterViewInit(): void {
    this.init();
  } // end ngAfterViewInit


  // initialize diagram / templates
  init() {
    if ((window as any).goSamples) (window as any).goSamples();  // init for these samples -- you don't need to call this

    const $ = go.GraphObject.make;  // for conciseness in defining templates
  
    const myDiagram =
      $(go.Diagram, 'myDiagramDiv',  // create a Diagram for the DIV HTML element
        {
          isReadOnly: true,  // don't allow move or delete
          layout: $(go.CircularLayout,
            {
              radius: 100,  // minimum radius
              spacing: 0,   // circular nodes will touch each other
              nodeDiameterFormula: go.CircularLayout.Circular,  // assume nodes are circular
              startAngle: 270  // first node will be at top
            }),
          // define a DiagramEvent listener
          'LayoutCompleted': function(e: go.DiagramEvent) {
            // now that the CircularLayout has finished, we know where its center is
            const cntr = myDiagram.findNodeForKey('Center');
            if (cntr !== null) cntr.location = (myDiagram.layout as go.CircularLayout).actualCenter;
          }
        });
  
    // construct a shared radial gradient brush
    const radBrush = $(go.Brush, 'Radial', { 0: '#550266', 1: '#80418C' });
  
    // these are the nodes that are in a circle
    myDiagram.nodeTemplate =
      $(go.Node,
        $(go.Shape, 'Circle',
          {
            desiredSize: new go.Size(28, 28),
            fill: radBrush, strokeWidth: 0, stroke: null
          }), // no outline
        {
          locationSpot: go.Spot.Center,
          click: showArrowInfo,  // defined below
          toolTip:  // define a tooltip for each link that displays its information
            $<go.Adornment>('ToolTip',
              $(go.TextBlock, { margin: 4 },
                new go.Binding('text', '', infoString).ofObject())
            )
        }
      );
  
    // use a special template for the center node
    myDiagram.nodeTemplateMap.add('Center',
      $(go.Node, 'Spot',
        {
          selectable: false,
          isLayoutPositioned: false,  // the Diagram.layout will not position this node
          locationSpot: go.Spot.Center
        },
        $(go.Shape, 'Circle',
          { fill: radBrush, strokeWidth: 0, stroke: null, desiredSize: new go.Size(200, 200) }), // no outline
        $(go.TextBlock, 'Arrowheads',
          { margin: 1, stroke: 'white', font: 'bold 14px sans-serif' })
      ));
  
    // all Links have both "toArrow" and "fromArrow" Shapes,
    // where both arrow properties are data bound
    myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
        { routing: go.Link.Normal },
        $(go.Shape,  // the link shape
          // the first element is assumed to be main element: as if isPanelMain were true
          { stroke: 'gray', strokeWidth: 2 }),
        $(go.Shape,  // the "from" arrowhead
          new go.Binding('fromArrow', 'fromArrow'),
          { scale: 2, fill: '#D4B52C' }),
        $(go.Shape,  // the "to" arrowhead
          new go.Binding('toArrow', 'toArrow'),
          { scale: 2, fill: '#D4B52C' }),
        {
          click: showArrowInfo,
          toolTip:  // define a tooltip for each link that displays its information
            $<go.Adornment>('ToolTip',
              $(go.TextBlock, { margin: 4 },
                new go.Binding('text', '', infoString).ofObject())
            )
        }
      );
  
    // collect all of the predefined arrowhead names
    const arrowheads = go.Shape.getArrowheadGeometries().toKeySet().toArray();
    if (arrowheads.length % 2 === 1) arrowheads.push('');  // make sure there's an even number
  
    // create all of the link data, two arrowheads per link
    const linkdata = [];
    let i = 0;
    for (let j = 0; j < arrowheads.length; j = j + 2) {
      linkdata.push({ from: 'Center', to: i++, toArrow: arrowheads[j], fromArrow: arrowheads[j + 1] });
    }
  
    myDiagram.model =
      $(go.GraphLinksModel,
        { // this gets copied automatically when there's a link data reference to a new node key
          // and is then added to the nodeDataArray
          archetypeNodeData: {},
          // the node array starts with just the special Center node
          nodeDataArray: [{ category: 'Center', key: 'Center' }],
          // the link array was created above
          linkDataArray: linkdata
        });
    }
}

// a conversion function used to get arrowhead information for a Part
export function infoString(obj: go.GraphObject) {
    let part = obj.part;
    if (part instanceof go.Adornment) part = part.adornedPart;
    let msg = '';
    if (part instanceof go.Link) {
      const link = part;
      msg = 'toArrow: ' + link.data.toArrow + ';\nfromArrow: ' + link.data.fromArrow;
    } else if (part instanceof go.Node) {
      const node = part;
      const link = node.linksConnected.first();
      if (link) msg = 'toArrow: ' + link.data.toArrow + ';\nfromArrow: ' + link.data.fromArrow;
    }
    return msg;
  }
  
  // a GraphObject.click event handler to show arrowhead information
  export function showArrowInfo(e: go.InputEvent, obj: go.GraphObject) {
    const msg = infoString(obj);
    if (msg) {
      const status = document.getElementById('myArrowheadInfo');
      if (status) status.textContent = msg;
    }
  }
  