import {TypeGuard} from "@jamesbenrobb/types";
import {
  Control,
  ControlTypes,
  ControlTypeStrings,
  InputControl,
  JsonControl,
  SelectControl
} from "./controls-config.types";


export function controlTypeGuard<C extends Control>(type: ControlTypeStrings): TypeGuard<Control, C> {
  return (control: any): control is C => control.controlType === type
}

export const isInputControl = controlTypeGuard<InputControl>(ControlTypes.input);
export const isSelectControl = controlTypeGuard<SelectControl>(ControlTypes.select);
export const isJsonControl = controlTypeGuard<JsonControl>(ControlTypes.json);
