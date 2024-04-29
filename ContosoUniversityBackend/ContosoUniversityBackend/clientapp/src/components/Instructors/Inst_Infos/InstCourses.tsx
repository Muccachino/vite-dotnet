import {ICourse, ICourseAssignment} from "../../../interfaces/global_interfaces.ts";
import Table from "@mui/joy/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import InstEnrollments from "./InstEnrollments.tsx";

interface Params {
  courseAssignments: ICourseAssignment[]
}

export default function InstCourses({courseAssignments}: Params) {
  const [currentCourse, setCurrentCourse] = useState<ICourse>();
  const [courseVisible, setCourseVisible] = useState<boolean>(false);

  const showCourse = (course: ICourse) => {
    setCourseVisible(true);
    setCurrentCourse(course);
  }

  return(
    <>
      <h2>Courses Taught by Selected Instructor</h2>
      <div style={{marginBottom: "30px"}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Course Number</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Department</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseAssignments.map(item => {
            return(
              <TableRow key={item.courseID}>
                <TableCell>
                  <Button variant="text" onClick={() => showCourse(item.course)}>Select</Button>
                </TableCell>
                <TableCell>{item.course.courseID}</TableCell>
                <TableCell>{item.course.title}</TableCell>
                <TableCell>{item.course.department?.name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </div>
      {courseVisible && (
        <InstEnrollments course={currentCourse!}/>
      )}
    </>
  )
}