import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'day-session-select-button',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './day-session-select-button.component.html',
  styleUrls: ['./day-session-select-button.component.scss'],
  exportAs: 'day-session-select-button'
})
export class DaySessionSelectButtonComponent {
    @Input({ required: true }) public topRowText!: string;
    @Input({ required: true }) public bottomRowText!: string;
}
