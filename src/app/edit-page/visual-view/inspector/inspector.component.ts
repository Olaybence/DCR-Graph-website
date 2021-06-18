import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import * as go from 'gojs';
import { getType, RELATIONS, RelationTypesFrom, RelationTypesTo } from 'src/app/utils/graph.model';


@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent {

  public _selectedNode: go.Node;
  public _selectedLink: go.Link;

  public relations: Array<string> = RELATIONS; // just for HTML select
  
  // The default relation for arrows
  public defaultRelation = "Exclusion";

  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: AbstractControl = new FormControl(null);

  public linkData = null;
  public nodeData = null;

  @Input()
  public model: go.Model;
  
  @Input()
  public diagramNodeData: Array<Object>;

  @Output()
  public onFormChangeNode: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onFormChangeLink: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  get selectedNode() { return this._selectedNode; }
  set selectedNode(node: go.Node) {
    console.log("Inspector diagramNodeData", this.diagramNodeData);
    // Deselect link
    this._selectedLink = null;
    this.linkData = null;

    // Clicked on a node
    if (node) {

      this._selectedNode = node;
      this.nodeData = {
        key: node.data.key,
        color: node.data.color,
        text: node.data.text,
        pending: node.data.pending,
        loc: node.data.loc
      };

      // Clicked on the canvas's background
    } else {
      this._selectedNode = null;
      this.nodeData = null;
    }
  }

  @Input()
  get selectedLink() { return this._selectedLink; }
  set selectedLink(link: go.Link) {
    console.log("set selectedLink", link);

    // Deselect node
    this._selectedNode = null;
    this.nodeData = null;

    // If a link is selected
    if (link) {

      this._selectedLink = link;
      this.linkData = {
        key: link.key,
        type: getType(link.data.fromArrow, link.data.toArrow),
        toArrow: link.data.toArrow,
        to: link.data.to,
        fromArrow: link.data.fromArrow,
        from: link.data.from
      }

      console.log("from,to", link.data.fromArrow, link.data.toArrow);
      console.log("getType", getType(link.data.fromArrow, link.data.toArrow));

      // Clicked on the canvas's background
    } else { // No link selected
      this._selectedLink = null;
      this.linkData = null;
    }

    // Set a default relations if there wasn't
    if (this.linkData && (!this.linkData.toArrow || !this.linkData.fromArrow)) {
      this.linkData.toArrow = RelationTypesTo[this.defaultRelation];
      this.linkData.fromArrow = RelationTypesFrom[this.defaultRelation];
      
      this._selectedLink = this.linkData;
      this._selectedNode = null;
      this.onFormChangeLink.emit(this.linkData);
    }
    console.log("linkData", this.linkData);
  }

  constructor() { }

  public onCommitNodeForm() {
    console.log("onCommitNodeForm", this.nodeData);
    this.onFormChangeNode.emit(this.nodeData);
  }

  public onCommitLinkForm() {
    console.log("onCommitLinkForm", this.linkData);
    this.linkData.fromArrow = RelationTypesFrom[this.linkData.type];
    this.linkData.toArrow = RelationTypesTo[this.linkData.type];
    this.onFormChangeLink.emit(this.linkData);
  }
}
