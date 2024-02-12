import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {toClassCasePipe} from "@jamesbenrobb/ui";

import {EntityInfoComponent} from "../entity/entity-info/entity-info.component";
import {EntityTypeLabelComponent} from "../entity/entity-type-label/entity-type-label.component";
import {DocsContentNode, InfoNode} from "../../content";


@Component({
  selector: 'jbr-docs-page-sections',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    MatExpansionModule,
    EntityInfoComponent,
    EntityTypeLabelComponent,
    toClassCasePipe
  ],
  templateUrl: './page-sections.component.html',
  styleUrls: ['./page-sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSectionsComponent {

  @Input({required: true}) sections?: DocsContentNode[];
  @Input({required: true}) section?: DocsContentNode;
  @Input() info?: InfoNode;

  @Output() sectionSelected = new EventEmitter<DocsContentNode | undefined>();
  @Output() infoSelected = new EventEmitter<InfoNode>();

  onSectionOpened(section: DocsContentNode): void {

    if(section === this.section) {
      return;
    }

    this.sectionSelected.emit(section);
  }

  onSectionClosed(section: DocsContentNode): void {

    if(section !== this.section) {
      return;
    }

    this.sectionSelected.emit();
  }

  onInfoSelected(info: InfoNode): void {
    this.infoSelected.emit(info);
  }
}
