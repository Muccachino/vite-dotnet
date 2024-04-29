import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootElement from "./components/RootElement.tsx";
import StudentIndex from "./components/Students/StudentIndex.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import StudentEdit, {loader as studentEditLoader} from "./components/Students/StudentEdit.tsx";
import StudentCreate from "./components/Students/StudentCreate.tsx";
import StudentDetails, {loader as studentDetailsLoader} from "./components/Students/StudentDetails.tsx";
import StudentDelete, {loader as studentDeleteLoader} from "./components/Students/StudentDelete.tsx";
import CourseIndex from "./components/Courses/CourseIndex.tsx";
import CourseEdit, {loader as courseEditLoader} from "./components/Courses/CourseEdit.tsx";
import CourseCreate from "./components/Courses/CourseCreate.tsx";
import CourseDelete, {loader as courseDeleteLoader} from "./components/Courses/CourseDelete.tsx";
import CourseDetails, {loader as courseDetailLoader} from "./components/Courses/CourseDetails.tsx";
import InstructorIndex from "./components/Instructors/InstructorIndex.tsx";
import AboutPage from "./components/AboutPage.tsx";
import InstructorCreate from "./components/Instructors/InstructorCreate.tsx";
import InstructorDelete, {loader as instructorDeleteLoader} from "./components/Instructors/InstructorDelete.tsx";
import InstructorEdit, {loader as instructorEditLoader} from "./components/Instructors/InstructorEdit.tsx";
import InstructorDetails, {loader as instructorDetailsLoader} from "./components/Instructors/InstructorDetails.tsx";
import DepartmentIndex from "./components/Departments/DepartmentIndex.tsx";
import DepartmentCreate from "./components/Departments/DepartmentCreate.tsx";
import DepartmentDelete, {loader as departmentDeleteLoader} from "./components/Departments/DepartmentDelete.tsx";
import DepartmentDetails, {loader as departmentDetailsLoader} from "./components/Departments/DepartmentDetails.tsx";


export default function Router() {


  const router = createBrowserRouter([
    {
      path: "/app",
      element: <RootElement />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/students",
      element: <StudentIndex />,
    },
    {
      path: "/studentEdit/:id",
      element: <StudentEdit />,
      loader: studentEditLoader as any
    },
    {
      path: "/studentCreate",
      element: <StudentCreate/>
    },
    {
      path: "/studentDetails/:id",
      element: <StudentDetails/>,
      loader: studentDetailsLoader as any
    },
    {
      path: "/studentDelete/:id",
      element: <StudentDelete/>,
      loader: studentDeleteLoader as any
    },
    {
      path: "/courses",
      element: <CourseIndex/>
    },
    {
      path: "/courseEdit/:id",
      element: <CourseEdit/>,
      loader: courseEditLoader as any
    },
    {
      path: "/courseCreate",
      element: <CourseCreate/>
    },
    {
      path: "/courseDelete/:id",
      element: <CourseDelete/>,
      loader: courseDeleteLoader as any
    },
    {
      path: "/courseDetails/:id",
      element: <CourseDetails/>,
      loader: courseDetailLoader as any
    },
    {
      path: "/instructors",
      element: <InstructorIndex/>
    },
    {
      path: "/instructorCreate",
      element: <InstructorCreate/>
    },
    {
      path: "/instructorDelete/:id",
      element: <InstructorDelete/>,
      loader: instructorDeleteLoader as any
    },
    {
      path: "/instructorEdit/:id",
      element: <InstructorEdit/>,
      loader: instructorEditLoader as any
    },
    {
      path: "/instructorDetails/:id",
      element: <InstructorDetails/>,
      loader: instructorDetailsLoader as any
    },
    {
      path: "/departments",
      element: <DepartmentIndex/>
    },
    {
      path: "/departmentCreate",
      element: <DepartmentCreate/>
    },
    {
      path: "/departmentDelete/:id",
      element: <DepartmentDelete/>,
      loader: departmentDeleteLoader as any
    },
    {
      path: "departmentDetails/:id",
      element: <DepartmentDetails/>,
      loader: departmentDetailsLoader as any
    },
    {
      path: "/about",
      element: <AboutPage/>
    },
  ]);
  return <RouterProvider router={router} />;
}
