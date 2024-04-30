import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import { Link } from "react-router-dom";
import Table from "@mui/joy/Table";
import {ICourseAssignment, IInstructor, IStudent} from "../../interfaces/global_interfaces.ts";
import {Input} from "@mui/joy";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {TableCell, TableHead, TableRow, TableBody} from "@mui/material";
import useInstructors from "../../useData/useInstructors.ts";
import InstCourses from "./Inst_Infos/InstCourses.tsx";
import useStudents from "../../useData/useStudents.ts";



export default function InstructorIndex() {
  const [instructors] = useInstructors();
  const [students] = useStudents() as [students: IStudent[]];
  const [filter, setFilter] = useState<string>("");
  const [coursesVisible, setCoursesVisible] = useState<boolean>(false);
  const [currentCourseAssignments, setCurrentCourseAssignments] = useState<ICourseAssignment[] | null>([]);

  const showCourses = (instructor: IInstructor) => {
    setCoursesVisible(!coursesVisible);
    setCurrentCourseAssignments(instructor.courseAssignments!);
  }

  useEffect(() => {

  }, [students])

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Instructor Index</h1>
          <Link to={"/instructorCreate"}>Create New</Link>
        </div>

        <p>Find by name:</p>
        <div style={{marginBottom: "20px", display: "flex"}}>
          <Input sx={{width: "25%"}} onChange={(e) => setFilter(e.target.value)}/>
        </div>
        <div style={{marginBottom: "30px"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Hire Date</TableCell>
              <TableCell>Office</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(instructors as IInstructor[])
              .filter(instructor => {
                return instructor.firstMidName.toLowerCase().includes(filter.toLowerCase())
                  || instructor.lastName.toLowerCase().includes(filter.toLowerCase());
              })
              .map(instructor => (
                <TableRow key={instructor.id}>
                  <TableCell>{instructor.firstMidName}</TableCell>
                  <TableCell>{instructor.lastName}</TableCell>
                  <TableCell>{instructor.hireDate.slice(0,10)}</TableCell>
                  <TableCell>{instructor.officeAssignment?.location}</TableCell>
                  <TableCell>
                    {instructor.courseAssignments?.map((course, index) => {
                      return(
                        <p key={index}>
                          <span>{course.courseID} </span> <span> {course.course.title}</span>
                        </p>
                      )
                    })}
                  </TableCell>

                  <TableCell>
                    <Button variant="text" size="small" onClick={() => showCourses(instructor)}>Select</Button>
                  </TableCell>
                  <TableCell>
                    <Link to={`/instructorEdit/${instructor.id}`}>Edit</Link> |
                    <Link to={`/instructorDetails/${instructor.id}`}>Details</Link> |
                    <Link to={`/instructorDelete/${instructor.id}`}>Delete</Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        </div>
        {coursesVisible && (
          <InstCourses courseAssignments={currentCourseAssignments!}/>
        )}
      </div>

      <Footer />
    </>
  );
}
