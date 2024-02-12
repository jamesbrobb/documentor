import {Control, ControlOption, ControlTypes, SelectControl} from "./controls-config.types";


export type ControlsOptionsMap = {
  [key: string]: ControlOption[]
}


export class ControlsConfigParser {

  readonly #optionsMap?: ControlsOptionsMap;

  constructor(optionsMap?:ControlsOptionsMap) {
    this.#optionsMap = optionsMap;
  }

  parseOptions(control: Control): void {

    switch(control.controlType) {
      case ControlTypes.select:
        this._parseSelect(control);
        break;
    }
  }

  private _parseSelect(control: SelectControl): void {
    this._setSelectOptions(control);
    this._setSelectDefault(control);
  }

  private _setSelectOptions(control: SelectControl): void {

    if(!this.#optionsMap || !control.optionsId) {
      return;
    }

    control.options = this.#optionsMap[control.optionsId];
  }

  private _setSelectDefault(control: SelectControl): void {
    console.log(control);
    if(control.defaultValue === undefined || !control.options || !control.options.length) {
      return;
    }

    switch(typeof control.defaultValue) {

      case "number":
        let index = Math.max(Math.min(control.options.length, control.defaultValue), 0);
        control.value = control.options[index].value;
        break;

      case "string":
        let option = control.options.find((opt) => opt.value === control.defaultValue);
        control.value = option?.value;
        break;
    }
  }
}
