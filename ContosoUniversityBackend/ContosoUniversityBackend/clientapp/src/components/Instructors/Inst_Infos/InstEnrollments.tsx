import {ICourse} from "../../../interfaces/global_interfaces.ts";
import Table from "@mui/joy/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@mui/material";

interface Params {
  course: ICourse
}

export default function InstEnrollments({course}: Params) {

  return(
    <>
      <h2>Students Enrolled in Selected Course</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {course.enrollments!.map((student, index) => {
            return(
              <TableRow key={index}>
                <TableCell>{student.student!.firstMidName} {student.student!.lastName}</TableCell>
                <TableCell>{student.gradeString}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}