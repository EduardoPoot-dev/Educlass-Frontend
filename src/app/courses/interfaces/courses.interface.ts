export interface AvailableCoursesResponse {
  id:         string;
  name:       string;
  grade:      string;
  group:      string;
  password:   string;
  background: string;
  creatorId:  number;
  createdAt:  Date;
  updatedAt:  Date;
  creator: UserCourse
}

export interface Course {
  creator?: UserCourse
  grade: string
  group: string
  id?: string
  name: string
  password?: string
}

export interface CourseResponse {
  createdCourses : Course[]
  enrolledCourses: Course[]
}

export interface UserCourse {
  name: string
  id: string
}

export interface NewCourseForm {
  name: string
  password: string
  grade: string
  group: string
  background: FormData
}

export interface JoinToCourseForm {
  password: string
}

export interface SingleCourseResponse {
  id:         string;
  name:       string;
  grade:      string;
  group:      string;
  password:   string;
  createdAt:  Date;
  updatedAt:  Date;
  creator: UserCourse
  users: UserCourse[]
  tasks: Task[]
  submits: Submit[]
}

export interface Task {
  id: string
  name: string
  description: string
  dueDate: Date
}

export interface Submit {
  url: string
}

export interface StudentsResponse {
  users: Student[]
}

export interface Student {
  name: string
  email: string
}
