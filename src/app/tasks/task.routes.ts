import { Routes } from "@angular/router";
import { NewTaskComponent } from "@tasks/pages/new-task/new-task.component";
import { SubmitTaskComponent } from "./pages/submit-task/submit-task.component";

const taskRouter: Routes = [
  {
    path: '',
    component: NewTaskComponent
  },
  {
    path: ':taskId',
    component: SubmitTaskComponent
  }
]
export default taskRouter
