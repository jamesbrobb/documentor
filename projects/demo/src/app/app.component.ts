import { Component } from '@angular/core';
import {DocsAppLayoutContainerComponent} from "@jamesbenrobb/documentor";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DocsAppLayoutContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
