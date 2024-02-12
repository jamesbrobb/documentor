import {debounceTime, Subject, Subscription, tap} from "rxjs";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output
} from '@angular/core';

import {
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule, FormsModule
} from "@angular/forms";

import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

import {MatDividerModule} from "@angular/material/divider";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";

import {GuardTypePipe, JsonEditorComponent, JsonEditorControlValueAccessor} from "@jamesbenrobb/ui";

import {
  Control,
  ControlGroup,
  isInputControl,
  isJsonControl,
  isSelectControl,
  ControlsConfigParser
} from "../../config/";


export type ControlComponentInput = {
  controlGroups?: ControlGroup[];
}

export type ControlComponentOutput = {
  dataChange: EventEmitter<{[key: string]: unknown}>;
}

export type ControlComponentIO = ControlComponentInput & ControlComponentOutput & OnChanges;



@Component({
  selector: 'div[example-controls]',
  standalone: true,
  imports: [
    GuardTypePipe,
    JsonEditorComponent,
    JsonEditorControlValueAccessor,
    NgIf,
    NgSwitch,
    NgClass,
    NgForOf,
    NgSwitchCase,
    NgSwitchDefault,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule
  ],
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements ControlComponentIO, OnChanges, OnDestroy {

  @Input() controlGroups?: ControlGroup[];

  @Output() dataChange = new EventEmitter<{[key: string]: unknown}>();

  #parser = inject(ControlsConfigParser);

  form!: UntypedFormGroup;

  isInputControl = isInputControl;
  isSelectControl = isSelectControl;
  isJsonControl = isJsonControl;

  #formSubscription: Subscription | undefined;
  #debounce$ = new Subject<{[key: string]: unknown }>();


  constructor() {

    this.#debounce$
      .pipe(
        takeUntilDestroyed(),
        debounceTime(100),
        tap((value) => this.dataChange.emit(value))
      )
      .subscribe();
  }

  ngOnChanges(): void {
    this.#cleanUp();
    this.#createFormGroup();
  }

  ngOnDestroy() {
    this.#cleanUp();
  }

  #formValueChange(value: {[key: string]: unknown }, throttle: boolean = true): void {

    if(!throttle) {
      this.dataChange.emit(value);
      return;
    }

    this.#debounce$.next(value);
  }

  #cleanUp(): void {
    this.#formSubscription?.unsubscribe();
  }

  #createFormGroup(): void {

    if(!this.controlGroups) {
      return;
    }

    const controls: {[key: string]: UntypedFormControl} = {};

    this.controlGroups.forEach((control) => {

      control.controls.forEach((control) => {

        this.#parser.parseOptions(control);

        controls[control.key] = new UntypedFormControl(control.value);
      });
    });

    this.form = new UntypedFormGroup(controls);
    this.#formSubscription = this.form.valueChanges.subscribe((value) => this.#formValueChange(value));
    this.#formValueChange(this.form.value, false);
  }
}
