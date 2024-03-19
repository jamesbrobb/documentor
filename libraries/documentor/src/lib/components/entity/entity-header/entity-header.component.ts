import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {ResponsiveContainerDirectiveModule, toClassCasePipe, toWordsPipe, GithubBtnComponent} from "@jamesbenrobb/ui";
import {ContentNode} from "@jamesbenrobb/dynamic-routes";

import {EntityTypeLabelComponent} from "../entity-type-label/entity-type-label.component";
import {DocsPageContent} from "../../../content";



@Component({
  selector: 'jbr-entity-header',
  standalone: true,
  imports: [
    NgIf,
    GithubBtnComponent,
    EntityTypeLabelComponent,
    toClassCasePipe,
    toWordsPipe,
    ResponsiveContainerDirectiveModule

  ],
  templateUrl: './entity-header.component.html',
  styleUrl: './entity-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityHeaderComponent {
  @Input({required: true}) entity?: ContentNode<DocsPageContent>;
}
