import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'app-day-session-select-button',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './day-session-select-button.component.html',
  styleUrls: ['./day-session-select-button.component.scss'],
})
export class DaySessionSelectButtonComponent {
    @Input({ required: true }) public topRowText!: string;
    @Input({ required: true }) public bottomRowText!: string;
}
