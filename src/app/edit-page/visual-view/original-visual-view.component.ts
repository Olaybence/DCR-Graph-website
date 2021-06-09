// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';

// import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

// import * as go from 'gojs';
// import * as go from 'gojs/release/go';
// import * as _ from 'lodash';

// import { Graph } from 'src/app/utils/graph.model';
// import { ErrorDialog } from 'src/app/utils/error-dialog/error-dialog';
// import { LoggingService } from 'src/app/services/logging.service';


// @Component({
//   selector: 'app-visual-view',
//   templateUrl: './visual-view.component.html',
//   styleUrls: ['./visual-view.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class VisualViewComponent implements OnInit {

//   @Input() graph: Graph;

//   @ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;
//   @ViewChild('myPalette', { static: true }) public myPaletteComponent: PaletteComponent;

//   public diagramNodeData: Array<go.ObjectData> = [
//     { key: 'Alpha', text: "Node Alpha", color: 'lightblue' },
//     { key: 'Beta', text: "Node Beta", color: 'orange' },
//     { key: 'Gamma', text: "Node Gamma", color: 'lightgreen' },
//     { key: 'Delta', text: "Node Delta", color: 'pink' }
//   ];
//   public diagramLinkData: Array<go.ObjectData> = [
//     // { key: -1, from: 'Alpha', to: 'Beta', fromPort: 'r', toPort: 'l' },
//     { key: -2, from: 'Alpha', to: 'Gamma', fromPort: 'subtrahend', toPort: 'subtrahend' },
//     { key: -3, from: 'Beta', to: 'Beta' },
//     { key: -4, from: 'Gamma', to: 'Delta', fromPort: 'r', toPort: 'l' },
//     { key: -5, from: 'Delta', to: 'Alpha', fromPort: 't', toPort: 'r' }
//   ];
//   public diagramDivClassName: string = 'myDiagramDiv';
//   public diagramModelData = { prop: 'value' };
//   public skipsDiagramUpdate = false;

//   public paletteNodeData: Array<go.ObjectData> = [
//     { key: 'PaletteNode1', text: "PaletteNode1", color: 'red' },
//     { key: 'PaletteNode2', text: "PaletteNode2", color: 'yellow' }
//   ];
//   public paletteLinkData: Array<go.ObjectData> = [
//     {  }
//   ];
//   public paletteModelData = { prop: 'val' };
//   public paletteDivClassName = 'myPaletteDiv';
//   public skipsPaletteUpdate = false;

//   constructor( // Dependency Injections
//     private cdr: ChangeDetectorRef,
//     private dialog: MatDialog,
//     private logger: LoggingService,
//   ) { }

//   public oDivClassName = 'myOverviewDiv';

//   public observedDiagram = null;

//   // currently selected node; for inspector
//   public selectedNode: go.Node | null = null;

//   ngOnInit(): void {
//     // if(true) { // For testing the error message
//     if(this.graph == null) {
//       const dialogRef = this.dialog.open(ErrorDialog);

//       dialogRef.afterClosed().subscribe(result => {
//         console.log(`Dialog result: ${result}`);
//       });
//     }
//   }

//   ngAfterViewInit(): void {

//     if (this.observedDiagram) return;
//     this.observedDiagram = this.myDiagramComponent.diagram;
//     this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

//     const appComp: VisualViewComponent = this;
//     // listener for inspector
//     this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', function(e) {
//       if (e.diagram.selection.count === 0) {
//         appComp.selectedNode = null;
//       }
//       const node = e.diagram.selection.first();
//       if (node instanceof go.Node) {
//         appComp.selectedNode = node;
//       } else {
//         appComp.selectedNode = null;
//       }
//     });

//   } // end ngAfterViewInit


//   // initialize diagram / templates
//   initDiagram() : go.Diagram {

//     const $ = go.GraphObject.make;

//     // collect all of the predefined arrowhead names
//     const arrowheads = go.Shape.getArrowheadGeometries().toKeySet().toArray();
//     if (arrowheads.length % 2 === 1) arrowheads.push('');  // make sure there's an even number

//     // create all of the link data, two arrowheads per link
//     const linkdata = [];
//     let i = 0;
//     for (let j = 0; j < arrowheads.length; j = j + 2) {
//       linkdata.push({ from: 'Center', to: i++, toArrow: arrowheads[j], fromArrow: arrowheads[j + 1] });
//     }

//     const dia = $(go.Diagram, {
//       'undoManager.isEnabled': true,
//       model: $(go.GraphLinksModel,
//         {
//           nodeGroupKeyProperty: 'true',
//           linkToPortIdProperty: 'toPort',
//           linkFromPortIdProperty: 'fromPort',
//           linkKeyProperty: 'key', 
//           // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel

//           // this gets copied automatically when there's a link data reference to a new node key
//           // and is then added to the nodeDataArray
//           archetypeNodeData: {},
//           // the node array starts with just the special Center node
//           nodeDataArray: [{ category: 'Center', key: 'Center' }],
//           // the link array was created above
//           linkDataArray: linkdata,
          
//           // "toolManager.dragSelectingTool": $(RealtimeDragSelectingTool, { isPartialInclusion: true }),
//         }
//       )
//     });

//     dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };

//     const makePort = function(id: string, spot: go.Spot) {
//       return $(go.Shape, 'Circle',
//         {
//           opacity: .5,
//           fill: 'gray', strokeWidth: 0, desiredSize: new go.Size(8, 8),
//           portId: id, alignment: spot,
//           fromLinkable: true, toLinkable: true
//         }
//       );
//     }

//     let sai = this.showArrowInfo;
//     let is = this.infoString;

//     // define the Node template
//     dia.nodeTemplate =
//       $(go.Node, 'Spot',
//         {
//           contextMenu:
//             $('ContextMenu',
//               $('ContextMenuButton',
//                 $(go.TextBlock, 'Group'),
//                 { click: function(e, obj) { e.diagram.commandHandler.groupSelection(); } },
//                 new go.Binding('visible', '', function(o) {
//                   return o.diagram.selection.count > 1;
//                 }).ofObject())
//             ),
//             textEditable: true
//         },
//         $(go.Panel, 'Auto',
//           $(go.Shape, 'RoundedRectangle', { stroke: null },
//             new go.Binding('fill', 'color')
//           ),
//           $(go.TextBlock, { margin: 8 },
//             new go.Binding('text'))
//         ),
//         // Ports
//         makePort('t', go.Spot.TopCenter),
//         makePort('l', go.Spot.Left),
//         makePort('r', go.Spot.Right),
//         makePort('b', go.Spot.BottomCenter),
//         {
//           locationSpot: go.Spot.Center,
//           click: sai,  // defined below
//           toolTip:  // define a tooltip for each link that displays its information
//             $<go.Adornment>('ToolTip',
//               $(go.TextBlock, { margin: 4 },
//                 new go.Binding('text', '', is).ofObject())
//             )
//         }
//       );
      
//       dia.linkTemplate =
//         $(go.Link,  // the whole link panel
//           { routing: go.Link.Normal },
//           $(go.Shape,  // the link shape
//             // the first element is assumed to be main element: as if isPanelMain were true
//             { strokeWidth: 1 }),
//           $(go.Shape,  // the "from" arrowhead
//             new go.Binding('fromArrow', 'fromArrow'),
//             { scale: 0.2, fill: '#D4B52C' }),
//           $(go.Shape,  // the "to" arrowhead
//             new go.Binding('toArrow', 'toArrow'),
//             { scale: 0.2, fill: '#D4B52C' }),
//           {
//             click: sai,
//             toolTip:  // define a tooltip for each link that displays its information
//               $<go.Adornment>('ToolTip',
//                 $(go.TextBlock, { margin: 1 },
//                   new go.Binding('text', '', is).ofObject())
//               )
//           }
//         );
//     console.log("dia",dia);
//     return dia;
//   }

//   showArrowInfo(e: go.InputEvent, obj: go.GraphObject) : void {
//     console.log("clicked: ", e, " obj: ", obj);
//     const msg = this.infoString(obj);
//     if (msg) {
//       const status = document.getElementById('myArrowheadInfo');
//       if (status) status.textContent = msg;
//     }
//   }

//   infoString(obj: go.GraphObject) : string {
//     console.log('infoString - obj',obj);
//     let part = obj.part;
//     if (part instanceof go.Adornment) part = part.adornedPart;
//     let msg = '';
//     console.log('infoString - part',part);
//     if (part instanceof go.Link) {
//       const link = part;
//       msg = 'toArrow: ' + link.data.toArrow + ';\nfromArrow: ' + link.data.fromArrow;
//     } else if (part instanceof go.Node) {
//       const node = part;
//       const link = node.linksConnected.first();
//       if (link) msg = 'toArrow: ' + link.data.toArrow + ';\nfromArrow: ' + link.data.fromArrow;
//     }
//     return msg;
//   }

//   // When the diagram model changes, update app data to reflect those changes
//   diagramModelChange = function(changes: go.IncrementalData) {
//     // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
//     // (since this is a GoJS model changed listener event function)
//     // this way, we don't log an unneeded transaction in the Diagram's undoManager history
//     this.skipsDiagramUpdate = true;

//     this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
//     this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
//     this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
//     this.graph.nodes = this.diagramNodeData;
//     this.graph.links = this.diagramLinkData;
//     this.logger.log(this.graph);

//   }

//   initPalette(): go.Palette {
//     const $ = go.GraphObject.make;
//     const palette = $(go.Palette);

//     // define the Node template
//     palette.nodeTemplate =
//       $(go.Node, 'Auto',
//         $(go.Shape, 'RoundedRectangle',
//           {
//             stroke: null
//           },
//           new go.Binding('fill', 'color')
//         ),
//         $(go.TextBlock, { margin: 8 },
//           new go.Binding('text'))
//       );

//     palette.model = $(go.GraphLinksModel,
//       {
//         linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
//       });

//     return palette;
//   }
  
//   paletteModelChange = function(changes: go.IncrementalData) {
//     // when setting state here, be sure to set skipsPaletteUpdate: true since GoJS already has this update
//     // (since this is a GoJS model changed listener event function)
//     // this way, we don't log an unneeded transaction in the Palette's undoManager history
//     this.skipsPaletteUpdate = true;

//     this.paletteNodeData = DataSyncService.syncNodeData(changes, this.paletteNodeData);
//     this.paletteLinkData = DataSyncService.syncLinkData(changes, this.paletteLinkData);
//     this.paletteModelData = DataSyncService.syncModelData(changes, this.paletteModelData);
//   };

//   // Overview Component testing

//   initOverview(): go.Overview {
//     const $ = go.GraphObject.make;
//     const overview = $(go.Overview);
//     return overview;
//   }

//   handleInspectorChange(newNodeData) {
//     const key = newNodeData.key;
//     // find the entry in nodeDataArray with this key, replace it with newNodeData
//     let index = null;
//     for (let i = 0; i < this.diagramNodeData.length; i++) {
//       const entry = this.diagramNodeData[i];
//       if (entry.key && entry.key === key) {
//         index = i;
//       }
//     }

//     if (index >= 0) {
//       // here, we set skipsDiagramUpdate to false, since GoJS does not yet have this update
//       this.skipsDiagramUpdate = false;
//       this.diagramNodeData[index] = _.cloneDeep(newNodeData);
//       // this.diagramNodeData[index] = _.cloneDeep(newNodeData);
//     }

//     // var nd = this.observedDiagram.model.findNodeDataForKey(newNodeData.key);
//     // console.log(nd);

//   }
// }

