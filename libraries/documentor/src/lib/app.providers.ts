import {EnvironmentProviders, importProvidersFrom, Provider} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {getGithubBtnProviders} from "@jamesbenrobb/ui";
import {getJBRDRAAppProviders} from "@jamesbenrobb/dynamic-route-app";
import {DocsPageContent, getChildNodes} from "./content";
import {getControlsLoaderProvider, getMarkdownProviders} from "./components";
import {getControlsConfigProviders} from "./config";
import {getPageContainerComponentProviders} from "./components/page-container/page-container.component.providers";


export function getDocumentorProviders(routesConfigPath: string): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      getMarkdownProviders()
    ),
    getGithubBtnProviders('assets/github.svg'),
    getControlsConfigProviders(),
    getControlsLoaderProvider(),
    getPageContainerComponentProviders(),
    ...getJBRDRAAppProviders<DocsPageContent>(
      routesConfigPath, {
        appName: 'Documentor',
        contentComponentType: 'docs-content',
        getAllChildNodes: getChildNodes,
      }
    )
  ];
}
