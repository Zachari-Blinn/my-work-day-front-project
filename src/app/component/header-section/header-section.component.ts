import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  standalone: true,
  selector: 'app-header-section',
  imports: [AvatarComponent],
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss'],
  exportAs: 'header-section',
})
export class HeaderSectionComponent {}
