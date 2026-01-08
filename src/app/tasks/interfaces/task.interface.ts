import { Submit } from "@courses/interfaces/courses.interface";

export interface NewTaskForm {
  name: string
  description: string
  dueDate: Date | string
}

export interface TaskResponse {
  id:          string;
  name:        string;
  description: string;
  dueDate:     Date | string;
  courseId:    string;
  creatorId:   number;
  createdAt:   Date | string;
  updatedAt:   Date | string;
  course:      CourseName;
  submits: Submit[]
}

export interface Submbit {
  url: string
}

export interface CourseName {
  name: string
}

export interface SubmitResponse {
  user:   User;
  files:  File[];
}

export interface Course {
  name: string;
  id:   string;
}

export interface File {
  url: string;
}

export interface User {
  name: string;
  id:   number;
  email?: string;
}

