import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as go from 'gojs';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import * as _ from 'lodash';

import { GraphService } from 'src/app/services/graph.service';
import { Graph } from 'src/app/utils/graph.model';

@Component({
  selector: 'app-visual-view',
  templateUrl: './visual-view.component.html',
  styleUrls: ['./visual-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VisualViewComponent implements OnInit {

  @Input() graph: Graph;

  @ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;
  @ViewChild('myPalette', { static: true }) public myPaletteComponent: PaletteComponent;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  // initialize diagram / templates
  public initDiagram(): go.Diagram {

    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true,
      model: $(go.GraphLinksModel,
        {
          linkToPortIdProperty: 'toPort',
          linkFromPortIdProperty: 'fromPort',
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };

    const makePort = function(id: string, spot: go.Spot) {
      return $(go.Shape, 'Circle',
        {
          opacity: .5,
          fill: 'gray', strokeWidth: 0, desiredSize: new go.Size(8, 8),
          portId: id, alignment: spot,
          fromLinkable: true, toLinkable: true
        }
      );
    }

    // define the Node template
    dia.nodeTemplate =
      $(go.Node, 'Spot',
        {
          contextMenu:
            $('ContextMenu',
              $('ContextMenuButton',
                $(go.TextBlock, 'Group'),
                { click: function(e, obj) { e.diagram.commandHandler.groupSelection(); } },
                new go.Binding('visible', '', function(o) {
                  return o.diagram.selection.count > 1;
                }).ofObject())
            )
        },
        $(go.Panel, 'Auto',
          $(go.Shape, 'RoundedRectangle', { stroke: null },
            new go.Binding('fill', 'color')
          ),
          $(go.TextBlock, { margin: 8 },
            new go.Binding('text'))
        ),
        // Ports
        makePort('t', go.Spot.TopCenter),
        makePort('l', go.Spot.Left),
        makePort('r', go.Spot.Right),
        makePort('b', go.Spot.BottomCenter)
      );

    return dia;
  }

  public diagramNodeData: Array<go.ObjectData> = [
    { key: 'Alpha', text: "Node Alpha", color: 'lightblue' },
    { key: 'Beta', text: "Node Beta", color: 'orange' },
    { key: 'Gamma', text: "Node Gamma", color: 'lightgreen' },
    { key: 'Delta', text: "Node Delta", color: 'pink' }
  ];
  public diagramLinkData: Array<go.ObjectData> = [
    { key: -1, from: 'Alpha', to: 'Beta', fromPort: 'r', toPort: 'l' },
    { key: -2, from: 'Alpha', to: 'Gamma', fromPort: 'b', toPort: 't' },
    { key: -3, from: 'Beta', to: 'Beta' },
    { key: -4, from: 'Gamma', to: 'Delta', fromPort: 'r', toPort: 'l' },
    { key: -5, from: 'Delta', to: 'Alpha', fromPort: 't', toPort: 'r' }
  ];
  public diagramDivClassName: string = 'myDiagramDiv';
  public diagramModelData = { prop: 'value' };
  public skipsDiagramUpdate = false;

  // When the diagram model changes, update app data to reflect those changes
  public diagramModelChange = function(changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    this.skipsDiagramUpdate = true;

    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
  };



  public initPalette(): go.Palette {
    const $ = go.GraphObject.make;
    const palette = $(go.Palette);

    // define the Node template
    palette.nodeTemplate =
      $(go.Node, 'Auto',
        $(go.Shape, 'RoundedRectangle',
          {
            stroke: null
          },
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
    { key: 'PaletteNode1', text: "PaletteNode1", color: 'red' },
    { key: 'PaletteNode2', text: "PaletteNode2", color: 'yellow' }
  ];
  public paletteLinkData: Array<go.ObjectData> = [
    {  }
  ];
  public paletteModelData = { prop: 'val' };
  public paletteDivClassName = 'myPaletteDiv';
  public skipsPaletteUpdate = false;
  public paletteModelChange = function(changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsPaletteUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Palette's undoManager history
    this.skipsPaletteUpdate = true;

    this.paletteNodeData = DataSyncService.syncNodeData(changes, this.paletteNodeData);
    this.paletteLinkData = DataSyncService.syncLinkData(changes, this.paletteLinkData);
    this.paletteModelData = DataSyncService.syncModelData(changes, this.paletteModelData);
  };

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

  public ngAfterViewInit() {

    if (this.observedDiagram) return;
    this.observedDiagram = this.myDiagramComponent.diagram;
    this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

    const appComp: VisualViewComponent = this;
    // listener for inspector
    this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', function(e) {
      if (e.diagram.selection.count === 0) {
        appComp.selectedNode = null;
      }
      const node = e.diagram.selection.first();
      if (node instanceof go.Node) {
        appComp.selectedNode = node;
      } else {
        appComp.selectedNode = null;
      }
    });

  } // end ngAfterViewInit


  public handleInspectorChange(newNodeData) {
    const key = newNodeData.key;
    // find the entry in nodeDataArray with this key, replace it with newNodeData
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
}

