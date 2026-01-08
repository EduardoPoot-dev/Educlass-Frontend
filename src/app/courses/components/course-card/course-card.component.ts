import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '@courses/interfaces/courses.interface';

@Component({
  selector: 'app-course-card',
  imports: [UpperCasePipe, TitleCasePipe, RouterLink],
  templateUrl: './course-card.component.html',
})
export class CourseCardComponent {

  course = input.required<Course>()

}
