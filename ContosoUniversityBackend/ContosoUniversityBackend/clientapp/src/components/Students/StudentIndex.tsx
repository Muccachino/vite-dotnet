import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import { Link } from "react-router-dom";
import Table from "@mui/joy/Table";
import useStudents from "../../useData/useStudents.ts";
import {IStudent} from "../../interfaces/global_interfaces.ts";
import {Input} from "@mui/joy";
import {useState} from "react";
import {TableCell, TableHead, TableRow, TableBody} from "@mui/material";



export default function StudentIndex() {
  const [students] = useStudents();
  const [filter, setFilter] = useState<string>("");

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Student Index</h1>
          <Link to={"/studentCreate"}>Create New</Link>
        </div>

        <p>Find by name:</p>
        <div style={{marginBottom: "20px", display: "flex"}}>
          <Input sx={{width: "25%"}} onChange={(e) => setFilter(e.target.value)}/>
        </div>

        <Table>
          <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Enrollment Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(students as IStudent[])
            .filter(student => {
              return student.firstMidName.toLowerCase().includes(filter.toLowerCase())
                || student.lastName.toLowerCase().includes(filter.toLowerCase());
            })
            .map(student => (
            <TableRow key={student.id}>
              <TableCell>{student.firstMidName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.enrollmentDate.slice(0,10)}</TableCell>
              <TableCell>
                <Link to={`/studentEdit/${student.id}`}>Edit</Link> |
                <Link to={`/studentDetails/${student.id}`}>Details</Link> |
                <Link to={`/studentDelete/${student.id}`}>Delete</Link>
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
