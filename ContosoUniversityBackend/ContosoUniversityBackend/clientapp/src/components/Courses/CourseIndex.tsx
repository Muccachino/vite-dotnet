import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import { Link } from "react-router-dom";
import Table from "@mui/joy/Table";
import {ICourse} from "../../interfaces/global_interfaces.ts";
import {Input} from "@mui/joy";
import {useState} from "react";
import {TableCell, TableHead, TableRow, TableBody} from "@mui/material";
import useCourses from "../../useData/useCourses.ts";



export default function CourseIndex() {
  const [courses] = useCourses();
  const [filter, setFilter] = useState<string>("");

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Course Index</h1>
          <Link to={"/courseCreate"}>Create New</Link>
        </div>

        <p>Find by name:</p>
        <div style={{marginBottom: "20px", display: "flex"}}>
          <Input sx={{width: "25%"}} onChange={(e) => setFilter(e.target.value)}/>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(courses as ICourse[])
              .filter(course => {
                return course.title.toLowerCase().includes(filter.toLowerCase())
                  || course.courseID.toString().includes(filter.toLowerCase());
              })
              .map(course => (
                <TableRow key={course.courseID}>
                  <TableCell>{course.courseID}</TableCell>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>
                    <Link to={`/courseEdit/${course.courseID}`}>Edit</Link> |
                    <Link to={`/courseDetails/${course.courseID}`}>Details</Link> |
                    <Link to={`/courseDelete/${course.courseID}`}>Delete</Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <Footer />
    </>
  );
}
