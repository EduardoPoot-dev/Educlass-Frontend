import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { File } from '@tasks/interfaces/task.interface';

@Component({
  selector: 'app-file-data',
  imports: [SlicePipe],
  templateUrl: './file-data.component.html',
})
export class FileDataComponent {
  file = input.required<File>()

  fileName = computed(() => this.file().url.split('/').at(-1)?.split('.')[0])

}
