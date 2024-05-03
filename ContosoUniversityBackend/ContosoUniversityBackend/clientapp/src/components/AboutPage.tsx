import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Divider} from "@mui/joy";
import Table from "@mui/joy/Table";
import {TableCell, TableHead, TableRow, TableBody} from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import {IEnrollmentDateGroup} from "../interfaces/global_interfaces.ts";



export default function AboutPage() {
  const [test, setTest] = useState<IEnrollmentDateGroup[]>([]);

  useEffect(() => {
    const connectTest = async () => {
      const response = await axios.get('https://localhost:7088/api/Enrollments/DateGroup');
      setTest(response.data);
    }
    connectTest();
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Enrollment Date</TableCell>
              <TableCell>Number of Students</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {test.map((t, index) => {
              return(
                <TableRow key={index}>
                  <TableCell>{t.enrollmentDate.slice(0,10)}</TableCell>
                  <TableCell>{t.studentCount}</TableCell>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>
      </div>

      <Footer/>
    </>

  )
}