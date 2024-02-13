import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ComponentLoaderMapService} from "@jamesbenrobb/ui";


export function getPageContainerComponentProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue:  {
      'docs-content': {
        import: () => import('./page-container.component'),
        componentName: 'PageContainerComponent'
      }
    },
    multi: true
  }]);
}
