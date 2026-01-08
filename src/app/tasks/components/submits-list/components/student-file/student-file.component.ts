import { SlicePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { SubmitResponse } from '@tasks/interfaces/task.interface';

@Component({
  selector: 'app-student-file',
  imports: [
    TitleCasePipe,
    SlicePipe
  ],
  templateUrl: './student-file.component.html',
})
export class StudentFileComponent {

  studentData = input.required<SubmitResponse>()

  formatFileName(url: string) {
    return url.split('/').at(-1)?.split('.')[0]
  }
}
