import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";

import {rotate, openClose} from "@jamesbenrobb/ui";
import {isContentNode} from "@jamesbenrobb/dynamic-route-app";

import {EntityInfoComponent} from "../entity/entity-info/entity-info.component";
import {MarkdownComponent} from "../markdown/markdown.component";
import {PageSectionsComponent} from "../page-sections/page-sections.component";
import {
  DocsRouteNode,
  DocsContentNode,
  InfoNode,
  isContentNodeWithSections,
  isInfoNode,
  getCurrentContentNode
} from "../../content";


@Component({
  selector: 'jbr-docs-page-container',
  standalone: true,
  imports: [
    NgIf,
    EntityInfoComponent,
    MarkdownComponent,
    PageSectionsComponent,
  ],
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    openClose(),
    rotate()
  ]
})
export class PageContainerComponent implements OnChanges {

  @Input({required: true}) routeNodes?: DocsRouteNode[];

  @Output() routeSelected = new EventEmitter<DocsRouteNode>();

  page?: DocsContentNode;
  section?: DocsContentNode;
  info?: InfoNode;

  sections?: DocsContentNode[];

  ngOnChanges(changes?: SimpleChanges) {

    this.page = undefined;
    this.section = undefined;
    this.info = undefined;
    this.sections = undefined;

    if(!this.routeNodes || !this.routeNodes.length) {
      return;
    }

    this.page = getCurrentContentNode(this.routeNodes);

    if(!this.page) {
      return;
    }

    const nodeIndex = this.routeNodes.indexOf(this.page),
        nodes = this.routeNodes.slice(nodeIndex + 1),
        child1 = nodes.at(0),
        child2 = nodes.at(1);

    if(isContentNodeWithSections(this.page)) {
      this.sections = this.page.content.sections;
      this.section = child1 && isContentNode(child1) ? child1 : undefined;
      this.info = isInfoNode(child2) ? child2 : undefined;
    } else {
      this.info = this.info = child1 ? isInfoNode(child1) ? child1 : undefined : undefined;
    }
  }

  onRouteSelected(node?: DocsRouteNode): void {
    console.log('onRouteSelected', node || this.page);
    this.routeSelected.emit(node || this.page);
  }
}
