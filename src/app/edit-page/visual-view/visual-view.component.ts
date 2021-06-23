import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as go from 'gojs';
import * as _ from 'lodash';

/// FROM HERE YOU CAN HAVE MORE ANGULAR COMPONENTS
import { DataSyncService, DiagramComponent, PaletteComponent, OverviewComponent } from 'gojs-angular';

/// OUR STUFF
import { Graph, RelationTypesTo, RelationTypesFrom, getType } from 'src/app/utils/graph.model';
import { LoggingService } from 'src/app/services/logging.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProjectDialog } from './edit-project-dialog';


/// Here they are finally ran before we use them in the model
/// (The link click red text)

/// TODO: make these change the text of the HTML element (but they already have the changes, so rather suit the !!!INSPECTOR Ins ARROWS!!!)

// a conversion function used to get arrowhead information for a Part
export function infoString(obj: go.GraphObject) {
  // console.log("infoString", obj);
  let part = obj.part;
  if (part instanceof go.Adornment) part = part.adornedPart;
  let msg = '';
  if (part instanceof go.Link) {
    const link = part;
    msg = getType(link.data.fromArrow, link.data.toArrow);
    // msg = 'toArrow: ' + link.data.toArrow + ';\nfromArrow: ' + link.data.fromArrow;
  } else if (part instanceof go.Node) {
    const node = part;
    const link = node.linksConnected.first();
    if (link) msg = 'No parameters assigned';
  }

  return msg;
}

// a GraphObject.click event handler to show arrowhead information
export function showInfo(e: go.InputEvent, obj: go.GraphObject) {
  // console.log("showinfo", obj);
  const msg = infoString(obj);
  if (msg) {
    const status = document.getElementById('myArrowheadInfo');
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

  public defaultRelation = "Exclusion";
  public defaultLink = {
    relation: this.defaultRelation,
    toArrow: RelationTypesTo[this.defaultRelation],
    fromArrow: RelationTypesFrom[this.defaultRelation]
  }
  public defaultNode: Object = {
    name: "Default",
    color: null,
    text: "default text",
    pending: false,
  };

  /// initDiagram() IS THE MAIN STUFF WHAT BUILDS OUR TOOLS
  /// REPLACE THIS FROM SAMPLES AND WILL WORK IN GENERAL

  myDiagram: go.Diagram;

  // initialize diagram / templates
  public initDiagram(): go.Diagram {

    const $ = go.GraphObject.make;
    this.myDiagram = $(go.Diagram, {
      
      // Undo enabled
      'undoManager.isEnabled': true,
      
      // Grouping enabled
      'commandHandler.archetypeGroupData': { text: 'Group', isGroup: true, color: 'blue' },
      
      model: $(go.GraphLinksModel,
        {
          /// Basic link properties
          linkToPortIdProperty: 'toPort',
          linkFromPortIdProperty: 'fromPort',
          linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    this.myDiagram.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };

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
    this.myDiagram.nodeTemplate =
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
        // Location
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        /// Shape of the Nodes
        $(go.Panel, 'Auto',
          $(go.Shape, 'RoundedRectangle', { stroke: null },
            new go.Binding('fill', 'color')
          ),
          $(go.TextBlock, { margin: 8 },
            new go.Binding('text'))
        ),

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
        {
          /// The click and show red text (Not shows rn, but called)
          click: showInfo,
          toolTip:  // define a tooltip for each link that displays its information
            $<go.Adornment>('ToolTip',
              $(go.TextBlock, { margin: 4 },
                new go.Binding('text', '', infoString).ofObject())
            ),
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

    // Group template
    // this.myDiagram.groupTemplate = $(go.Group, { });

    /// Link  properties
    this.myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel

        /// The type of curving and stuff
        {
          routing: go.Link.Orthogonal,
          curve: go.Link.JumpOver,
          corner: 10
        },

        /// General stuff (doesn't works without it)
        $(go.Shape,  // the link shape
          // the first element is assumed to be main element: as if isPanelMain were true
          { stroke: 'gray', strokeWidth: 2 }),

        /// One end definition
        $(go.Shape,  // the "from" arrowhead
          new go.Binding('fromArrow', 'fromArrow'),
          { scale: 2, fill: '#969696' }),

        /// And the other end definition
        $(go.Shape,  // the "to" arrowhead
          new go.Binding('toArrow', 'toArrow'),
          { scale: 2, fill: '#969696' }),

        /// General propoerties
        {
          /// The click and show red text (Not shows rn, but called)
          click: showInfo,
          toolTip:  // define a tooltip for each link that displays its information
            $<go.Adornment>('ToolTip',
              $(go.TextBlock, { margin: 4 },
                new go.Binding('text', '', infoString).ofObject())
            ),
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
    console.log("fuck you", this.myDiagram);
    return this.myDiagram;
  }


  /// The basic nodes we start with (MISTAKE/MISSING CAN DO WIERD STUFF)
  public diagramNodeData: Array<go.ObjectData> = [];

  /// The links we have (MISTAKE/MISSING CAN DO WIERD STUFF)
  public diagramLinkData: Array<go.ObjectData> = [];

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

    // CHANGE REGARGDING LINKS
    // This part is for new links to give them a default relation
    if (changes && changes.modifiedLinkData && changes.modifiedLinkData.length >= 1) {
      console.log("changes", changes.modifiedLinkData[0].toArrow);
      changes.modifiedLinkData.map((link, i) => {
        if (!link.toArrow) {
          link.toArrow = RelationTypesTo[this.defaultRelation];
          link.fromArrow = RelationTypesFrom[this.defaultRelation];
          changes.modifiedLinkData[i] = _.cloneDeep(link);
        }
      });
      console.log("changes", changes.modifiedLinkData[0].toArrow);
    }
    
    // CHANGE - REGARGDING NODES
    // Add pending if it's null
    if (changes && changes.modifiedNodeData && changes.modifiedNodeData.length >= 1) {
      changes.modifiedNodeData.map((node, i) => {
        console.log("changes", i, node.pending);
        if (!node.pending) {
          node.pending = false;
          changes.modifiedNodeData[i] = _.cloneDeep(node);
        }
        console.log("changes", i, node.toArrow);
      });
    }

    // Loading in the changes
    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
    this.graph.nodes = this.diagramNodeData;
    this.graph.links = this.diagramLinkData;

    console.log("this.myDiagramComponent.diagram.diagramNodeData", this.myDiagramComponent.diagram.diagramNodeData);
    console.log("this.diagramNodeData", this.diagramNodeData, "this.diagramLinkData", this.diagramLinkData);

    // Testing the toJson to get the whole data to the back-end
    // if (this.myDiagram && this.myDiagram.model) {
    //   console.log("myDiagram.model", this.myDiagram.model.toJson());
    // }
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
          new go.Binding('text')),

      );

    palette.model = $(go.GraphLinksModel,
      {
        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      });

    return palette;
  }
  public paletteNodeData: Array<go.ObjectData> = [
    { key: '0', text: "New Node", color: 'white' }
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
  
  public startNode = {"color":"white","key":"-1", "loc":"155 -138", "category":"Start","text":"Start"};
  public endNode = {"color":"white","key":"-2", "loc":"757 229", "category":"End","text":"End"};
  public ngAfterViewInit() {
    console.log("ngAfterViewInit", this.graph);


    // this.diagramNodeData.push(this.startNode);
    // this.diagramNodeData.push(this.endNode);
    this.graph.nodes.map(node => this.diagramNodeData.push(node));
    this.diagramLinkData = this.graph.links;

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
    console.log("handleInspectorChangeLink newLinkData", newLinkData);
    console.log("newLinkData.key", newLinkData.key);
    console.log("this.diagramLinkData", this.diagramLinkData);

    const index = this.diagramLinkData.map(link => link.key).indexOf(newLinkData.key);
    console.log(index);
    if (index >= 0) {
      // here, we set skipsDiagramUpdate to false, since GoJS does not yet have this update
      this.skipsDiagramUpdate = false;
      this.diagramLinkData[index] = _.cloneDeep(newLinkData);
    }

  }

  public handleInspectorChangeNode(newNodeData) {
    console.log("handleInspectorChangeNode", newNodeData);

    const index = this.diagramNodeData.map(link => link.key).indexOf(newNodeData.key);

    if (index >= 0) {
      // here, we set skipsDiagramUpdate to false, since GoJS does not yet have this update
      this.skipsDiagramUpdate = false;

      console.log("newNodeData", newNodeData);
      this.diagramNodeData[index] = _.cloneDeep(newNodeData);
      console.log("this.diagramNodeData[index]", index, this.diagramNodeData[index]);

    }
  }

  // public addObject(): void {
  //   // this.myDiagram.model.addLinkData({ from: "Alpha", to: "Beta" });
  // }

  editProject() {
    // TODO: Edit Project
    const dialogRef = this.dialog.open(EditProjectDialog, {
      width: '250px',
      data: { graph: this.graph }
    });  
  }
}


