import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {toClassCasePipe} from "@jamesbenrobb/ui";

import {EntityInfoComponent} from "../entity/entity-info/entity-info.component";
import {EntityTypeLabelComponent} from "../entity/entity-type-label/entity-type-label.component";
import {DocsPageNode, DocsInfoNode} from "../../content";


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

  @Input({required: true}) sections?: DocsPageNode[];
  @Input({required: true}) section?: DocsPageNode;
  @Input() info?: DocsInfoNode;

  @Output() sectionSelected = new EventEmitter<DocsPageNode | undefined>();
  @Output() infoSelected = new EventEmitter<DocsInfoNode>();

  onSectionOpened(section: DocsPageNode): void {

    if(section === this.section) {
      return;
    }

    this.sectionSelected.emit(section);
  }

  onSectionClosed(section: DocsPageNode): void {

    if(section !== this.section) {
      return;
    }

    this.sectionSelected.emit();
  }

  onInfoSelected(info: DocsInfoNode): void {
    this.infoSelected.emit(info);
  }
}
