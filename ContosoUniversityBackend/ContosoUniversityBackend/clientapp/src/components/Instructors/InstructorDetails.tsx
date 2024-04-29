import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import {Link, useLoaderData} from "react-router-dom";
import {ICourseAssignment, IInstructor} from "../../interfaces/global_interfaces.ts";
import {Divider} from "@mui/joy";
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Table from "@mui/joy/Table";
import {TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {getSingleInstructor} from "../../useData/useInstructors.ts";


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
  const instructor: IInstructor = await getSingleInstructor(params.id);

  return [instructor];
}

export default function InstructorDetails() {
  const [instructor] = useLoaderData() as [student: IInstructor];


  return (
    <>
      <Header headerBackground="black" headerColor="lightgray"/>
      <div style={{margin: "0 20vw" }}>
        <div style={{margin: "50px 0 20px 50px"}}>
          <h1 style={{marginBottom: "20px"}}>Details</h1>
          <h3>{instructor.firstMidName + " " + instructor.lastName}</h3>
        </div>
        <Divider/>
        <Grid container spacing={2} marginBottom={10}>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>First Name</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{instructor.firstMidName}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Last Name</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{instructor.lastName}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Hire Date</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{instructor.hireDate.slice(0,10)}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Office</Item>
          </Grid>
          <Grid xs={10}>
            <Item style={{textAlign: "start"}}>{instructor.officeAssignment ? instructor.officeAssignment.location : "No Office"}</Item>
          </Grid>
          <Grid xs={2}>
            <Item style={{textAlign: "start"}}>Courses</Item>
          </Grid>
          <Grid xs={10}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Title</TableCell>
                  <TableCell>Number of Students</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {instructor.courseAssignments &&
                  (instructor.courseAssignments as ICourseAssignment[]).map((course, index) => {
                    return(
                      <TableRow key={index}>
                        <TableCell>{course.course.title}</TableCell>
                        <TableCell>{course.course.enrollments?.length}</TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </Grid>

        </Grid>
        <Link to={"/instructors"}>Back to List</Link>
      </div>
      <Footer/>
    </>
  )
}