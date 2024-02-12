import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ComponentLoaderMapService} from "@jamesbenrobb/ui";


export function getControlsLoaderProvider(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue: {
      'example-controls': {
        import: () => import('./controls.component'),
        componentName: 'ControlsComponent'
      }
    },
    multi: true
  }]);
}
