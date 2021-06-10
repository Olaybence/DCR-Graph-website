import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as go from 'gojs';
import * as _ from 'lodash';

/// FROM HERE YOU CAN HAVE MORE ANGULAR COMPONENTS
import { DataSyncService, DiagramComponent, PaletteComponent, OverviewComponent } from 'gojs-angular';

/// ACHIEVEMENT: REALTIME SELECTION FROM THE EXTENSION FOLDER
/// WORKS
import { RealtimeDragSelectingTool } from 'GoJS-Samples/extensionsTS/RealtimeDragSelectingTool';

/// OUR STUFF
import { Graph, RelationTypes } from 'src/app/utils/graph.model';
import { ErrorDialog } from 'src/app/utils/error-dialog/error-dialog';
import { LoggingService } from 'src/app/services/logging.service';
import { MatDialog } from '@angular/material/dialog';


/// Here they are finally ran before we use them in the model
/// (The link click red text)

/// TODO: make these change the text of the HTML element (but they already have the changes, so rather suit the !!!INSPECTOR HANDLE ARROWS!!!)

// a conversion function used to get arrowhead information for a Part
export function infoString(obj: go.GraphObject) {
  console.log("infoString", obj);
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
    console.log(document);
    console.log(document.getElementById);
    console.log(document.getElementById('myArrowheadInfo'));
    console.log('msg', msg);
    console.log('e', e, 'obj', obj);
    if (status) status.textContent = msg;
  }
}


@Component({
  selector: 'app-visual-view',
  templateUrl: './visual-view.component.html',
  styleUrls: ['./visual-view.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VisualViewComponent {

  @Input() graph: Graph;

  @ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;
  @ViewChild('myPalette', { static: true }) public myPaletteComponent: PaletteComponent;


  /// initDiagram() IS THE MAIN STUFF WHAT BUILDS OUR TOOLS
  /// REPLACE THIS FROM SAMPLES AND WILL WORK IN GENERAL

  // initialize diagram / templates
  public initDiagram(): go.Diagram {
    // let sai = this.showArrowInfo;
    // let infoString = this.infoString;
    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true,
      'commandHandler.archetypeGroupData': { text: 'Group', isGroup: true, color: 'blue' },
      // THIS IS FOR THE REALTIME SELECTING THAT WORKS IN THE BASIC SAMPLE PROJECT
      // TODO: MAKE IT TWERK
      // dragSelectingTool: $(RealtimeDragSelectingTool, { isPartialInclusion: true }),
      model: $(go.GraphLinksModel,
        {
          /// Basic link properties
          linkToPortIdProperty: 'toPort',
          linkFromPortIdProperty: 'fromPort',
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };

    // Create functions for the ports
    const makePort = function (id: string, spot: go.Spot) {
      return $(go.Shape, 'Circle',
        {
          opacity: .5,
          fill: 'gray', strokeWidth: 0, desiredSize: new go.Size(8, 8),
          portId: id, alignment: spot,
          fromLinkable: true, toLinkable: true
        }
      );
    }


    /// HOW NODES LOOKS LIKE IN GENERAL
    // define the Node template
    dia.nodeTemplate =
      $(go.Node, 'Spot', // It's a Sport typed Node

        /// Click function on the nodes
        {
          contextMenu:
            $('ContextMenu',
              $('ContextMenuButton',
                $(go.TextBlock, 'Group'),
                { click: function (e, obj) { e.diagram.commandHandler.groupSelection(); } },
                new go.Binding('visible', '', function (o) {
                  return o.diagram.selection.count > 1;
                }).ofObject())
            )
        },

        /// Shape of the Nodes
        $(go.Panel, 'Auto',
          $(go.Shape, 'RoundedRectangle', { stroke: null },
            new go.Binding('fill', 'color')
          ),
          $(go.TextBlock, { margin: 8 },
            new go.Binding('text'))
        ),

        // /// Pending Response
        // // Not working with built in figures
        // // Club doesn't exists (idk what does)
        // $(go.Shape, {
        //   alignment: go.Spot.TopRight,
        //   // figure: "Club",
        //   width: 40,
        //   height: 40,
        //   margin: 4
        // }),

        /// Pending Response (! on the right top corner)
        $(go.Shape,
          {
            alignment: go.Spot.TopRight,
            width: 20,
            height: 20,
            margin: 3,
            fill: "black",
            strokeWidth: 1.5,
            visible: false,
            /// Exclamation with circle
            geometryString: "M22.675 0.02c-0.006 0-0.014 0.001-0.02 0.001c-0.007 0-0.013-0.001-0.02-0.001C10.135 0.02 0 10.154 0 22.656 c0 12.5 10.135 22.635 22.635 22.635c0.007 0 0.013 0 0.02 0c0.006 0 0.014 0 0.02 0c12.5 0 22.635-10.135 22.635-22.635 C45.311 10.154 35.176 0.02 22.675 0.02z M22.675 38.811c-0.006 0-0.014-0.001-0.02-0.001c-0.007 0-0.013 0.001-0.02 0.001 c-2.046 0-3.705-1.658-3.705-3.705c0-2.045 1.659-3.703 3.705-3.703c0.007 0 0.013 0 0.02 0c0.006 0 0.014 0 0.02 0 c2.045 0 3.706 1.658 3.706 3.703C26.381 37.152 24.723 38.811 22.675 38.811z M27.988 10.578 c-0.242 3.697-1.932 14.692-1.932 14.692c0 1.854-1.519 3.356-3.373 3.356c-0.01 0-0.02 0-0.029 0c-0.009 0-0.02 0-0.029 0 c-1.853 0-3.372-1.504-3.372-3.356c0 0-1.689-10.995-1.931-14.692C17.202 8.727 18.62 5.29 22.626 5.29 c0.01 0 0.02 0.001 0.029 0.001c0.009 0 0.019-0.001 0.029-0.001C26.689 5.29 28.109 8.727 27.988 10.578z"
          },
          /// The property for toggling
          new go.Binding("visible", "pending")
        ),

        // Ports
        // It was easier for them to make a function, but they are above
        makePort('t', go.Spot.TopCenter), // id, position
        makePort('l', go.Spot.Left),
        makePort('r', go.Spot.Right),
        makePort('b', go.Spot.BottomCenter),

        // makePort('fuckYouHole', go.Spot.BottomLeft), /// hihi :)
      );


    /// Link  properties
    dia.linkTemplate =
      $(go.Link,  // the whole link panel

        /// The type of curving and stuff
        { routing: go.Link.Normal },

        /// General stuff (doesn't works without it)
        $(go.Shape,  // the link shape
          // the first element is assumed to be main element: as if isPanelMain were true
          { stroke: 'gray', strokeWidth: 2 }),

        /// One end definition
        $(go.Shape,  // the "from" arrowhead
          new go.Binding('fromArrow', 'fromArrow'),
          { scale: 2, fill: '#D4B52C' }),

        /// And the other end definition
        $(go.Shape,  // the "to" arrowhead
          new go.Binding('toArrow', 'toArrow'),
          { scale: 2, fill: '#D4B52C' }),

        /// General propoerties
        {
          /// The click and show red text (Not shows rn, but called)
          click: showArrowInfo,
          // toolTip:  // define a tooltip for each link that displays its information
          //   $<go.Adornment>('ToolTip',
          //     $(go.TextBlock, { margin: 4 },
          //       new go.Binding('text', '', infoString).ofObject())
          //   )
          contextMenu:
            $('ContextMenu',
              $('ContextMenuButton',
                $(go.TextBlock, 'Group'),
                { click: function (e, obj) { e.diagram.commandHandler.groupSelection(); } },
                new go.Binding('visible', '', function (o) {
                  return o.diagram.selection.count > 1;
                }).ofObject())
            )
        }
      );

    return dia;
  }


  /// The basic nodes we start with (MISTAKE/MISSING CAN DO WIERD STUFF)
  public diagramNodeData: Array<go.ObjectData> = [
    { key: 'Alpha', text: "Node Alpha", color: 'lightblue', pending: true },
    { key: 'Beta', text: "Node Beta", color: 'orange' },
    { key: 'Gamma', text: "Node Gamma", color: 'lightgreen' },
    { key: 'Delta', text: "Node Delta", color: 'pink', pending: true }
  ];

  /// The links we have (MISTAKE/MISSING CAN DO WIERD STUFF)
  public diagramLinkData: Array<go.ObjectData> = [
    { key: -1, from: 'Alpha', to: 'Beta', fromPort: 'r', toPort: 'l', toArrow: RelationTypes.Exclusion, fromArrow: "" },
    { key: -2, from: 'Alpha', to: 'Gamma', fromPort: 'b', toPort: 't', toArrow: RelationTypes.Inclusion, fromArrow: "" },
    { key: -3, from: 'Gamma', to: 'Delta', fromPort: 'r', toPort: 'l', toArrow: RelationTypes.Condition, fromArrow: "" },
    { key: -4, from: 'Delta', to: 'Alpha', fromPort: 't', toPort: 'r', toArrow: RelationTypes.Condition, fromArrow: "" }
  ];


  public diagramDivClassName: string = 'myDiagramDiv';
  public diagramModelData = { prop: 'value' };
  public skipsDiagramUpdate = false;

  /// DATA SYNC STUFF
  // When the diagram model changes, update app data to reflect those changes
  public diagramModelChange = function (changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    this.skipsDiagramUpdate = true;

    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
    this.graph.nodes = this.diagramNodeData;
    this.graph.links = this.diagramLinkData;
    this.logger.log(this.graph);
  };


  /// The palette definition
  public initPalette(): go.Palette {
    const $ = go.GraphObject.make;
    const palette = $(go.Palette);

    // define the Node template
    palette.nodeTemplate =
      $(go.Node, 'Auto',

        $(go.Shape, 'RoundedRectangle', /// The shape (find different ones online)
          {
            /// Base customization
            stroke: null,
            /// START TYPING and will suggest if exists (like width)
          },

          // Value parameterizing
          new go.Binding('fill', 'color')
        ),

        $(go.TextBlock, { margin: 8 },
          new go.Binding('text'))
      );

    palette.model = $(go.GraphLinksModel,
      {
        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      });

    return palette;
  }
  public paletteNodeData: Array<go.ObjectData> = [
    { key: '0', text: "PaletteNode1", color: 'red' }
  ];
  public paletteLinkData: Array<go.ObjectData> = [
    {}
  ];
  public paletteModelData = { prop: 'val' };
  public paletteDivClassName = 'myPaletteDiv';
  public skipsPaletteUpdate = false;
  public paletteModelChange = function (changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsPaletteUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Palette's undoManager history
    this.skipsPaletteUpdate = true;

    this.paletteNodeData = DataSyncService.syncNodeData(changes, this.paletteNodeData);
    this.paletteLinkData = DataSyncService.syncLinkData(changes, this.paletteLinkData);
    this.paletteModelData = DataSyncService.syncModelData(changes, this.paletteModelData);
  };

  constructor(private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private logger: LoggingService,) { }

  // Overview Component testing
  public oDivClassName = 'myOverviewDiv';
  public initOverview(): go.Overview {
    const $ = go.GraphObject.make;
    const overview = $(go.Overview);
    return overview;
  }
  public observedDiagram = null;

  // currently selected node; for inspector
  public selectedNode: go.Node | null = null;
  public selectedLink: go.Link | null = null;

  public ngAfterViewInit() {

    if (this.observedDiagram) return;
    this.observedDiagram = this.myDiagramComponent.diagram;
    this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

    const appComp: VisualViewComponent = this;
    // listener for inspector
    this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', function (e) {
      if (e.diagram.selection.count === 0) {
        appComp.selectedNode = null;
      }
      const target = e.diagram.selection.first();
      if (target instanceof go.Node) {
        appComp.selectedNode = target;
      } else if (target instanceof go.Link) {
        appComp.selectedLink = target;
      } else {
        appComp.selectedNode = null;
      }
    });

  } // end ngAfterViewInit


  public handleInspectorChangeLink(newLinkData) {
    console.log("handleInspectorChangeLink", newLinkData);
    const key = newLinkData.key;

    // find the entry in nodeDataArray with this key, replace it with newLinkData
    let index = null;
    for (let i = 0; i < this.diagramLinkData.length; i++) {
      const entry = this.diagramLinkData[i];
      if (entry.key && entry.key === key) {
        index = i;
      }
    }

    if (index >= 0) {
      // here, we set skipsDiagramUpdate to false, since GoJS does not yet have this update
      this.skipsDiagramUpdate = false;
      this.diagramLinkData[index] = _.cloneDeep(newLinkData);
      // this.diagramNodeData[index] = _.cloneDeep(newNodeData);
    }

    // var nd = this.observedDiagram.model.findNodeDataForKey(newNodeData.key);
    // console.log(nd);

  }
  public handleInspectorChangeNode(newNodeData) {
    console.log("handleInspectorChangeLink", newNodeData);
    const key = newNodeData.key;

    // Node
    let index = null;
    for (let i = 0; i < this.diagramNodeData.length; i++) {
      const entry = this.diagramNodeData[i];
      if (entry.key && entry.key === key) {
        index = i;
      }
    }

    if (index >= 0) {
      // here, we set skipsDiagramUpdate to false, since GoJS does not yet have this update
      this.skipsDiagramUpdate = false;
      this.diagramNodeData[index] = _.cloneDeep(newNodeData);
      // this.diagramNodeData[index] = _.cloneDeep(newNodeData);
    }

    // var nd = this.observedDiagram.model.findNodeDataForKey(newNodeData.key);
    // console.log(nd);
  }

  status: string = "asd";
  // a conversion function used to get arrowhead information for a Part
  infoString(obj: go.GraphObject) {
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
  showArrowInfo(e: go.InputEvent, obj: go.GraphObject) {
    const msg = this.infoString(obj);
    if (msg) {
      this.status = msg;
    }
  }
}
