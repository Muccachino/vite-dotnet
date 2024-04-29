import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Link, useLoaderData} from "react-router-dom";
import {ICourse, IDepartment} from "../../interfaces/global_interfaces.ts";
import {Divider} from "@mui/joy";
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Table from "@mui/joy/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {getSingleDepartment} from "../../useData/useDepartments.ts";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export async function loader({params}: {params: {id: string}}) {
  const department: IDepartment = await getSingleDepartment(params.id);
  return {department}
}

export default function DepartmentDetails() {
  const {department} = useLoaderData() as {department: IDepartment};


  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 20vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Details</h1>
          <h3>{department.name}</h3>
        </div>
        <Divider/>
        <Grid container spacing={2} marginBottom={10}>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Department Name</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{department.name}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Administrator</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{department.administrator?.fullName}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Budget</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{department.budget}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Courses</Item>
          </Grid>
          <Grid xs={10}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Number</TableCell>
                  <TableCell>Course Title</TableCell>
                  <TableCell>Credits</TableCell>
                  <TableCell>Number of Students</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {department.courses &&
                  (department.courses as ICourse[]).map((item, index) => {
                    return(
                      <TableRow key={index}>
                        <TableCell>{item.courseID}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.credits}</TableCell>
                        <TableCell>{(item.enrollments!.length > 0) ? item.enrollments!.length : "No Students enrolled"}</TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </Grid>

        </Grid>
        <Link to={"/departments"}>Back to List</Link>

      </div>
      <Footer/>
    </>
  )
}