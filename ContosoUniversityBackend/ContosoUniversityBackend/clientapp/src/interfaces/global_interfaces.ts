export interface IStudent {
  id?: string;
  firstMidName: string;
  lastName: string;
  fullName?: string;
  enrollmentDate: string;
  enrollments?: IEnrollment[];
  courseIds?: number[];
}

export interface ICourse {
  courseID: number;
  title: string;
  credits: number;
  departmentID?: number;
  department?: IDepartment | null;
  enrollments?: IEnrollment[];
  courseAssignments?: ICourseAssignment | null;
}

export interface IEnrollment {
  enrollmentID: number;
  studentID: number;
  courseID: number;
  gradeString: string;
  grade?: {A: number, B: number, C: number, D: number, F: number};
  course?: ICourse;
  student?: IStudent;
}

export interface IInstructor {
  id?: number;
  lastName: string;
  firstMidName: string;
  fullName?: string;
  hireDate: string;
  courseAssignments?: ICourseAssignment[] | null;
  officeAssignment?: IOfficeAssignment | null;
}

export interface IDepartment {
  departmentID?: number;
  name: string;
  budget: number;
  startDate: string;
  InstructorId?: number;
  administrator: IInstructor | null;
  courses?: ICourse[];
}

export interface IEnrollmentDateGroup {
  enrollmentDate: string;
  studentCount: number
}

export interface ICourseAssignment {
  instructorID: number;
  courseID: number;
  instructor: IInstructor;
  course: ICourse;
}

export interface IOfficeAssignment {
  instructorID: number;
  location: string;
  instructor: IInstructor;
}