// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';

// // import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
// // import * as go from 'gojs';
// import * as _ from 'lodash';

// import { Graph } from 'src/app/utils/graph.model';
// import { ErrorDialog } from 'src/app/utils/error-dialog/error-dialog';
// import { LoggingService } from 'src/app/services/logging.service';

// import * as go from 'gojs/release/go';
// import { Inspector } from 'gojs/extensions/DataInspector';
// import { RealtimeDragSelectingTool } from 'gojs/extensions/RealtimeDragSelectingTool';

//////////////////////
////// PALETTE ///////
//////////////////////

// @Component({
//   selector: 'app-visual-view',
//   templateUrl: './visual-view.component.html',
//   styleUrls: ['./visual-view.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class VisualViewComponent implements OnInit {

//   @Input() graph: Graph;
//   myDiagram: go.Diagram;
//   myPalette: go.Palette;
//   myOverview: go.Overview;
//   inspector: Inspector;
//   linkModel: string = `{ "class": "go.GraphLinksModel",
//   "nodeDataArray": [
//     { "key": 1, "text": "hello", "figure":"Circle", "color":"green", "location":"0 0" },
//     { "key": 2, "text": "world", "figure":"Rectangle", "color":"red", "location":"100 0" }
//   ],
//   "linkDataArray": [
//     { "from":1, "to":2 }
//   ]}`;

//   constructor( // Dependency Injections
//     private cdr: ChangeDetectorRef,
//     private dialog: MatDialog,
//     private logger: LoggingService,
//   ) { }


//   ngOnInit(): void {
//     // if(true) { // For testing the error message
//     if (this.graph == null) {
//       const dialogRef = this.dialog.open(ErrorDialog);

//       dialogRef.afterClosed().subscribe(result => {
//         console.log(`Dialog result: ${result}`);
//       });
//     }
//   }

//   ngAfterViewInit(): void {
//     this.init();
//   } // end ngAfterViewInit


//   // initialize diagram / templates
//   init() {

//     let $ = go.GraphObject.make;

//     // initialize main Diagram
//     this.myDiagram =
//       $(go.Diagram, "myDiagramDiv",
//         {
//           "undoManager.isEnabled": true
//         });

//     this.myDiagram.nodeTemplate =
//       $(go.Node, "Auto",
//         { locationSpot: go.Spot.Center },
//         new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
//         $(go.Shape, "Circle",
//           {
//             fill: "white", stroke: "gray", strokeWidth: 2,
//             portId: "", fromLinkable: true, toLinkable: true,
//             fromLinkableDuplicates: true, toLinkableDuplicates: true,
//             fromLinkableSelfNode: true, toLinkableSelfNode: true
//           },
//           new go.Binding("stroke", "color"),
//           new go.Binding("figure")),
//         $(go.TextBlock,
//           {
//             margin: new go.Margin(5, 5, 3, 5), font: "10pt sans-serif",
//             minSize: new go.Size(16, 16), maxSize: new go.Size(120, NaN),
//             textAlign: "center", editable: true
//           },
//           new go.Binding("text").makeTwoWay())
//       );

//     // initialize Palette
//     this.myPalette =
//       $(go.Palette, "myPaletteDiv",
//         {
//           nodeTemplate: this.myDiagram.nodeTemplate,
//           contentAlignment: go.Spot.Center,
//           layout:
//             $(go.GridLayout,
//               { wrappingColumn: 1, cellSize: new go.Size(2, 2) }),
//           "ModelChanged": function(e) {     // just for demonstration purposes,
//             if (e.isTransactionFinished) {  // show the model data in the page's TextArea
//               document.getElementById("mySavedPaletteModel").textContent = e.model.toJson();
//             }
//           }
//         });

//     // now add the initial contents of the Palette
//     this.myPalette.model.nodeDataArray = [
//       { text: "Circle", color: "blue", figure: "Circle" },
//       { text: "Square", color: "purple", figure: "Square" },
//       { text: "Ellipse", color: "orange", figure: "Ellipse" },
//       { text: "Rectangle", color: "red", figure: "Rectangle" },
//       { text: "Rounded\nRectangle", color: "green", figure: "RoundedRectangle" },
//       { text: "Triangle", color: "purple", figure: "Triangle" },
//     ];

//     // initialize Overview
//     this.myOverview =
//       $(go.Overview, "myOverviewDiv",
//         {
//           observed: this.myDiagram,
//           contentAlignment: go.Spot.Center
//         });

//     // var inspector = new Inspector('myInspectorDiv', this.myDiagram,
//     //   {
//     //     // uncomment this line to only inspect the named properties below instead of all properties on each object:
//     //     // includesOwnProperties: false,
//     //     properties: {
//     //       "text": {},
//     //       // key would be automatically added for nodes, but we want to declare it read-only also:
//     //       "key": { readOnly: true, show: Inspector.showIfPresent },
//     //       // color would be automatically added for nodes, but we want to declare it a color also:
//     //       "color": { type: 'color' },
//     //       "figure": {}
//     //     }
//     //   });

//     this.load();
//   }

//   save() {
//     this.linkModel = this.myDiagram.model.toJson();
//     this.myDiagram.isModified = false;
//   }

//   load() {
    
//     this.myDiagram.model = go.Model.fromJson(this.linkModel);
//   }


//   addToPalette() {
//     var node = this.myDiagram.selection.filter(function(p) { return p instanceof go.Node; }).first();
//     if (node !== null) {
//       this.myPalette.startTransaction();
//       var item = this.myPalette.model.copyNodeData(node.data);
//       this.myPalette.model.addNodeData(item);
//       this.myPalette.commitTransaction("added item to palette");
//     }
//   }

//   // The user cannot delete selected nodes in the Palette with the Delete key or Control-X,
//   // but they can if they do so programmatically.
//   removeFromPalette() {
//     this.myPalette.commandHandler.deleteSelection();
//   }
// }