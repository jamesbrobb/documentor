import {
  DestroyRef,
  Directive,
  EventEmitter,
  inject,
  Input,
  Output
} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

import {tap} from "rxjs";

import {ComponentLoaderIOBase, ComponentLoaderDirective} from "@jamesbenrobb/ui";
import {ControlComponentIO} from "./controls.component";
import {ControlGroup} from "../../config";


@Directive({
  selector: '[controlsLoader]',
  standalone: true,
  hostDirectives: [
    ComponentLoaderDirective
  ]
})
export class ControlsLoaderDirective extends ComponentLoaderIOBase<ControlComponentIO> implements ControlComponentIO {

  @Input() controlGroups?: ControlGroup[];

  @Output() dataChange = new EventEmitter<{[key: string]: unknown}>();

  #destroyRef = inject(DestroyRef);
  #loader = inject(ComponentLoaderDirective);

  constructor() {

    super();

    this.loadComponent('example-controls');
  }

  protected override setUpInstance(): void {

    if(!this.instance) {
      return;
    }

    this.instance.instance.dataChange.pipe(
      takeUntilDestroyed(this.#destroyRef),
      tap(value => this.dataChange.emit(value))
    ).subscribe();
  }

  protected override updateInstanceInputs(): void {

    if(!this.instance) {
      return;
    }

    this.instance.setInput('controlGroups', this.controlGroups);
  }

  protected override cleanUpInstance(): void {}
}
