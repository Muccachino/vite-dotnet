import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Divider} from "@mui/joy";
import Table from "@mui/joy/Table";
import {TableCell, TableHead, TableRow, TableBody} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import {ICourse, IEnrollmentDateGroup} from "../interfaces/global_interfaces.ts";
import useCourses from "../useData/useCourses.ts";



export default function AboutPage() {
  const [enrollmentDateGroup, setEnrollmentDateGroup] = useState<IEnrollmentDateGroup[]>([]);
  const [courses] = useCourses();

  useEffect(() => {
    const connectEnrollmentDateGroup = async () => {
      const response = await axios.get('https://localhost:7088/api/Enrollments/DateGroup');
      setEnrollmentDateGroup(response.data);
    }
    connectEnrollmentDateGroup();
  }, [])

  return (
    <>
      <Header headerBackground="white" headerColor="black"/>
      <div style={{margin: "50px 10vw" }}>
        <div>
          <h1 style={{margin: "20px 20px"}}>About</h1>
          <h2 style={{margin: "20px 20px"}}>
            Student Body Statistics
          </h2>
          <Divider style={{margin: "40px 0"}}/>
        </div>
        <div className="about-tables">
          <div>
            <h3 style={{marginBottom: "20px"}}>Students per Enrollment Date</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{paddingLeft: "25px"}}>Enrollment Date</TableCell>
              <TableCell style={{paddingLeft: "25px"}}>Number of Students</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollmentDateGroup.map((date, index) => {
              return(
                <TableRow key={index}>
                  <TableCell style={{paddingLeft: "35px"}}>{date.enrollmentDate.slice(0,10)}</TableCell>
                  <TableCell style={{paddingLeft: "60px"}}>{date.studentCount}</TableCell>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>
          </div>
          <div>
          <h3 style={{marginBottom: "20px"}}>Students per Course</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{paddingLeft: "25px"}}>Course</TableCell>
              <TableCell style={{paddingLeft: "25px"}}>Number of Students</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(courses as ICourse[]).map((course, index) => {
              return(
                <TableRow key={index}>
                  <TableCell style={{paddingLeft: "35px"}}>{course.title}</TableCell>
                  <TableCell style={{paddingLeft: "60px"}}>{course.enrollments?.length}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
          </div>
        </div>
      </div>

      <Footer/>
    </>

  )
}