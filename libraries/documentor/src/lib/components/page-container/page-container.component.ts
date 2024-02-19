import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";

import {rotate, openClose} from "@jamesbenrobb/ui";
import {ContentLoaderComponentIO} from "@jamesbenrobb/dynamic-route-app";

import {EntityInfoComponent} from "../entity/entity-info/entity-info.component";
import {MarkdownComponent} from "../markdown/markdown.component";
import {PageSectionsComponent} from "../page-sections/page-sections.component";
import {
  DocsRouteNode,
  DocsInfoNode,
  DocsPageContent,
  DocsPageNode,
  DocInfoContent,
  isInfoNode, getCurrentPageNode, isPageNodeWithSections, isPageNode
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
export class PageContainerComponent implements OnChanges, ContentLoaderComponentIO<DocsPageContent | DocInfoContent> {

  @Input() routeNodes: DocsRouteNode[] | undefined;
  @Input() currentNode: DocsPageNode | DocsInfoNode | undefined
  @Input() currentContent: DocsPageContent | DocInfoContent | undefined

  @Output() routeSelected = new EventEmitter<DocsRouteNode>();

  page?: DocsPageNode;
  section?: DocsPageNode;
  info?: DocsInfoNode;

  sections?: DocsPageNode[];

  ngOnChanges(changes?: SimpleChanges) {

    this.page = undefined;
    this.section = undefined;
    this.info = undefined;
    this.sections = undefined;

    if(!this.routeNodes || !this.routeNodes.length) {
      return;
    }

    this.page = getCurrentPageNode(this.routeNodes);

    if(!this.page) {
      return;
    }

    const nodeIndex = this.routeNodes.indexOf(this.page),
        nodes = this.routeNodes.slice(nodeIndex + 1),
        child1 = nodes.at(0),
        child2 = nodes.at(1);

    if(isPageNodeWithSections(this.page)) {
      this.sections = this.page.content.sections;
    }

    if(isPageNode(child1)) {
      this.section = child1;
      this.info = isInfoNode(child2) ? child2 : undefined;
    }

    if(isInfoNode(child1)) {
      this.info = child1;
    }
  }

  onRouteSelected(node?: DocsRouteNode): void {
    this.routeSelected.emit(node || this.page);
  }
}
