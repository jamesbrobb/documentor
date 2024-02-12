
export enum ControlTypes {
  input='input',
  select='select',
  json='json'
}

export type ControlTypeStrings = keyof typeof ControlTypes

export enum InputTypes {
  text='text',
  email='email',
  url='url',
  num='number',
  checkbox='checkbox',
  radio='radio'
}

export type ControlGroup = {
  header: string,
  controls: Control[]
}


export type Control = InputControl | SelectControl | JsonControl;


export type BaseControl = {
  controlType: ControlTypes
  key: string
  label: string
  value?: unknown
}

export type InputControl = {
  controlType: ControlTypes.input,
  type: InputTypes,
  min?: number,
  max?: number
} & BaseControl

export type SelectControl = {
  controlType: ControlTypes.select,
  defaultValue?: number | string,
  options?: ControlOption[],
  optionsId?: string,
} & BaseControl

export type JsonControl = {
  controlType: ControlTypes.json,
} & BaseControl


export type ControlOption = {
  value: string,
  label?: string
}
