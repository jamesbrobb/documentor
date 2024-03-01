import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DocsAppLayoutContainerComponent} from "@jamesbenrobb/documentor";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DocsAppLayoutContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
