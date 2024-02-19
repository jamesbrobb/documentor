import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {LowerCasePipe, NgForOf, NgIf, UpperCasePipe} from "@angular/common";

import {MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";

import {ComponentLoaderIODirective, GuardTypePipe} from "@jamesbenrobb/ui";
import {ContentNode} from "@jamesbenrobb/dynamic-route-app";

import {ControlsLoaderDirective} from "../../controls/controls-loader.directive";
import {MarkdownComponent} from "../../markdown/markdown.component";
import {EntityHeaderComponent} from "../entity-header/entity-header.component";
import {EntityUsageComponent} from "../entity-usage/entity-usage.component";

import {DocsPageContent, DocsPageContentWithInfo, DocsInfoNode, isPageNodeWithInfo} from "../../../content";


@Component({
  selector: 'jbr-entity-info',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    EntityHeaderComponent,
    MarkdownComponent,
    MatDividerModule,
    EntityUsageComponent,
    GuardTypePipe,
    MatTabsModule,
    UpperCasePipe,
    LowerCasePipe,
    ControlsLoaderDirective,
    ComponentLoaderIODirective,

  ],
  templateUrl: './entity-info.component.html',
  styleUrls: ['./entity-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityInfoComponent implements OnChanges {

  @Input({required: true}) page?: ContentNode<DocsPageContent> | ContentNode<DocsPageContentWithInfo>;
  @Input() info?: DocsInfoNode;
  @Input() isLastElement: boolean = false;

  @Output() infoSelectionChange = new EventEmitter<DocsInfoNode>();

  selectedInfoIndex: number = 0;
  controlData: {[key: string]: any} = {};

  isPageNodeWithInfo = isPageNodeWithInfo;

  ngOnChanges(changes: SimpleChanges) {

    if(!this.page) {
      return;
    }

    this.controlData = {};

    if(!isPageNodeWithInfo(this.page) || !this.info) {
      return;
    }

    this.selectedInfoIndex = this.page.content.info.indexOf(this.info);
  }

  onControlDataChange(data: {[key: string]: any}): void {
    this.controlData = data;
    //console.log('onControlDataChange', this.controlData);
  }

  onSelectedIndexChange(index: number): void {

    if(!this.page || !isPageNodeWithInfo(this.page)) {
      return;
    }

    this.infoSelectionChange.emit(this.page.content.info[index]);
  }
}
