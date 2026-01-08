import { Component, input } from '@angular/core';
import { SubmitResponse } from '@tasks/interfaces/task.interface';
import { FileDataComponent } from './components/file-data/file-data.component';

@Component({
  selector: 'app-submited-task',
  imports: [FileDataComponent],
  templateUrl: './submited-task.component.html',
})
export class SubmitedTaskComponent {

  files = input.required<SubmitResponse>()


}
