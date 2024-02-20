import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';
import {NgIf, NgFor} from "@angular/common";
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";
import {ContentHideComponent, HrefInterceptorHandler, MarkdownComponent} from "@jamesbenrobb/ui";

import {DocsPageContentUsage} from "../../../content";


@Component({
  selector: 'jbr-entity-usage',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatTabsModule,
    MatDividerModule,
    ContentHideComponent,
    MarkdownComponent
  ],
  templateUrl: './entity-usage.component.html',
  styleUrl: './entity-usage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityUsageComponent {

  @Input({required: true}) usage?: DocsPageContentUsage;
  @Input() isLastElement: boolean = false;

  @ViewChild(MatTabGroup) tabGroup?: MatTabGroup;

  contentLinkHandler: HrefInterceptorHandler = (event: Event, el: HTMLAnchorElement) => {

    if(this.tabGroup) {
      const pageNum = el.href.split('#')[1];
      this.tabGroup.selectedIndex = parseInt(pageNum) - 1;
    }

    return false;
  }
}
