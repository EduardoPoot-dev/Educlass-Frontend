import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
})
export class AlertComponent {


  status = input.required<string>()

  isSuccess = computed(() => this.status() === 'SUCCESS')
  isError = computed(() => this.status() === 'ERROR')

  message = input.required<string>()


}
