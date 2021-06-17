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
  
  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  colorCtr: AbstractControl = new FormControl(null);

  public nodeData = {
    key: null,
    color: null,
    text: null,
    pending: null
  };
  public linkData = {
    key: null,
    type: null,
    to: null,
    from: null,
    toArrow: null,
    fromArrow: null
  }

  @Input()
  public model: go.Model;

  @Output()
  public onFormChangeNode: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onFormChangeLink: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  get selectedNode() { return this._selectedNode; }
  set selectedNode(node: go.Node) {
    this._selectedLink = null;
    this.linkData = {
      key: null,
      type: null,
      toArrow: null,
      to: null,
      fromArrow: null,
      from: null
    };

    if (node) {

      this._selectedNode = node;
      this.nodeData = {
        key: this._selectedNode.data.key,
        color: this._selectedNode.data.color,
        text: this._selectedNode.data.text,
        pending: this._selectedNode.data.pending
      };

    } else {

      this._selectedNode = null;
      this.nodeData = {
        key: null,
        color: null,
        text: null,
        pending: null
      };

    }
  }

  @Input()
  get selectedLink() { return this._selectedLink; }
  set selectedLink(link: go.Link) {
    console.log("set selectedLink", link);

    // Remove selected node 
    this._selectedNode = null;
    this.nodeData = {
      key: null,
      color: null,
      text: null,
      pending: null
    };

    // If a link is selected
    if (link) {

      this._selectedLink = link;
      this.linkData = {
        key: this._selectedLink.key,
        type: getType(this._selectedLink.data.fromArrow, this._selectedLink.data.toArrow),
        toArrow: this._selectedLink.data.toArrow,
        to: this._selectedLink.data.to,
        fromArrow: this._selectedLink.data.fromArrow,
        from: this._selectedLink.data.from
      }

      console.log("from,to", this._selectedLink.data.fromArrow, this._selectedLink.data.toArrow);
      console.log("getType", getType(this._selectedLink.data.fromArrow, this._selectedLink.data.toArrow));

    } else { // No link selected

      this._selectedLink = null;
      this.linkData = {
        key: null,
        type: null,
        toArrow: null,
        to: null,
        fromArrow: null,
        from: null
      }

    }
    console.log("linkData",this.linkData);
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
