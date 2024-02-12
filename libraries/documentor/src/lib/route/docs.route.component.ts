import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {RouteManager, JBRDRARootRouteComponent, RouteNode} from "@jamesbenrobb/dynamic-route-app";
import {DocsPageContent, DocsRouteNode} from "../content";
import {PageContainerComponent} from "../components/page-container/page-container.component";
import {Observable} from "rxjs";


@Component({
  selector: 'docs-root-route',
  standalone: true,
  templateUrl: './docs.route.component.html',
  imports: [
    NgIf,
    JsonPipe,
    AsyncPipe,
    PageContainerComponent
  ],
  styleUrls: ['./docs.route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocsRouteComponent implements JBRDRARootRouteComponent<DocsPageContent> {

  readonly #routesManager: RouteManager<DocsPageContent> = inject(RouteManager);
  readonly routeNodes$: Observable<DocsRouteNode[]> = this.#routesManager.currentRouteNodes$;

  onRouteSelected(node: DocsRouteNode): void {
    this.#routesManager.navigateByNode(node);
  }
}
