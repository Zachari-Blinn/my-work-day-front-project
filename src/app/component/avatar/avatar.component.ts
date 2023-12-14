import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-avatar',
  imports: [MatIconModule, NgIf, NgClass, NgStyle],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  public file: string = '';

  public onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.resetInput();
    }
  }

  public resetInput() {
    const input = document.getElementById(
      'avatar-input-file'
    ) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }
}
