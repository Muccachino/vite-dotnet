import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import { Link } from "react-router-dom";
import Table from "@mui/joy/Table";
import {IDepartment} from "../../interfaces/global_interfaces.ts";
import {Input} from "@mui/joy";
import {useState} from "react";
import {TableCell, TableHead, TableRow, TableBody} from "@mui/material";
import useDepartments from "../../useData/useDepartments.ts";



export default function DepartmentIndex() {
  const [departments] = useDepartments();
  const [filter, setFilter] = useState<string>("");

  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 10vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Department Index</h1>
          <Link to={"/departmentCreate"}>Create New</Link>
        </div>

        <p>Find by name:</p>
        <div style={{marginBottom: "20px", display: "flex"}}>
          <Input sx={{width: "25%"}} onChange={(e) => setFilter(e.target.value)}/>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Administrator</TableCell>
              <TableCell>Implementation</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(departments as IDepartment[])
              .filter(department => {
                return department.name.toLowerCase().includes(filter.toLowerCase());
              })
              .map(department => (
                <TableRow key={department.departmentID}>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.administrator?.fullName}</TableCell>
                  <TableCell>{department.startDate.slice(0,10)}</TableCell>
                  <TableCell>{"€ " + department.budget}</TableCell>
                  <TableCell>
                    <Link to={`/departmentEdit/${department.departmentID}`}>Edit</Link> |
                    <Link to={`/departmentDetails/${department.departmentID}`}>Details</Link> |
                    <Link to={`/departmentDelete/${department.departmentID}`}>Delete</Link>
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
