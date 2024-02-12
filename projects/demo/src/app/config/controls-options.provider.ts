import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ControlsOptionsMapService} from "@jamesbenrobb/documentor";


enum TEMP_OVERLAY_COLORS {
  BLUE= 'blue',
  DARK_BLUE= 'dark-blue',
  GREEN= 'green',
  RED= 'red',
  PURPLE= 'purple',
  PINK= 'pink',
  GREY= 'grey'
}

enum TEMP_FALLBACK_COLORS {
  BLUE= 'blue',
  GREEN= 'green',
  ORANGE= 'orange',
  PURPLE= 'purple',
  WHITE= 'white'
}


export function getControlsOptionsProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ControlsOptionsMapService,
    useValue: {
      OVERLAY_COLORS: Object.values(TEMP_OVERLAY_COLORS).map(key => ({value: key})),
      FALLBACK_COLORS: [{label: 'none'}, ...Object.values(TEMP_FALLBACK_COLORS).map(key => ({value: key}))],
      IMAGE_URLS: [
        {label: 'none'},
        {value: '/assets/media-examples/sample.png', label: 'Image 1'},
        {value: '/assets/media-examples/sample_2.png', label: 'Image 2'}
      ]
    }
  }])
}
