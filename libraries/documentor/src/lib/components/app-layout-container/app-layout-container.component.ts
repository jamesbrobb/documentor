import { ChangeDetectionStrategy, Component } from '@angular/core';
import {AppShellLayoutComponent} from "@jamesbenrobb/app-shell";
import {AppContentContainerComponent} from "@jamesbenrobb/dynamic-routes-ngx";


@Component({
  selector: 'jbr-docs-app-layout-container',
  standalone: true,
  imports: [
    AppShellLayoutComponent,
    AppContentContainerComponent
  ],
  templateUrl: './app-layout-container.component.html',
  styleUrl: './app-layout-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsAppLayoutContainerComponent {}
