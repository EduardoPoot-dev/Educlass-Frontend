import { PercentPipe } from '@angular/common';
import { Component, computed, effect, inject, input, output } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CoursesService } from '@courses/services/courses.service';
import { TaskService } from '@tasks/services/task.service';

@Component({
  selector: 'app-progress-tracker',
  imports: [PercentPipe],
  templateUrl: './progress-tracker.component.html',
})
export class ProgressTrackerComponent {
  private courseService = inject(CoursesService)

  courseId = input.required<string>()
  taskQuantity = input.required<number>()

  progressChange = output<number>()

  submitsResource = rxResource({
    request: () => ({courseId: this.courseId()}),
    loader: ({request}) => this.courseService.getSubmitsCourse(request.courseId)
  })

  submitsQuantity = computed(() => this.submitsResource.value()?.length)
  progress = computed(() => ((this.submitsQuantity() || 0) / this.taskQuantity()) || 0)

  progressEffect = effect(() => {
    this.progressChange.emit(this.progress())
  })

}
