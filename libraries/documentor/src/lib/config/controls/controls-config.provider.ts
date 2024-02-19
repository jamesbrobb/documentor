import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders, Optional} from "@angular/core";
import {ControlsConfigParser, ControlsOptionsMap} from "./controls-config.parser";


export const ControlsOptionsMapService = new InjectionToken<ControlsOptionsMap>('ControlsOptionsMapService');


export function getControlsConfigProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ControlsConfigParser,
    useFactory: (optionsMap: ControlsOptionsMap) => {
      return new ControlsConfigParser(optionsMap);
    },
    deps: [
      [new Optional(), ControlsOptionsMapService]
    ]
  }]);
}
