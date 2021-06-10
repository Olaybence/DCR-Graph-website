import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as go from 'gojs';
import { RelationTypes } from 'src/app/utils/graph.model';


@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.css']
})
export class InspectorComponent {

  public _selectedNode: go.Node;
  public _selectedLink: go.Link;
  public relations: Array<KeyValue<string,RelationTypes>> = [
    {
      key: "Condition",
      value:RelationTypes.Condition
    },
    {
      key: "Exclusion",
      value:RelationTypes.Exclusion
    },
    {
      key: "Inclusion",
      value:RelationTypes.Inclusion
    },
    {
      key: "Milestone",
      value:RelationTypes.Milestone
    },
    {
      key: "Response",
      value:RelationTypes.Response
    },
    {
      key: "Spawn",
      value:RelationTypes.Spawn
    }
  ];

  public nodeData = {
    key: null,
    color: null,
    text: null
  };
  public linkData = {
    key: null,
    toArrow: null,
    // fromArrow: null
  }

  @Input()
  public model: go.Model;

  @Output()
  public onFormChangeNode: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onFormChangeLink: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  get selectedNode() {
    // console.log("get selectedNode");
    return this._selectedNode; }
  set selectedNode(node: go.Node) {
    if (node) {
      // console.log("set SelectedNode",node);
      this._selectedNode = node;
      this._selectedLink = null;

      this.nodeData.key = this._selectedNode.data.key;
      this.nodeData.color = this._selectedNode.data.color;
      this.nodeData.text = this._selectedNode.data.text;
    } else {
      // console.log("set SelectedNode - null");
      this._selectedNode = null;
      this._selectedLink = null;

      this.nodeData.key = null;
      this.nodeData.color = null;
      this.nodeData.text = null;

      this.linkData.toArrow = null;
    }
  }

  @Input()
  get selectedLink() {
    // console.log("get selectedLink");
    return this._selectedLink;
  }
  set selectedLink(link: go.Link) {
    if (link) {
      console.log("set selectedLink", link);
      this._selectedLink = link;
      this._selectedNode = null;

      this.linkData.key = this._selectedLink.key;
      this.linkData.toArrow = this._selectedLink.data.toArrow;
      console.log("linkData",this.linkData);
      console.log("_selectedLink",this._selectedLink);
    } else {
      this._selectedLink = null;
      this._selectedNode = null;

      this.linkData.key = null;
      this.linkData.toArrow = null;

      this.nodeData.key = null;
      this.nodeData.color = null;
      this.nodeData.text = null;
    }
  }

  constructor() {
    console.log("relations",this.relations);
  }

  public onCommitNodeForm() {
    this.onFormChangeNode.emit(this.nodeData);
  }

  public onCommitLinkForm() {
    this.onFormChangeLink.emit(this.linkData);
  }
}
