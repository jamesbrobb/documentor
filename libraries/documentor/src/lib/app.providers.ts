import {EnvironmentProviders, importProvidersFrom, Provider} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {getComponentLoaderProviders, getGithubBtnProviders} from "@jamesbenrobb/ui";
import {getJBRDRAAppProviders} from "@jamesbenrobb/dynamic-route-app";
import {DocsPageContent, getChildNodes} from "./content";
import {DocsRouteComponent} from "./route/docs.route.component";
import {getControlsLoaderProvider, getMarkdownProviders} from "./components";
import {getControlsConfigProviders} from "./config";


export function getDocumentorProviders(routesConfigPath: string): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      getMarkdownProviders()
    ),
    getComponentLoaderProviders(),
    getGithubBtnProviders('assets/github.svg'),
    getControlsConfigProviders(),
    getControlsLoaderProvider(),
    ...getJBRDRAAppProviders<DocsPageContent>(
      routesConfigPath,
      'Docs',
      DocsRouteComponent,
      getChildNodes
    )
  ];
}
