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

  // Selected Node and Link
  public _selectedNode: go.Node;
  public _selectedLink: go.Link;
  
  // Form data coming in
  public nodeData = null;
  public linkData = null;

  public relations: Array<string> = RELATIONS; // just for HTML select
  
  // The default relation for arrows
  public defaultRelation = "Exclusion";

  @Input()
  public model: go.Model;
  
  @Input()
  public diagramNodeData: Array<Object>;
  @Input()
  public diagramLinkData: Array<Object>;

  @Output()
  public onFormChangeNode: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onFormChangeLink: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  get selectedNode() { return this._selectedNode; }
  set selectedNode(node: go.Node) {
    console.log("SelectedNode", node);
    
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
    console.log("selectedLink", link);

    // Deselect node
    this._selectedNode = null;
    this.nodeData = null;

    // If a link is selected
    if (link) {
      console.log("set selectedLink", link.data);
      this._selectedLink = link;
      this.linkData = {
        key: link.key,
        type: getType(link.data.fromArrow, link.data.toArrow),
        toArrow: link.data.toArrow,
        to: link.data.to,
        fromArrow: link.data.fromArrow,
        from: link.data.from
      }

      // Clicked on the canvas's background
    } else { // No link selected
      this._selectedLink = null;
      this.linkData = null;
    }

    // Set a default relations if there wasn't
    if (this.linkData && 
        (this.linkData.toArrow == null || this.linkData.toArrow == undefined || 
          this.linkData.fromArrow == null || this.linkData.fromArrow == undefined)) {
      
      // Set the default on the editor
      this.linkData.type = this.defaultRelation;
      // Set the link arrows
      this.linkData.toArrow = RelationTypesTo[this.defaultRelation];
      this.linkData.fromArrow = RelationTypesFrom[this.defaultRelation];
      
      this._selectedLink = this.linkData;
      
      // Deselect node
      this._selectedNode = null;
      
      this.onFormChangeLink.emit(this.linkData);
    }
  }

  constructor() { }

  public onCommitNodeForm() {
    // This is needed to keep the node in place if it's moved after selection
    this.nodeData.loc = this._selectedNode.data.loc;
    
    this.onFormChangeNode.emit(this.nodeData);
  }

  public onCommitLinkForm() {
    // In order to transform the type data to an acceptable format for GoJS we make those to 
    this.linkData.fromArrow = RelationTypesFrom[this.linkData.type];
    this.linkData.toArrow = RelationTypesTo[this.linkData.type];

    this.onFormChangeLink.emit(this.linkData);
  }
}
