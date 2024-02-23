import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ComponentLoaderMap, ComponentLoaderMapService} from "@jamesbenrobb/ui";


const componentMap: ComponentLoaderMap = {
  'grid-layout-example': () => import('./grid-layout/grid-layout-example.component'),
  'responsive-container-example': () => import('./responsive-container/responsive-container-example.component'),
  'flex-grid-example': () => import('./flex-grid/flex-grid-example.component')
}


export function getExampleProvider(): EnvironmentProviders {

  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue: componentMap,
    multi: true
  }]);
}
