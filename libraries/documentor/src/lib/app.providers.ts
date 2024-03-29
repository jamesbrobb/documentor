import {EnvironmentProviders, importProvidersFrom, Provider} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {getJBRDRAppProviders} from "@jamesbenrobb/dynamic-routes-ngx";

import {DocInfoContent, DocsPageContent, getChildNodes} from "./content";
import {getControlsLoaderProvider} from "./components";
import {getControlsConfigProviders} from "./config";
import {getPageContainerComponentProviders} from "./components/page-container/page-container.component.providers";
import {getMarkdownProviders} from "./providers/markdown.providers";
import {getJBRAppShellProviders} from "@jamesbenrobb/app-shell";
import {getJBRAppShellDynamicRoutesNgxProviders} from "@jamesbenrobb/app-shell-routing-adaptors";


export function getDocumentorProviders(
  routesConfigPath: string,
  appName: string = 'Documentor',
  showDefaultContent: boolean = false
): (Provider | EnvironmentProviders)[] {
  return [
    importProvidersFrom(
      BrowserAnimationsModule,
      getMarkdownProviders()
    ),
    getControlsConfigProviders(),
    getControlsLoaderProvider(),
    getPageContainerComponentProviders(),
    getJBRAppShellProviders(),
    getJBRAppShellDynamicRoutesNgxProviders(),
    getJBRDRAppProviders<DocsPageContent | DocInfoContent>(
      routesConfigPath, {
        appName,
        contentComponentType: showDefaultContent ? '' : 'docs-content',
        getAllChildNodes: getChildNodes,
      }
    )
  ];
}
