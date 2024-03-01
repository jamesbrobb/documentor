import { ChangeDetectionStrategy, Component } from '@angular/core';
import {AppLayoutContainerComponent} from "@jamesbenrobb/dynamic-route-app";
import {SearchInputContainerComponent} from "../search-input-container/search-input-container.component";


@Component({
  selector: 'jbr-docs-app-layout-container',
  standalone: true,
  imports: [
    AppLayoutContainerComponent,
    SearchInputContainerComponent
  ],
  templateUrl: './app-layout-container.component.html',
  styleUrl: './app-layout-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsAppLayoutContainerComponent {

}
